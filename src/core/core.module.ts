import {NgModule} from "@angular/core";
import {PrikbordService} from "./prikbord.service";
import {PrikbordClient} from "./prikbord.client";

@NgModule({
  providers: [
    PrikbordService,
    PrikbordClient
  ]
})
export class CoreModule {
}
