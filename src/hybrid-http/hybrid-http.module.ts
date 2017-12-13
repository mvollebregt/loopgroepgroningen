import {NgModule} from "@angular/core";
import {HTTP} from "@ionic-native/http";
import {CordovaHttp} from "../hybrid-http/cordova.http";
import {AngularHttp} from "./angular-http";
import {HttpService} from "./http.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AngularHttpInterceptor} from "./angular-http-interceptor";

@NgModule({
  providers: [
    AngularHttp,
    CordovaHttp,
    HTTP,
    HttpService,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AngularHttpInterceptor,
      multi: true,
    }
    ]
  ]
})
export class HybridHttpModule {
}
