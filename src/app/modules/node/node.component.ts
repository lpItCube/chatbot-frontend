import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';
import { DragDropModule} from '@angular/cdk/drag-drop';


import LeaderLine from 'leader-line-new';
import { OptionComponent } from '../option/option.component';
import { OptionService } from 'src/app/services/option.service';
import { CollectionService } from '../../services/collection.service';

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

  public optionForLink = -1;
  public nodeForLink = -1;

  public allLines = [];

  public current_node_id = null;

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
              private optionComponent: OptionComponent,
              private optionService: OptionService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    this.getNodes();
  }

  ngAfterViewInit(): void{
    this.fixTextareaHieght();

  }

  loadData(){


  }

  optionModal(nodeID: any){
    document.getElementById("accionadorModalOpciones")!.setAttribute('value', nodeID);
  }

  getNodes(){

    this.nodeservice.getNodesCollID(this.id).subscribe( async (res:any) => {

      this.nodeNumber = res.length;
      this.nodesOfCollection = res;
      this.allOptions = [];
      for(let i=0;i<this.nodeNumber;i++){
        for(let j=0;j<res[i]['options'].length;j++){
          this.allOptions.push(res[i]['options'][j]);
        } 
      }

      this.linksOptions = await this.optionComponent.getLinkOptions(this.allOptions);
      await this.putArrows();
      this.addClickNodeConnection();
      const boxes = document.querySelectorAll('.cardEvent');
        boxes.forEach(box => {
          box.addEventListener('mousemove', () => {
            //line1.position();
            this.positionLines();
        });
      });

      const container = document.querySelectorAll('.canvasNodes');
        container.forEach(box => {
          box.addEventListener('scroll', () => {
            //line1.position();
            this.positionLines();
        });
      });
    });
  }

  putArrows(){
    this.allLines = [];
    for(let option in this.linksOptions){

      let optionId = 'optionId-'+this.linksOptions[option]['optionId'];
      let nodeId = 'nodeId-'+this.linksOptions[option]['nodeId'];

        if (document.querySelector("#"+optionId)) {

          const line1 = new LeaderLine(
            document.getElementById(optionId),
            document.getElementById(nodeId)
          );

          this.allLines.push({'line1': line1, 'nodeId': nodeId, 'optionId': optionId});

          let outOptionforChange = document.getElementById(optionId).getElementsByClassName('outCircleEmpty')[0];
          outOptionforChange.classList.remove('outCircleEmpty');
          outOptionforChange.classList.add('outCircleFull');
          
        }
    }
  }

  positionLines(){

    this.allLines.forEach(line => {
      line.line1.position();
    });
  }

  deleteLine(nodeId, optionId){
    this.allLines.forEach((line, index, arr) => {
      if(line.nodeId == nodeId && line.optionId == optionId){
        line.line1.remove();
        arr.splice(index, 1);
      }
    });
  }

  checkIfLineExists(nodeId, optionId){
    let existss = false;
    this.allLines.forEach(line => {

      if(line.nodeId == nodeId && optionId == line.optionId){
        existss = true;
      }
    });
    return existss;
  }

  checkIfLineExistsOnlyOptionID(optionId){

    let existss = false;

    this.allLines.forEach(line => {
      if(optionId == line.optionId){
        existss = true;
      }
    });
    return existss;
  }

  checkIfLineExistsOnlyNodeID(nodeId){

    let existss = false;

    this.allLines.forEach(line => {
      if(nodeId == line.nodeId){
        existss = true;
      }
    });
    return existss;
  }

  getConnectionNodeID(optionId){

    let nodeId = "";

    this.allLines.forEach(line => {

      if(optionId == line.optionId){
        nodeId = line.nodeId;
      }
    });
    return nodeId;
  }

  addClickNodeConnection(){
    const inEmptyNodes = document.querySelectorAll('.circleNode');
    inEmptyNodes.forEach(node => {
      node.addEventListener('click', () => {

        //revisar el borrado si tienes un optionforlink != -1
        if(this.optionForLink != -1 && !this.checkIfLineExists(node.id, 'optionId-'+this.optionForLink)){

          let optionId = 'optionId-'+this.optionForLink;
          let nodeId = node.id;
       
          

          const line1 = new LeaderLine(
            document.getElementById(optionId),
            document.getElementById(nodeId)
          );
          this.allLines.push({'line1': line1, 'nodeId': nodeId, 'optionId': optionId});

          document.getElementById(nodeId).classList.remove('inCircleEmpty');
          document.getElementById(nodeId).classList.add('inCircleFull');
          let optionElem = document.getElementById(optionId).getElementsByClassName('outCircleEmpty')[0];
          /*optionElem.classList.remove('outCircleEmpty');
          optionElem.classList.add('outCircleFull');*/

          //Llamada al backend
          let myArray = nodeId.split("-");
          this.optionService.createOptionLink(this.optionForLink, parseInt(myArray[1])).subscribe( async (res:any) => {

          });

          this.optionForLink = -1;
        }
      });
    });
  }

  addEventListenersForLinkOptionNode(id){
      let opt = document.getElementById("optionId-"+id);
      let optionElem = opt.getElementsByClassName('outCircleEmpty')[0];
      if(optionElem!=null && optionElem!=undefined){
        if(this.optionForLink != -1){

          let optionBeforeElem = document.getElementById("optionId-"+this.optionForLink).getElementsByClassName('outCircleFull')[0];

          optionBeforeElem.classList.remove('outCircleFull');
          optionBeforeElem.classList.add('outCircleEmpty');
          this.optionForLink = id;
          optionElem.classList.remove('outCircleEmpty');
          optionElem.classList.add('outCircleFull');
        }else{

          this.optionForLink = id;
          optionElem.classList.remove('outCircleEmpty');
          optionElem.classList.add('outCircleFull');
        }
      }else{
        let optElem = opt.getElementsByClassName('outCircleFull')[0];
        if(optElem!=null && optElem!=undefined){

          if(this.checkIfLineExistsOnlyOptionID("optionId-"+id)){
            //DELETE FUNCION BACKEND
            let nodeId = this.getConnectionNodeID("optionId-"+id);
            this.deleteLine(nodeId, "optionId-"+id);

            if(!this.checkIfLineExistsOnlyNodeID(nodeId)){
              let nodeElem = document.getElementById(nodeId);
              nodeElem.classList.remove('inCircleFull');
              nodeElem.classList.add('inCircleEmpty');
            }
            let myArray = nodeId.split("-");
            this.optionService.removeOptionLink(id, parseInt(myArray[1])).subscribe( async (res:any) => {

            });
          }else{
            this.optionForLink = -1;
          }

          optElem.classList.remove('outCircleFull');
          optElem.classList.add('outCircleEmpty');

        }
      }
  }

  fixTextareaHieght(){

    let textare = document.getElementById('testTextArea');
  }

  showModalCreateNode(){
    let modal = document.getElementById('NewNodeModal');
    modal!.style.display = "block";
  }

  showModalEditNode(node_id){

    this.loadData();
    let modal = document.getElementById('EditNodeModal');
    modal!.style.display = "block";
  }

  showModalDeleteNode(node_id){
    let modal = document.getElementById('DeleteNodeModal');
    this.current_node_id = node_id;
    modal!.style.display = "block";
  }

  closeModal(name){
    let modal = document.getElementById(name);
    modal!.style.display = "none";
  }

  onSubmitNode(name) {

    if (this.nodeForm.invalid) { return; }

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

      if(res['id']){

        this.nodeForm.reset();
        this.closeModal(name);
        window.location.reload();
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

  deleteNode(){

    this.nodeservice.deleteNode(this.current_node_id).subscribe( async (res:any) => {


      if(res == "ok"){
        this.nodeForm.reset();
        this.closeModal('DeleteNodeModal');
        window.location.reload();
      }
        

      


    }, (err) => {
      console.warn('Error respueta api:',err);
 
    });


  }

  goPreview(){
    window.location.href = ('/preview/'+this.id);
  }

}
