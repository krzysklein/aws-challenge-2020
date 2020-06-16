import { Component, OnInit } from '@angular/core';
import { IdentityModel } from 'src/app/models/identity-model';
import { ApiService } from 'src/app/services/api.service';
import { ElectionModel } from 'src/app/models/election-model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ElectionItemModel } from 'src/app/models/election-item-model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  identity: IdentityModel;
  identityLoading: boolean;
  elections: ElectionModel[];
  election: ElectionModel;
  voteItem: ElectionItemModel;

  constructor(private apiSerivce: ApiService) {}

  ngOnInit(): void {}

  onStepperSelectionChange(event: StepperSelectionEvent) {
    switch (event.selectedIndex) {
      case 2:
        this.election = null;
        this.elections = null;
        this.apiSerivce.getElections(this.identity).subscribe(result => {
          this.elections = result.filter(e => e.isActive);
        });
        break;
      case 3:
        this.voteItem = null;
        break;
      default:
        console.log(event);
    }
  }

  authenticate(identityProviderId) {
    this.identityLoading = true;
    this.apiSerivce.getIdentity(identityProviderId).subscribe(result => {
      this.identity = result;
      this.identityLoading = false;
    });
  }

  selectVote(item: ElectionItemModel) {
    this.voteItem = item;
  }
}
