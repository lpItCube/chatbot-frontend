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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { OptionComponent } from './modules/option/option.component';
import { PreviewComponent } from './modules/preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    CollectionsComponent,
    NodeComponent,
    OptionComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    RouterModule.forRoot([
      {path: 'edit/:id', component: NodeComponent},
      {path: 'preview/:id', component: PreviewComponent},
      {path: '', component: CollectionsComponent, pathMatch: 'full'},
      {path: '**', redirectTo: ''}
    ]),
    BrowserAnimationsModule,
  ],
  providers: [OptionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
