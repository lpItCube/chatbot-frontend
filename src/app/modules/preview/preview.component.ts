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
  public currentNode = null;
  public btn = document.querySelector("button");

  constructor(private route: ActivatedRoute,
              private nodeservice: NodeService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    this.currentNode = 0;
    this.getFirstNode();
  }

  getFirstNode() {
    this.nodeservice.getFirstNode(this.id).subscribe( async (res:any) => {
      this.currentNode = res
      this.createQuestion()
    });
  }

  async getNextNode(optionId) {
    this.nodeservice.getNextNode(optionId).subscribe( async (res:any) => {
      console.log("GetNextNode")
      this.currentNode = res
    });
  }

  createQuestion(){
    var container = document.getElementById("container");
    var answerDiv = document.createElement("div");
        answerDiv.setAttribute('class', 'leftMessage');
    var content = `
        <img src="../../../assets/imgs/chatbot_default.png">
        <div class="content">
            <div class="message">
                <p>`+this.currentNode.description+`</p>
            </div>
            <div id="options" class="options">`;

    if(this.currentNode.options.length != 0)
      content += `<p>Choose an option</p>`;
    content += `</div>
        </div>`;

    answerDiv.innerHTML = content;

    container.appendChild(answerDiv);
    var options = document.getElementById("options");

    for(var i = 0; i < this.currentNode.options.length; i++){
      var option = this.currentNode.options[i];
      var button = document.createElement("button");
      button.setAttribute('class', 'previewButton');
      button.setAttribute('id', option.id)

      button.innerHTML = option.description;

      console.log("optionesima", option.id)

      button.onclick = (ev) => {
        let clickedOpt = (ev.target as HTMLElement)
        this.createAnswer(clickedOpt.textContent, clickedOpt.id)
      };

      options.appendChild(button);

    }

  }

  async createAnswer(text, optionId){
    console.log("OptionId: ", optionId)
    await new Promise<void> ((resolve, reject) => {

      this.nodeservice.getNextNode(optionId).subscribe( async (res:any) => {
        if(res != null){
          this.currentNode = res
          resolve();
        }
        else this.removeOptionHtml()
        return
        }, (err: any) => reject());
        
      }).then(() => {
      
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


        this.removeOptionHtml()

        this.createQuestion();
    })

    
  }

  removeOptionHtml() {
    var options = document.getElementById("options");

    options.parentNode.removeChild(options);
  }

  goEdit(){
    window.location.href = ('/edit/'+this.id);
  }

}
