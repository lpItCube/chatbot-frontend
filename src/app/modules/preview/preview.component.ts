import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PreviewComponent implements OnInit {

  public id = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.id);
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
