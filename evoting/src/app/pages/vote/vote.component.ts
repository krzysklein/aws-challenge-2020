import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  authToken: string;
  votingToken: string;

  constructor() {}

  ngOnInit(): void {}

  getAuthenticationToken() {
      // tslint:disable-next-line:max-line-length
      this.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJLb3dhbHNraSIsImlkIjoiODgwMzIyMDAxMjMiLCJsb2NhdGlvbiI6IldhcnNhdyJ9.7PYV9g-Ao6WNkNes5KW3XSpyr_e7wGp3BkOhVeObgQ8';
  }

  getVotingToken() {
      // tslint:disable-next-line:max-line-length
      this.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiIxMjM0LTU2NzgiLCJ1c2VyTG9jYXRpb24iOiJXYXJzYXcifQ.Cq1GZrEPNgiErCwmIivxFESlscTZMwvzt7d_Edv13mI';
  }
}
