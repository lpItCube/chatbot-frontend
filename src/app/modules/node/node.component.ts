import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';
import { DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public id = "";
  public nodeNumber = 0;
  public nodesOfCollection = [];

  public nodeForm = this.fb.group({
    "title": ["", Validators.required],
    "description":["", Validators.required],
    //"data": ["", Validators.required],
    "type": ["", Validators.required]
    //"collection_id": ["", Validators.required],
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private nodeservice: NodeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.id);
    this.getNodes();
  }

  ngAfterViewInit(): void{
    this.fixTextareaHieght();
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
    });
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

}
