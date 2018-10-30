import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from '../../shared/backend/http.service';
import {Trainingsschema} from '../../api';

@Injectable({providedIn: 'root'})
export class TrainingsschemaClient {

  constructor(private httpService: HttpService) {
  }

  haalTrainingsschemaOp(): Observable<Trainingsschema> {
    return this.httpService.get<Trainingsschema>('trainingsschema');
  }
}
