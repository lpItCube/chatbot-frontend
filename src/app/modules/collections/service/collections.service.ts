import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

    constructor(private http: HttpClient) { }

    getCollections(){
        return this.http.get("http://localhost:8080/api/getCollections");
    }

}