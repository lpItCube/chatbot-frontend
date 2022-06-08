import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  public nodeId = -1;
  public cerdaId = document.getElementById("accionadorModalOpciones");
  public observer: any;

  public optionForm = this.fb.group({
    "name": ["", Validators.required],
    "description":["", Validators.required]
  });

  constructor(private fb: FormBuilder,
              private optionservice: OptionService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      this.showModalCreateOption(document.getElementById("accionadorModalOpciones")!.getAttribute('value'));
    });
    var config = { attributes: true, childList: true, characterData: true };
    this.cerdaId = document.getElementById("accionadorModalOpciones");
    this.observer.observe(this.cerdaId, config);
  }

  showModalCreateOption(nodeID: any){
    this.nodeId = nodeID;
    let modal = document.getElementById('NewOptionModal');
    modal!.style.display = "block";
  }

  closeModal(){
    let modal = document.getElementById('NewOptionModal');
    modal!.style.display = "none";
  }

  onSubmitOption() {
    console.log("uwu");

    if (this.optionForm.invalid) { return; }

    console.log(this.optionForm.value);
    this.optionForm.value['nodeId'] = this.nodeId;

    this.optionservice.createOption(this.optionForm.value).subscribe( async (res:any) => {
      console.log(res);
      if(res['id']){
        console.log("ok");
        this.optionForm.reset();
        this.closeModal();
        window.location.reload();
        //window.location.href = ('/');
      }else{
        console.log("error");
      }
    });
    
  }

  async getLinkOptions(options){
    let optionlink = [];
    /*for(let i=0;i<options.length;i++){
      await this.optionservice.getNextNode(options[i].id).subscribe( async (res:any) => {
        console.log(res);
        if(res != null){
          optionlink.push(res);
        }
      },
      (err: any) => console.log('HTTP Error'));
    }*/
    for(const option of options) {
      console.log(option);
      await new Promise<void> ((resolve, reject) => {
        this.optionservice.getNextNode(option.id).subscribe( async (res:any) => {
          console.log(res);
          if(res != null){
            optionlink.push({"optionId": option.id, "nodeId": res.id});
            resolve();
          }
        },
        (err: any) => resolve());
      });       
    }
    return optionlink;
  }

}
