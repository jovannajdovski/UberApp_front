import { Injectable } from '@angular/core';

@Injectable()
export class JwtHelperServiceMock {
  constructor() { }

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