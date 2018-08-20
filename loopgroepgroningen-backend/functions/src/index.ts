import * as functions from 'firebase-functions';
import {getPrikbord} from './prikbord/prikbord';


export const prikbord = functions.https.onRequest(getPrikbord);
