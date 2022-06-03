import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

    constructor(private http: HttpClient) { }

    createOption(body: JSON){
        return this.http.post(environment.apiURL+"/addOption", body);
    }

}