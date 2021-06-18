import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Configuration} from "../../api";

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  protected basePath = 'http://localhost:8080';
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient) { }

  public uploadPaper(name: string, abstractParagraph: string, paper: File, conferenceId: string, authorId: string): Observable<HttpEvent<{}>>{
    const data: FormData = new FormData();
    data.append('paper', paper);
    data.append('name', name);
    data.append('abstract', abstractParagraph);
    data.append('conferenceId', conferenceId);
    data.append('authorId', authorId);

    const newRequest = new HttpRequest('POST', `${this.basePath}/api/paper/upload`, data, {
      reportProgress: true,
      withCredentials: true,
    });
    return this.httpClient.request(newRequest);
  }
}
