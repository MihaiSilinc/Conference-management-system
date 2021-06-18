import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.params.has("paperName"))
      request = request.clone({
        responseType: "blob"
      })

    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request)
  }
}
