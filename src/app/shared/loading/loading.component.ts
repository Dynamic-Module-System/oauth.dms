import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  public state: boolean
  public stateSubscription: Subscription;

  constructor(private localService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.stateSubscription = this.localService.state$.subscribe(
      (newState) => {
        console.log(newState?.Load)
        this.state = newState?.Load
      }
    );
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) this.stateSubscription.unsubscribe();
  }

}
