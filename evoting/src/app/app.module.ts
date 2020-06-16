import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgChartjsModule } from 'ng-chartjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { IndexComponent } from './pages/index/index.component';
import { VoteComponent } from './pages/vote/vote.component';
import { ResultsComponent } from './pages/results/results.component';
import { ResultsDetailsComponent } from './pages/results/results-details/results-details.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    VoteComponent,
    ResultsComponent,
    ResultsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    NgChartjsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
