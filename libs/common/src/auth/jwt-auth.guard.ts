import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  //[CanActivate return false or true]
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Auth;
    // if jwt token not exists, return false (response HTTP 403 status)
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', {
        Auth: jwt,
      }) // send jwt token to auth service handleling...
      .pipe(
        // when auth service response success, set response data to user request
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        // after set response, return true (response HTTP 20x status)
        map(() => true),
        // catch error, return false (response HTTP 403 status)
        catchError(() => of(false)),
      );
  }
}
