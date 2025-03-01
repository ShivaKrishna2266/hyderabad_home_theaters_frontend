import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserStorageService } from '../storege/user-storege.service';


type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => boolean;

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return UserStorageService.isAdminLoggedIn();
};

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  canActivate = adminAuthGuard;
}
