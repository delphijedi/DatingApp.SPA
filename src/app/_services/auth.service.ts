import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
    decodedToken: any;
    jwtHelper: JwtHelperService = new JwtHelperService();
constructor(private http: HttpClient) {}

login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
        const tokenString = JSON.stringify(response);
        const tokenString2 = JSON.parse(tokenString);
        if (tokenString2) {
            localStorage.setItem('token', tokenString2.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(tokenString);
            console.log(this.decodedToken);
            this.userToken = tokenString;
        }
    }).catch(this.handleError);
}
    registerUser(model: any) {
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
    }
    loggedIn() {
        const decodedToken = localStorage.getItem('token');
        if (decodedToken == null) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(decodedToken);
    }

    private requestOptions() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return {headers: headers};
    }

    private handleError(error: any) {
        const applicationError = error.headers.get('application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        const serverError = error.error;
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(
            modelStateErrors || 'server error'
        );
    }
}
