import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CollectionComponent } from './modules/collection/collection.component';
import { CollectionService } from './modules/collection/service/collection.service';
import { CollectionsComponent } from './modules/collections/collections.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    CollectionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'edit', component: CollectionComponent},
      {path: '', component: CollectionsComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
