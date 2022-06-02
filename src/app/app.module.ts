import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CollectionComponent } from './modules/collection/collection.component';
import { CollectionService } from './services/collection.service';
import { CollectionsComponent } from './modules/collections/collections.component';
import { NodeComponent } from './modules/node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    CollectionsComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'edit/:id', component: NodeComponent},
      {path: '', component: CollectionsComponent, pathMatch: 'full'},
      {path: '**', redirectTo: ''}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
