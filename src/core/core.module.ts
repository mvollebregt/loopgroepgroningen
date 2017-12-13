import {NgModule} from "@angular/core";
import {PrikbordService} from "./prikbord.service";
import {PrikbordClient} from "./prikbord.client";
import {HybridHttpModule} from "../hybrid-http/hybrid-http.module";
import {LoginService} from "./login.service";

@NgModule({
  imports: [
    HybridHttpModule
  ],
  providers: [
    LoginService,
    PrikbordService,
    PrikbordClient
  ]
})
export class CoreModule {
}
