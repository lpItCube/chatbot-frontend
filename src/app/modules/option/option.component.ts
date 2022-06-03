import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  public optionForm = this.fb.group({
    "name": ["", Validators.required],
    "description":["", Validators.required]
  });

  constructor(private fb: FormBuilder,
              private optionservice: OptionService) { }

  ngOnInit(): void {
  }

  showModalCreateOption(){
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
    this.optionForm.value['refOptIds'] = null;

    this.optionservice.createOption(this.optionForm.value).subscribe( async (res:any) => {
      console.log(res);
      if(res['id']){
        console.log("ok");
        this.optionForm.reset();
        //window.location.href = ('/');
      }else{
        console.log("error");
      }
    });
    
  }

}
