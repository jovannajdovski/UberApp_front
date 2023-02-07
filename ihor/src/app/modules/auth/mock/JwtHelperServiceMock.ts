import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class JwtHelperServiceMock {

  decodeToken(): Array<{sub:string, jti:number, role:string}> {
    return [
      {
        sub: 'passenger@gmail.com',
        jti: 1,
        role: "ROLE_PASSENGER"
      }
    ];
  }
}
