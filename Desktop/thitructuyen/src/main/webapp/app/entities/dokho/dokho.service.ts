import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDokho } from 'app/shared/model/dokho.model';

type EntityResponseType = HttpResponse<IDokho>;
type EntityArrayResponseType = HttpResponse<IDokho[]>;

@Injectable({ providedIn: 'root' })
export class DokhoService {
  public resourceUrl = SERVER_API_URL + 'api/dokhos';

  constructor(protected http: HttpClient) {}

  create(dokho: IDokho): Observable<EntityResponseType> {
    return this.http.post<IDokho>(this.resourceUrl, dokho, { observe: 'response' });
  }

  update(dokho: IDokho): Observable<EntityResponseType> {
    return this.http.put<IDokho>(this.resourceUrl, dokho, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDokho>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDokho[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
