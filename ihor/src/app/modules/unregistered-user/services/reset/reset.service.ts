import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileWId } from 'src/app/modules/account/model/profile';
import { environment } from 'src/environments/environment';
import { Message } from '../../model/Message';
import { ResetPasswordDTO } from '../../model/ResetPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) { }

  checkPassengerByEmail(email: string): Observable<ProfileWId> {
    return this.http.get<ProfileWId>(environment.apiHost + "passenger/email/check/"+ email, 
    {"headers": this.headers})
  }

  sendResetCodeToEmail(id: number): Observable<Response> {
    return this.http.get<Response>(environment.apiHost + "user/"+ id+"/resetPassword", 
    {"headers": this.headers})
  }

  changePasswordWithResetCode(id: number, resetPasswordDTO: ResetPasswordDTO): Observable<Message> {
    return this.http.put<Message>(environment.apiHost + "user/"+ id+"/resetPassword", resetPasswordDTO,
    {"headers": this.headers})
  }
}
