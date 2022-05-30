import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CollectionService } from './service/collection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public collectionForm = this.fb.group({
    "name": ["", Validators.required],
    "description":["", Validators.required]
  });

  constructor(private fb: FormBuilder,
              private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  submitModal(){
    let modal = document.getElementById('NewCollectionModal');
    modal!.style.display = "none";
  }

  onSubmitCollection() {
    console.log("uwu");

    if (this.collectionForm.invalid) { return; }

    console.log(this.collectionForm.value);

    this.collectionService.createCollection(this.collectionForm.value).subscribe( async (res:any) => {
      console.log(res);
      if(res.ok){
        console.log("ok");
        this.submitModal();
      }else{
        console.log("error");
      }
    });
    
  }

}
