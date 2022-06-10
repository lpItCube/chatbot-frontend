import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PreviewComponent implements OnInit {

  public id = "";
  public nodesOfCollection = [];
  public currentNode = 0;

  constructor(private route: ActivatedRoute,
              private nodeservice: NodeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.id);
    this.currentNode = 0;
    this.getNodes();
  }

  getNodes(){
    console.log(this.id);
    this.nodeservice.getNodesCollID(this.id).subscribe( async (res:any) => {
      console.log(res);
      this.nodesOfCollection = res;
      this.createQuestion();
      /*this.allOptions = [];
      for(let i=0;i<this.nodeNumber;i++){
        for(let j=0;j<res[i]['options'].length;j++){
          this.allOptions.push(res[i]['options'][j]);
        } 
      }
      console.log(this.allOptions);
      this.linksOptions = await this.optionComponent.getLinkOptions(this.allOptions);
      console.log(this.linksOptions);*/
    });
  }

  createQuestion(){
    console.log(this.nodesOfCollection[this.currentNode].description);
    if(this.nodesOfCollection[this.currentNode].type == "Normale"){

    }else if(this.nodesOfCollection[this.currentNode].type == "input"){

    }
    this.currentNode++;
  }

  createAnswer(text){

    var container = document.getElementById("container");

    var answerDiv = document.createElement("div");
        answerDiv.setAttribute('class', 'rightMessage');

    var answer = document.createElement("div");
        answer.setAttribute('class', 'message');

    var p = document.createElement("p")
    var texto = document.createTextNode(text);

    p.appendChild(texto);
    answer.appendChild(p);
    answerDiv.appendChild(answer);
    container.appendChild(answerDiv);


    var options = document.getElementById("options");

    options.parentNode.removeChild(options);

  }

}
