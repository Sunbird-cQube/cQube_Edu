import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DatasourceMetadataService } from '../../services/datasource-metadata-service/datasource-metadata.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataInterceptor implements HttpInterceptor {

  constructor(private readonly _dataSourceMetadataService: DatasourceMetadataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let body = event.body;

          if (body.result && body.result.fileMetaData) {
            this._dataSourceMetadataService.updateMetaData(body.result.fileMetaData);
          } else if (body.fileMetaData) {
            this._dataSourceMetadataService.updateMetaData(body.fileMetaData);
          }
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this._dataSourceMetadataService.updateMetaData(undefined);
        return throwError(error);
      }));
  }
}
