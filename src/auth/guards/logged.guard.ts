import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LoggedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const isAuth = req.isAuthenticated();
        if (isAuth) res.redirect('/');
        return !isAuth;
    }
}
