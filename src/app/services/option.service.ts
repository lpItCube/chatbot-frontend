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

    getNextNode(id: number){
      return this.http.get(environment.apiURL+"/getNextNode?optionId="+id);
    }

    createOptionLink(optionId: number, nodeId: number){
      let body = "";

      return this.http.post(environment.apiURL+"/createOptionLink?optionId="+optionId+"&nodeId="+nodeId, body, {responseType: 'text'});
    }

    removeOptionLink(optionId: number, nodeId: number){

      return this.http.delete(environment.apiURL+"/removeOptionLink?optionId="+optionId+"&nodeId="+nodeId, {responseType: 'text'});
    }

}