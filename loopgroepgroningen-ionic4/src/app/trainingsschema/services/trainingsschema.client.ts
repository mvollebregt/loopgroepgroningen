import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/backend/http.service';
import {Trainingsschema} from '../../api';

@Injectable({providedIn: 'root'})
export class TrainingsschemaClient {

  constructor(private httpService: HttpService) {
  }

  haalTrainingsschemaOp(): Observable<Trainingsschema> {
    return this.httpService.get<Trainingsschema>('trainingsschema');
  }
}
