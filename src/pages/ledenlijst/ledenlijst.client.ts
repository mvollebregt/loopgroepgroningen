import {Injectable} from "@angular/core";
import {HttpService} from "../../hybrid-http/http.service";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login.service";

@Injectable()
export class LedenlijstClient {

  constructor(private httpService: HttpService, private loginService: LoginService) {
  }

  haalLedenOp(): Observable<any> {
    return this.loginService
      .login()
      .switchMap(() =>
        this.httpService.get(
          'index.php/loopgroep-groningen-ledeninfo/loopgroep-groningen-ledenlijst',
          '//li//a/text()',
          (x, y) => y
        )
      );
  }
}
