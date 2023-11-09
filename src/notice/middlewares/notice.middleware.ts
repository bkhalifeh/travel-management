import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NoticeMiddleWare implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        next();
    }
}
