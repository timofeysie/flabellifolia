import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Power1, Bounce } from 'gsap/all';

/**
 * We must declare a generic variable called TweenMax or the project won’t compile.
 */
declare var TweenMax: any;

@Component({
  selector: 'hoo-hoo',
  templateUrl: 'hoo-hoo.html'
})
export class HooHooPage  implements OnInit {
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
    this.doIt();
  }

  doIt(): void {
    TweenMax.fromTo(this.box.nativeElement, 2, {x: 20}, {x: 440, ease: Power1.easeOut});
    TweenMax.fromTo(this.box.nativeElement, 2, {y: 20}, {y: 440, ease: Bounce.easeOut});
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HooHooPage, {
      item: item
    });
  }
}
