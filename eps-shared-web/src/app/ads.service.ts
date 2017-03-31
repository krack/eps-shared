import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

import { Ad } from './model/ad';

@Injectable()
export class AdsService {

  private adsUrl = environment.apiUrl+'articles/';  // URL to web API
  constructor (private http: Http) {}

  getAds (): Observable<Ad[]> {
    return this.http.get(this.adsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();    
    console.log(body);
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getAd (id: String): Observable<Ad> {
    return this.http.get(this.adsUrl+id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addAd (ad: Ad): Observable<Ad> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.adsUrl, ad, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateAd (ad: Ad): Observable<Ad> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.put(this.adsUrl+ad._id, ad, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteAd (id: String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.adsUrl+id, options);
  }
}
