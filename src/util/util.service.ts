import { Injectable } from '@nestjs/common';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UtilService {
    public static randomInt(min: number, max: number) {
        const ceilMin = Math.ceil(min);
        const ceilMax = Math.floor(max);
        return Math.floor(Math.random() * (ceilMax - ceilMin) + ceilMin);
    }
    public static randomProfile(gendere: string) {
        return `/static/img/avatars/${gendere}/${UtilService.randomInt(
            1,
            4,
        )}.png`;
    }

    public static roleScore(r: Role) {
        if (r === Role.SystemManager) return 6;
        else if (r === Role.CollegeManager) return 5;
        else if (
            r === Role.ComputerGroupManager ||
            r === Role.IndustryGroupManager
        )
            return 4;
        else if (r === Role.ComputerForumAdmin || r === Role.IndustryForumAdmin)
            return 3;
        else if (
            r === Role.ComputerForumMember ||
            r === Role.IndustryForumMember
        )
            return 2;
        else return 1;
    }

    public static customeFormatTime(d: Date) {
        const s = formatDistanceToNow(d)
            .replaceAll('about ', '')
            .replaceAll('over ', '')
            .replaceAll('almost', '');
        if (s === 'less than a minute') return 'کمتر از یک دقیقه قبل';
        else if (s.includes('minute')) return `${s.split(' ')[0]} دقیقه قبل`;
        else if (s.includes('hour')) return `${s.split(' ')[0]} ساعت قبل`;
        else if (s.includes('day')) return `${s.split(' ')[0]} روز قبل`;
        else if (s.includes('month')) return `${s.split(' ')[0]} ماه قبل`;
        else if (s.includes('year')) return `${s.split(' ')[0]} سال قبل`;
    }
}
