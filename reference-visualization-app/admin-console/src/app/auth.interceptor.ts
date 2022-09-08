import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloneReq = request.clone({
      setHeaders: {
        // token: `Bearer ${localStorage.getItem('token')}`
        token: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzMlNyMkdYVUswTnFISGM4WkdQMUZvcFlRVlFOTnNmNlFGX3h4ZW9ZcGxZIn0.eyJleHAiOjE2NjMyMjIzOTcsImlhdCI6MTY2MjYzMjY3NCwiYXV0aF90aW1lIjoxNjYyNjE3NTk3LCJqdGkiOiJjYzMwOTZhZi05YjYxLTQ2MmUtODYwZS1iNGVjNDZlMmJmNmIiLCJpc3MiOiJodHRwczovL2NxdWJlLXJlbGVhc2UudGliaWxwcm9qZWN0cy5jb20vYXV0aC9yZWFsbXMvY1F1YmUiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiOTQ3MjY0YjgtYWU1MS00YjljLWFlMTQtYzMzNjczZmU2Mzc4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3F1YmVfYXBwIiwibm9uY2UiOiI5MDBjNGQxZC1lYjRkLTQxOWEtYWZmYS1mYTM2ZDQxYzgwNDEiLCJzZXNzaW9uX3N0YXRlIjoiM2NkNzM5NzMtOWUyZS00YjdhLTg4YWYtYmI2NWNmZWU5Yjg2IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2NxdWJlLXJlbGVhc2UudGliaWxwcm9qZWN0cy5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtcmVhbG0iLCJtYW5hZ2UtdXNlcnMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.FtVxNLYbhLFMWeybxljL6AsLzQJZb43l3mGqkFYR2TN7ykD7jkCiCOsnb8sm0hHzNUQ6kaouTTSzA2LXABPppPQB3wee0qzaD5AoSaRTpG5dlKxnwEVjpfad8yyt7nQy-DqRJ25_XXIns9URxbvsGda5sBtdEFn9I2uC2SjQpTGiD5vuZfg9mvABfqJ-W-63pJQN4xd_RCY2pAFOpR2R-a1GwcluXkOnlmZTt9BlvdA18yI-acK18_3xy3N-R5od0od8SxN7pAtSNFxfItsBfxwWerpVpjhOKoByuEe3LLmDXpOrWd4O0KXIYNNUMVbajZmhh4HmN2Z6RgJJkFkE3g"
      }
    })
    console.log('cloneReq', cloneReq)
    return next.handle(cloneReq)
  }
}
