import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) {
  }

  login(): Observable<void> {
    return this.httpService
      .post(
        'index.php/loopgroep-groningen-ledeninfo',
        '#login-form',
        {
          username: '',
          password: ''
        }, formData => formData['task'] === "user.login"
      ).map(()=>{});
  }
}
