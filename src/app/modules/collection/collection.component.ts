import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
              private collectionService: CollectionService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submitModal(){
    let modal = document.getElementById('NewCollectionModal');
    modal!.style.display = "none";
  }

  onSubmitCollection() {

    if (this.collectionForm.invalid) { return; }


    this.collectionService.createCollection(this.collectionForm.value).subscribe( async (res:any) => {
      if(res['id']){
        console.log("ok");
        this.collectionForm.reset();
        this.submitModal();
        window.location.href = ('/');
      }else{
        console.log("error");
      }
    });
    
  }

}
