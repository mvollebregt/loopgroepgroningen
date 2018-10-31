import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Safari does not like third party cookies. Let's see if it likes third party vegetables.
 */
@Injectable({
  providedIn: 'root'
})
export class VegetableJarService implements HttpInterceptor {

  // TODO: dit meer permanent opslaan
  private vegetables = {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestWithVegetables = req.clone({
      headers: req.headers.append('Vegetable', Object.entries(this.vegetables).map(([key, value]) => `${key}=${value}`))
    });

    return next.handle(requestWithVegetables).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        const setVegetableHeader = event.headers.get('Set-Vegetable');
        if (setVegetableHeader) {
          setVegetableHeader.split(',').forEach(vegetable => {
            const [key, value] = vegetable.split('=');
            this.vegetables[key.trim()] = value.trim();
          })
        }
      }
    }));
  }
}
