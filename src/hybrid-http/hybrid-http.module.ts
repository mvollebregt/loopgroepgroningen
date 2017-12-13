import {NgModule} from "@angular/core";
import {HTTP} from "@ionic-native/http";
import {CordovaHttp} from "../hybrid-http/cordova.http";
import {AngularHttp} from "../hybrid-http/angular.http";
import {HttpService} from "./http.service";

@NgModule({
  providers: [
    AngularHttp,
    CordovaHttp,
    HTTP,
    HttpService,
  ]
})
export class HybridHttpModule {
}
