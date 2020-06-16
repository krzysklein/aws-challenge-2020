import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { ApiService } from 'src/app/services/api.service';
import { VotingResultModel } from 'src/app/models/voting-result-model';

@Component({
  selector: 'app-results-details',
  templateUrl: './results-details.component.html',
  styleUrls: ['./results-details.component.scss']
})
export class ResultsDetailsComponent implements OnInit {
  votingResult: VotingResultModel[];
  summaryChartData: Chart.ChartDataSets[];
  summaryChartLabels: string[];
  lineChartData: Chart.ChartDataSets[] = [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ];
  lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: any = {
    responsive: true
  };
   lineChartLegend = true;
  lineChartType = 'line';

  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    const electionId = ''; // TODO: Read from route params
    this.apiService.getVotingResults(electionId).subscribe(result => {
      this.votingResult = result;

      const summaryData = result.reduce((aggr, curr, index, array) => {
        if (!aggr[curr.electionItemId]) {
          aggr[curr.electionItemId] = 0;
        }
        aggr[curr.electionItemId] += curr.count;
        return aggr;
      }, []);

      this.summaryChartData = [
        {
          label: 'Summary',
          // fill: false,
          // lineTension: 0.1,
          // backgroundColor: 'rgba(75,192,192,0.4)',
          // borderColor: 'rgba(75,192,192,1)',
          // borderCapStyle: 'butt',
          // borderDash: [],
          // borderDashOffset: 0.0,
          // borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointRadius: 1,
          // pointHitRadius: 10,
          data: Object.values(summaryData),
        }
      ];
      this.summaryChartLabels = Object.keys(summaryData);
    });
  }

}
