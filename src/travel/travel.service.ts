import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import Excel from 'exceljs';

import { Travel, TravelDocument } from './schemas/travel.schema';
import { CreateTravelDto } from './dto/create-travel.dto';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { UserSession } from 'src/auth/types/user.session';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateTravelDto } from './dto/update-travel.dto';

@Injectable()
export class TravelService {
    constructor(
        @InjectModel(Travel.name)
        private readonly travelModel: Model<TravelDocument>,
        private readonly userService: UserService,
    ) {}

    findAll() {
        return this.travelModel.find();
    }

    async edit(id: string, updateTravelDto: UpdateTravelDto) {
        // const travel = await this.findOneById(id);
        // if (travel.capacity < ut.capacity)
        // await this.travelModel.updateOne({ id }, { $set: updateTravelDto }).exec();
        const { services, itemsNeeded, ...te } = updateTravelDto;
        return this.travelModel
            .findByIdAndUpdate(id, {
                $set: {
                    ...te,
                    services: services.split(','),
                    itemsNeeded: itemsNeeded.split(','),
                },
            })
            .exec();
    }

    async create(mid: string, createTravelDto: CreateTravelDto) {
        const { image, services, itemsNeeded, ...newTravelDto } =
            createTravelDto;
        let pathImage = `/static/img/elements/12.jpg`;
        if (typeof image !== 'string') {
            writeFileSync(
                join(
                    __dirname,
                    '..',
                    '..',
                    'static',
                    'upload',
                    image.originalName,
                ),
                image.buffer,
            );
            pathImage = `/static/upload/${image.originalName}`;
        }

        const newTravel = new this.travelModel({
            ...newTravelDto,
            image: pathImage,
            services: services.split(','),
            itemsNeeded: itemsNeeded.split(','),
            manager: await this.userService.findOneById(mid),
        });
        return newTravel.save();
    }

    async findOneById(id: string): Promise<TravelDocument> {
        return this.travelModel.findById(id).populate('manager');
    }

    async deleteById(id: string, user: UserSession) {
        const travel = await (await this.findOneById(id)).populate('manager');
        if (
            travel.manager.role === user.role ||
            [Role.SystemManager, Role.CollegeManager].includes(user.role) ||
            (travel.manager.role === Role.ComputerForumAdmin &&
                user.role === Role.ComputerGroupManager) ||
            (travel.manager.role === Role.IndustryForumAdmin &&
                user.role === Role.IndustryGroupManager)
        ) {
            return this.travelModel.findByIdAndRemove(id);
        }
        throw new ForbiddenException();
    }

    async exportExcel(travelId: string, res: Response) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('لیست افراد');
        worksheet.views = [{ rightToLeft: true }];
        worksheet.columns = [
            { key: 'firstName', header: 'نام' },
            { key: 'lastName', header: 'نام خانوادگی' },
            { key: 'gendere', header: 'جنسیت' },
            { key: 'role', header: 'نقش' },
            { key: 'phoneNumber', header: 'شماره تلفن' },
        ];
        const travel = await (
            await this.findOneById(travelId)
        ).populate('users');
        travel.users.forEach((user) => {
            worksheet.addRow({
                firstName: user.firstName,
                lastName: user.lastName,
                gendere: user.gendere === 'male' ? 'مرد' : 'زن',
                role: user.role,
                phoneNumber: user.phoneNumber,
            });
        });
        await workbook.xlsx.write(res);
    }

    async signupUserIntoTravel(userId: string, travelId: string) {
        const user = await this.userService.findOneById(userId);
        const travel = await this.findOneById(travelId);
        if (travel.users.length < travel.capacity) {
            user.travels.push(travel);
            await user.save();

            travel.users.push(user);
            await travel.save();
        }
    }

    async signupCancelUserFromTravel(userId: string, travelId: string) {
        const user = await this.userService.findOneById(userId);
        const travel = await this.findOneById(travelId);

        const idxTravelInUser = user.travels.findIndex(
            (v) => v._id.toString() === travelId,
        );
        user.travels.splice(idxTravelInUser, 1);
        await user.save();

        const idxUserInTravel = travel.users.findIndex(
            (v) => v._id.toString() === userId,
        );
        travel.users.splice(idxUserInTravel, 1);
        await travel.save();
    }
}
