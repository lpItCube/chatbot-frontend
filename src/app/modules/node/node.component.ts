import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public id = "";
  public nodeNumber = 0;

  public nodeForm = this.fb.group({
    "title": ["", Validators.required],
    "description":["", Validators.required],
    "data": ["", Validators.required],
    "type": ["", Validators.required],
    "collection_id": ["", Validators.required],
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private nodeservice: NodeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    console.log(this.id);
    this.getNodes();
  }

  getNodes(){
    console.log(this.id);
    this.nodeservice.getNodesCollID(this.id).subscribe( async (res:any) => {
      console.log(res);
      this.nodeNumber = res.length;
    });
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

    /*this.nodeService.createCollection(this.nodeForm.value).subscribe( async (res:any) => {
      console.log(res);
      if(res['id']){
        console.log("ok");
        this.collectionForm.reset();
        this.submitModal();
        window.location.href = ('/');
      }else{
        console.log("error");
      }
    });*/

    if(this.nodeNumber == 0){
      //Assign first_node to the created one
    }
    
  }

}
