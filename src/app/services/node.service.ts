import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

    constructor(private http: HttpClient) { }

    createCollection(body: JSON){
        return this.http.post(environment.apiURL+"/createCollection", body);
    }

    getNodesCollID(id: any){
      return this.http.get(environment.apiURL+"/getNodes?collectionId="+id);
    }

}