import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ElectionModel } from 'src/app/models/election-model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  elections: ElectionModel[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getElections(null).subscribe(result => {
      this.elections = result; // result.filter(e => !e.isActive);
    });
  }
}
