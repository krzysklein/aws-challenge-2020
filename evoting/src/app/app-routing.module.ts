import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { VoteComponent } from './pages/vote/vote.component';
import { ResultsComponent } from './pages/results/results.component';
import { ResultsDetailsComponent } from './pages/results/results-details/results-details.component';


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
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'results/:id',
    component: ResultsDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
