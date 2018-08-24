import * as functions from 'firebase-functions';
import {get, post} from './shared/http';
import {mapToBerichten} from './mappers/prikbord';
import {Bericht, LoginRequest, LoginResponse} from './api';
import {mapToLoginResponse} from './mappers/login-response';

export const login = functions.https.onRequest(
  post<LoginRequest, LoginResponse>(
    'index.php/loopgroep-groningen-ledeninfo',
    '#login-form',
    'button',
    mapToLoginResponse)
);

export const prikbord = functions.https.onRequest(
  get<Bericht[]>('index.php/prikbord', 'div.easy_frame', mapToBerichten)
);
