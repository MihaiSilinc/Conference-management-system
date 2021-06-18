import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private url = environment.apiUrl + "/authentication/logout"

  constructor(private http: HttpClient) { }

  logout(): Observable<void> {
    return this.http.get<void>(this.url);
  }
}
