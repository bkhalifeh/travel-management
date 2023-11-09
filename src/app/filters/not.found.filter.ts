import {
    Catch,
    NotFoundException,
    ExceptionFilter,
    ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(e: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse();
        res.render('error/notfound');
    }
}
