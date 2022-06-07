import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';
import { DragDropModule} from '@angular/cdk/drag-drop';

import LeaderLine from 'leader-line-new';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public id = "";
  public nodeNumber = 0;
  public nodesOfCollection = [];
  public allOptions = [];
  public linksOptions = [];

  public nodeForm = this.fb.group({
    "title": ["", Validators.required],
    "description":["", Validators.required],
    //"data": ["", Validators.required],
    "type": ["", Validators.required]
    //"collection_id": ["", Validators.required],
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private nodeservice: NodeService,
              private optionComponent: OptionComponent) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.id);
    this.getNodes();
  }

  ngAfterViewInit(): void{
    this.fixTextareaHieght();

    /*const boxes = document.querySelectorAll('.cardEvent');
        boxes.forEach(box => {
          box.addEventListener('mousemove', function() {
            //line1.position();
            console.log('uwu');
          });
    });*/

  }

  optionModal(nodeID: any){
    document.getElementById("accionadorModalOpciones")!.setAttribute('value', nodeID);
  }

  getNodes(){
    console.log(this.id);
    this.nodeservice.getNodesCollID(this.id).subscribe( async (res:any) => {
      console.log(res);
      this.nodeNumber = res.length;
      this.nodesOfCollection = res;
      this.allOptions = [];
      for(let i=0;i<this.nodeNumber;i++){
        for(let j=0;j<res[i]['options'].length;j++){
          this.allOptions.push(res[i]['options'][j]);
        } 
      }
      console.log(this.allOptions);
      this.linksOptions = await this.optionComponent.getLinkOptions(this.allOptions);
      console.log(this.linksOptions);
      this.putArrows();
    });
  }

  putArrows(){
    for(let option in this.linksOptions){
      console.log(this.linksOptions[option]);
      let optionId = 'optionId-'+this.linksOptions[option]['optionId'];
      let nodeId = 'nodeId-'+this.linksOptions[option]['nodeId'];

        if (document.querySelector("#"+optionId)) {
          console.log("encontrao");
          const line1 = new LeaderLine(
            document.getElementById(optionId),
            document.getElementById(nodeId)
          );
          const boxes = document.querySelectorAll('.cardEvent');
          boxes.forEach(box => {
            box.addEventListener('mousemove', function() {
              line1.position();
              console.log('uwu');
            });
          });
        }
      /*const line = new LeaderLine(
        document.getElementById('optionId-'+option['optionId']),
        document.getElementById('nodeId-'+option['nodeId'])
      );*/
    }
  }

  fixTextareaHieght(){
    console.log("hola");
    let textare = document.getElementById('testTextArea');
    console.log(textare);
    //oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
  }

  showModalCreateNode(){
    let modal = document.getElementById('NewNodeModal');
    modal!.style.display = "block";
  }

  closeModal(){
    let modal = document.getElementById('NewNodeModal');
    modal!.style.display = "none";
  }

  onSubmitNode() {
    console.log("uwu");

    if (this.nodeForm.invalid) { return; }

    console.log(this.nodeForm.value);

    this.nodeForm.value['collectionId'] = parseInt(this.id);

    if(this.nodeNumber == 0)
      this.nodeForm.value['firstNode'] = true;
    else
      this.nodeForm.value['firstNode'] = false;

    this.nodeForm.value['lastNode'] = true;
    this.nodeForm.value['options'] = [];
    this.nodeForm.value['data'] = null;
    this.nodeForm.value['refOptIds'] = null;

    this.nodeservice.createNode(this.nodeForm.value).subscribe( async (res:any) => {
      console.log(res);
      if(res['id']){
        console.log("ok");
        this.nodeForm.reset();
        //window.location.href = ('/');
      }else{
        console.log("error");
      }
    });

    if(this.nodeNumber == 0){
      //Assign first_node to the created one
    }
    
  }

  checkOption(id){
    console.log(id);
  }

}
