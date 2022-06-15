import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

    constructor(private http: HttpClient) { }

    createCollection(body: JSON){

        return this.http.post(environment.apiURL+"/createCollection", body);
    }

    getCollections(){
      return this.http.get(environment.apiURL+"/getCollections");
    }

}