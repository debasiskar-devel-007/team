import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = "http://166.62.39.137:5009/uploads";
  public response: any = {};

  constructor(private httpClient: HttpClient) { }
  public upload(data, userId) {
    return this.httpClient.post<any>(this.SERVER_URL, data, {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const uploadPercent = Math.round(100 * event.loaded / event.total);
            this.response = { status: "process", data: { total: 100, loaded: uploadPercent } };
            return this.response;
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
            // return `Unhandled event: ${event.type}`;


        }
      })
    );
  }
}
