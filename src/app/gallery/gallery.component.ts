import { Component, OnInit } from '@angular/core';
import { Plans } from '../mock-plans';
import { Plan } from '../plan';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  plans = Plans;

  constructor() { }

  ngOnInit() {
  }

}
