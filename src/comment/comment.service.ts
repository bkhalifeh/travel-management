import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';
import { UserSession } from 'src/auth/types/user.session';
import { CommentManagement } from 'src/auth/enums/role.enum';
import { Types, mongo } from 'mongoose';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
    ) {}

    findManyByTravelId(travelId: string): Promise<CommentDocument[]> {
        return this.commentModel
            .find({
                travel: travelId,
                isVerified: true,
            })
            .sort({ createdAt: -1 });
    }

    findAll() {
        return this.commentModel.find().exec();
    }

    async findAllExcept(authorId: string) {}

    findByAuthor(id: string) {
        return this.commentModel
            .find({
                author: id,
                // isVerified: true,
                // inTrash: false,
            })
            .populate('author')
            .populate('travel')
            .exec();
    }

    findNotVerified() {
        return this.commentModel.find({
            isVerified: false,
        });
    }

    create(user: UserSession, createCommentDto: CreateCommentDto) {
        const newComment = new this.commentModel({
            content: createCommentDto.content,
            travel: createCommentDto.travelId,
            author: user.id,
            isVerified: CommentManagement.includes(user.role),
        });
        return newComment.save();
    }

    findOne(id: string) {
        return this.commentModel.findById(id);
    }

    delete(id: string) {
        return this.commentModel.findByIdAndDelete(id).exec();
    }

    moveToTrash(id: string) {
        return this.commentModel
            .findByIdAndUpdate(id, {
                $set: {
                    inTrash: true,
                },
            })
            .exec();
    }

    restoreFromTrash(id: string) {
        return this.commentModel
            .findByIdAndUpdate(id, {
                $set: {
                    inTrash: false,
                },
            })
            .exec();
    }

    verified(id: string) {
        return this.commentModel
            .updateOne({ _id: id }, { $set: { isVerified: true } })
            .exec();
    }
}
