import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Power1, Bounce } from 'gsap/all';

/**
 * We must declare a generic variable called TweenMax or the project won’t compile.
 */
// @ts-ignore
declare var TweenMax: any;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage  implements OnInit {
  @ViewChild('mushroom') box: ElementRef;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit(): void {
    this.doIt(null);
  }

  doIt(event:any): void {
    let xWise = 20;
    let yWise = 440;
    if (event !== null) {
      xWise = event.layerX;
      yWise = event.layerY;
    }
    TweenMax.fromTo(this.box.nativeElement, 2, {x: xWise}, {x: yWise, ease: Power1.easeOut});
    TweenMax.fromTo(this.box.nativeElement, 1, {x: xWise}, {y: yWise, ease: Bounce.easeOut});
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
