import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  public collectionsList = [];

  constructor( private collectionsService: CollectionService) { }

  ngOnInit(): void {
    this.getCollections();
  }

  showModalCreateCollection(){
    let modal = document.getElementById('NewCollectionModal');
    modal!.style.display = "block";
  }

  closeModal(){
    let modal = document.getElementById('NewCollectionModal');
    modal!.style.display = "none";
  }

  getCollections(){

    this.collectionsService.getCollections().subscribe( async (res:any) => {
      this.collectionsList = res;
    });

  }

}
