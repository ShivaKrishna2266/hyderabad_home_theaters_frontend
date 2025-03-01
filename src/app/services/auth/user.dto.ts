export default class UserDTO {
    username : string='';
    email : string='' ;
    phoneNumber:string='';
    password : string='' ;
    appUserRoles : string[] = [];
}

export enum AppUserRole {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = "ROLE_USER",
   
  }
  

  export class AuthenticationRequest {
    username :string='' ;
    password :string ='';
  }