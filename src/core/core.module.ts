import {NgModule} from "@angular/core";
import {PrikbordService} from "./prikbord.service";
import {PrikbordClient} from "./prikbord.client";
import {LoginService} from "./login/login.service";
import {HttpService} from './http.service';
import {WachtwoordkluisService} from './login/wachtwoordkluis.service';
import {ContactoptiesService} from './contacten/contactopties.service';
import {Contacts} from '@ionic-native/contacts';
import {InstellingenService} from './instellingen.service';

@NgModule({
  providers: [
    ContactoptiesService,
    Contacts,
    HttpService,
    InstellingenService,
    LoginService,
    PrikbordService,
    PrikbordClient,
    WachtwoordkluisService
  ]
})
export class CoreModule {
}
