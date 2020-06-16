import { Component, OnInit } from '@angular/core';
import { IdentityModel } from 'src/app/models/identity-model';
import { ApiService } from 'src/app/services/api.service';
import { ElectionModel } from 'src/app/models/election-model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ElectionItemModel } from 'src/app/models/election-item-model';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  voteSubmitting: boolean;
  voteCompleted: boolean;

  constructor(private apiSerivce: ApiService) {}

  ngOnInit(): void {}

  onStepperSelectionChange(event: StepperSelectionEvent) {
    switch (event.selectedIndex) {
      case 0:
      case 1:
        this.identity = null;
        break;
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
      case 4:
        this.voteSubmitting = false;
        this.voteCompleted = false;
        break;
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

  submitVote() {
    // TODO: Call API to send vote
    this.voteSubmitting = true;
    from([0]).pipe(delay(2000)).subscribe(_ => {
      this.voteSubmitting = false;
      this.voteCompleted = true;
    });
  }
}
