import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

    constructor(private http: HttpClient) { }

    createCollection(body: JSON){
        console.log(body);
        console.log(environment.apiURL);
        return this.http.post("http://localhost:8080/api/createCollection", body);
    }

}