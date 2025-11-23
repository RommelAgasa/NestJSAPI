import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/role.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userRoles = user?.role ?? user?.roles; // support both `role` and `roles`
        return matchRoles(requiredRoles, userRoles);
    }
}

function matchRoles(requiredRoles: string[], userRoles: string[] | string | undefined): boolean {
    if (!userRoles) return false;

    if (Array.isArray(userRoles)) {
        return requiredRoles.some((role: string) => userRoles.includes(role));
    }

    // if roles stored as a single string, check for exact match or substring
    return requiredRoles.some((role: string) => (userRoles as string).includes(role));
}