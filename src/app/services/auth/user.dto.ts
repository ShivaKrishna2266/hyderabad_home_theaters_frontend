export default class UserDTO {
    username : string | undefined;
    name : string | undefined;
    email : string | undefined;
    password : string | undefined;
    appUserRoles : string[] | undefined;
}

export enum AppUserRole {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = "ROLE_USER",
   
  }
  

  export class AuthenticationRequest {
    username :string | undefined;
    password :string | undefined;
  }