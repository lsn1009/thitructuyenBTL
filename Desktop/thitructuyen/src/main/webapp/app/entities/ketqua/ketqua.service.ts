import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IKetqua } from 'app/shared/model/ketqua.model';

type EntityResponseType = HttpResponse<IKetqua>;
type EntityArrayResponseType = HttpResponse<IKetqua[]>;

@Injectable({ providedIn: 'root' })
export class KetquaService {
  public resourceUrl = SERVER_API_URL + 'api/ketquas';
  public resourceUrlUser = SERVER_API_URL + 'api/ketquas/user';

  constructor(protected http: HttpClient) {}

  create(ketqua: IKetqua): Observable<EntityResponseType> {
    return this.http.post<IKetqua>(this.resourceUrl, ketqua, { observe: 'response' });
  }

  update(ketqua: IKetqua): Observable<EntityResponseType> {
    return this.http.put<IKetqua>(this.resourceUrl, ketqua, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKetqua>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKetqua[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  queryUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKetqua[]>(this.resourceUrlUser, { params: options, observe: 'response' });
  }
}
