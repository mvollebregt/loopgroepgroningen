import {Training} from './training';
import {Sectie} from '../shared';

export interface Trainingsschema {

  A: Sectie<Training>[];
  B: Sectie<Training>[];
  C: Sectie<Training>[];

}
