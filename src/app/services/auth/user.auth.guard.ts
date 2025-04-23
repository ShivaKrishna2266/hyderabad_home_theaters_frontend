import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserStorageService } from '../storege/user-storege.service';


type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => boolean;

export const userAuthGuard: CanActivateFn = (route, state) => {
  return UserStorageService.isUserLOggedIn();
};

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  canActivate = userAuthGuard;
}
