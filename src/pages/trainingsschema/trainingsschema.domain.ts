import {Training} from './training';
import {Sectie} from '../../core/sectie';

export interface Trainingsschema {

  A: Sectie<Training>[];
  B: Sectie<Training>[];
  C: Sectie<Training>[];

}
