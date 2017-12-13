import {NgModule} from "@angular/core";
import {PrikbordService} from "./prikbord.service";
import {PrikbordClient} from "./prikbord.client";
import {HybridHttpModule} from "../hybrid-http/hybrid-http.module";

@NgModule({
  imports: [
    HybridHttpModule
  ],
  providers: [
    PrikbordService,
    PrikbordClient
  ]
})
export class CoreModule {
}
