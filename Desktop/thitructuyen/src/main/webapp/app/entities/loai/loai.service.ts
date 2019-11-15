import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILoai } from 'app/shared/model/loai.model';

type EntityResponseType = HttpResponse<ILoai>;
type EntityArrayResponseType = HttpResponse<ILoai[]>;

@Injectable({ providedIn: 'root' })
export class LoaiService {
  public resourceUrl = SERVER_API_URL + 'api/loais';

  constructor(protected http: HttpClient) {}

  create(loai: ILoai): Observable<EntityResponseType> {
    return this.http.post<ILoai>(this.resourceUrl, loai, { observe: 'response' });
  }

  update(loai: ILoai): Observable<EntityResponseType> {
    return this.http.put<ILoai>(this.resourceUrl, loai, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoai>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoai[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
