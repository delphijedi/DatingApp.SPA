import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
constructor(private http: HttpClient) {}

login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
        const tokenString = JSON.stringify(response);
        const tokenString2 = JSON.parse(tokenString);
        if (tokenString2) {
            localStorage.setItem('token', tokenString2.tokenString);
            this.userToken = tokenString;
        }

    });
}
    registerUser(model: any) {
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
    }

    private requestOptions() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return {headers: headers};
    }


}
