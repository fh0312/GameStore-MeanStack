import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';

@Injectable({ providedIn: 'root' })

export class UserService {

  private apiUrl = environment.apiUrl;
  private userUrl = this.apiUrl+'/register';
  private authUrl = this.apiUrl+'/auth';
  private updateUrl = this.apiUrl+'/user';
  private updateImageUrl = this.apiUrl+'/user/image';
  private dashboardUrl = this.apiUrl+'/dashboard';
  private imagesUrl = this.apiUrl + '/images';
  constructor(private http: HttpClient) { }

 
  createUser(username: string, password: string): Observable<any> {
    const body = { username: username, password: password};
    return this.http.post(this.userUrl, body);
  }
  
  authenticateUser(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.http.post(this.authUrl, body)
  }
  

  updateUser(user: User): Observable<any> {
    const body = { username: user.username};
    return this.http.put(`${this.updateUrl}/${user._id}`, body);
  }

  getImages(): Observable<any> {
  return this.http.get(this.imagesUrl);
  }



  updateImage (user: User, name: string): Observable<any> {
    console.log(`${this.updateImageUrl}/${user._id}`);
    const body = { name};
    console.log('why?' + user._id);
     
    return this.http.put(`${this.updateImageUrl}/${user._id}`, body);
  }




}


