import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { VoteComponent } from './pages/vote/vote.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
