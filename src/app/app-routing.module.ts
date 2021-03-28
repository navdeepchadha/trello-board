import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrelloBoardComponent } from './trello-board/trello-board.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: TrelloBoardComponent
  },
  {
    path: "login",
    component: TrelloBoardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
