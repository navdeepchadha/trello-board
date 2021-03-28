import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrelloBoardComponent } from './trello-board/trello-board.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCardComponent } from './trello-board/add-card/add-card.component';
import { AddListComponent } from './trello-board/add-list/add-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrelloBoardComponent,
    AddCardComponent,
    AddListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
