import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-card',
   templateUrl: './card.component.html',
   styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
   constructor() {}

   ngOnInit(): void {}
   @Input() value: string;
   @Input() label: string;
   @Input() color: string = 'lightblue';
}
