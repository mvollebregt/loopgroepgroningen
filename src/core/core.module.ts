import {NgModule} from "@angular/core";
import {PrikbordService} from "./prikbord.service";
import {PrikbordClient} from "./prikbord.client";
import {LoginService} from "./login.service";
import {HttpService} from './http.service';

@NgModule({
  providers: [
    HttpService,
    LoginService,
    PrikbordService,
    PrikbordClient
  ]
})
export class CoreModule {
}
