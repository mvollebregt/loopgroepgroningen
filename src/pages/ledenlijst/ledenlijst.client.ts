import {Injectable} from "@angular/core";
import {HTTP} from "@ionic-native/http";
import {HttpService} from "../../hybrid-http/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LedenlijstClient {

  constructor(private httpService: HttpService) {
  }

  haalLedenOp(): Observable<any> {
    return this.httpService.post(
      'index.php/loopgroep-groningen-ledeninfo',
      '@id=\'login-form\'',
      {
        username: '',
        password: ''
      });
    //
    //     , {
    //     username: '',
    //     password: '',
    //     remember: 'yes',
    //     option:" value="com_users" />
    //     task:" value="user.login" />
    //     return:" value="aW5kZXgucGhwP0l0ZW1pZD0yMw==" />
    //     9febdce45acde852aa233a89a127e998" value="1" />
    // }, {})
    //
    //
    //   return this.http.get('http://www.loopgroepgroningen.nl/index.php/loopgroep-groningen-ledeninfo/loopgroep-groningen-ledenlijst', {}, {});
  }

}
