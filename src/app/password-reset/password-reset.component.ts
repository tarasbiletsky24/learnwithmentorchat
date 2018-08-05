import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(public activateRoute: ActivatedRoute) { }

  token: string;

  ngOnInit() {
    this.activateRoute.params.subscribe(params=>this.token=params['token']);
  }

}
