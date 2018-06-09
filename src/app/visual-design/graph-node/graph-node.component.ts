import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit {
  @Input() x: number;
  @Input() y: number;

  constructor() {
  }

  ngOnInit() {
  }

}
