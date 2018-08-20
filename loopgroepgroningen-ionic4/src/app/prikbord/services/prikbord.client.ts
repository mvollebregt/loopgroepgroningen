import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/backend/services/http.service';
import {Bericht} from '../../api';

@Injectable({providedIn: 'root'})
export class PrikbordClient {

  constructor(private httpService: HttpService
              // private loginService: LoginService
  ) {
  }

  // haalt berichten op: de nieuwste eerst
  haalBerichtenOp(): Observable<Bericht[]> {
    return this.httpService.get<Bericht>('prikbord');
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
