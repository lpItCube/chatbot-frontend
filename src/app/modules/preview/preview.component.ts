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
  public btn = document.querySelector("button");

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

    });
  }

  createQuestion(){
    console.log(this.nodesOfCollection[this.currentNode].description);

    /*if(this.nodesOfCollection[this.currentNode].type == "Normale"){



    }else if(this.nodesOfCollection[this.currentNode].type == "input"){
    }*/

    var container = document.getElementById("container");

    var answerDiv = document.createElement("div");
        answerDiv.setAttribute('class', 'leftMessage');

    var content = `
        <img src="../../../assets/imgs/chatbot_default.png">
        <div class="content">
            <div class="message">
                <p>`+this.nodesOfCollection[this.currentNode].description+`</p>
            </div>
            <div id="options" class="options">`;
    if(this.nodesOfCollection[this.currentNode].options.length != 0)
      content += `<p>Choose an option</p>`;
          
    content += `</div>
        </div>`;

    answerDiv.innerHTML = content;

    container.appendChild(answerDiv);

    var options = document.getElementById("options");


    for(var i = 0; i < this.nodesOfCollection[this.currentNode].options.length; i++){

      var option = this.nodesOfCollection[this.currentNode].options[i];

      var button = document.createElement("button");
      button.setAttribute('class', 'previewButton');

      button.innerHTML = option.description;

      button.onclick = () => {
        this.createAnswer(option.description)
      };

      options.appendChild(button);

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

    this.createQuestion();
  }

  goEdit(){
    window.location.href = ('/edit/'+this.id);
  }

}
