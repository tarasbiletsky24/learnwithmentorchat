import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(public activateRoute: ActivatedRoute) { }

  token: string;
  
  ngOnInit() {
    this.activateRoute.params.subscribe(params=>this.token=params['token']);
  }

}
