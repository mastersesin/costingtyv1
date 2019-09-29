import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {

  powers = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'
  ];
  DesignType = [
    'Very simple',
    'Simple',
    'Complicated / Multi Pcs'
  ];


  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    alert('Entered Email id : ' + data.ty);
 }
}
