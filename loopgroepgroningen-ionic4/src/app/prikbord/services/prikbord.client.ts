import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/http.service';
import {Bericht} from '../../api';

@Injectable({providedIn: 'root'})
export class PrikbordClient {

  constructor(private httpService: HttpService
              // private loginService: LoginService
  ) {
  }

  getBerichten(start = 0): Observable<Bericht[]> {
    const params = {start};
    return this.httpService.get<Bericht[]>('prikbord', params);
  }


  verstuurBericht(berichttekst: string): Observable<Bericht[]> {
    // return this.loginService
    //   .login().pipe(
    //     switchMap(() =>
    //       this.httpService.post(
    //         'index.php/prikbord/entry/add',
    //         'form[name=\'gbookForm\']',
    //         {gbtext: berichttekst}).pipe(
    //         this.httpService.extractWithRetry('div.easy_frame', PrikbordClient.toBericht)
    //       )
    //     )
    //   )
    return null;
  }
}
