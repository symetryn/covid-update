import { Component, OnInit, Input } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-dial",
  templateUrl: "./dial.component.html",
  styleUrls: ["./dial.component.scss"],

  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),

      transition(":enter", [style({ opacity: 0 }), animate(600)]),

      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class DialComponent implements OnInit {
  @Input() data: string;

  constructor() {}

  ngOnInit(): void {}
}
