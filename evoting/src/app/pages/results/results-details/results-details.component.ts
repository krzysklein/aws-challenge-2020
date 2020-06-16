import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { ApiService } from 'src/app/services/api.service';
import { VotingResultModel } from 'src/app/models/voting-result-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-details',
  templateUrl: './results-details.component.html',
  styleUrls: ['./results-details.component.scss']
})
export class ResultsDetailsComponent implements OnInit {
  id: string;
  votingResult: VotingResultModel[];
  summaryData: any[];
  summaryChartData: Chart.ChartDataSets[];
  summaryChartLabels: string[];
  summaryTableData: any[];

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
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.apiService.getVotingResults(this.id).subscribe(result => {
      this.votingResult = result;

      const summaryDataObj = result.reduce((aggr, curr, index, array) => {
        if (!aggr[curr.electionItemId]) {
          aggr[curr.electionItemId] = 0;
        }
        aggr[curr.electionItemId] += curr.count;
        return aggr;
      }, []);
      this.summaryData = Object.entries(summaryDataObj).sort((a, b) => b[1] - a[1]);

      this.summaryChartData = [
        {
          label: 'Summary',
          data: this.summaryData.map(t => t[1]),
        }
      ];
      this.summaryChartLabels = this.summaryData.map(t => t[0]);

      this.summaryTableData = this.summaryData.map((t, i) =>
        ({
          rank: i + 1,
          name: t[0],
          count: t[1]
        }));
    });
  }

  downloadFile() {
    const data = this.votingResult;

    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], {type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}
}
