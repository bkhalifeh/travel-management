import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return context.switchToHttp().getRequest().user.isAdmin;
    }
}
