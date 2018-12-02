import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Power1, Bounce } from 'gsap/all';

/**
 * We must declare a generic variable called TweenMax or the project won’t compile.
 */
declare var TweenMax: any;

@Component({
  selector: 'page-owl',
  templateUrl: 'owl.html',
  animations: [
    trigger('stateOpacity', [
      state('false', style({ opacity: '0' })),
      state('true',  style({ opacity: '1' })),
      transition('0 => 1', animate('1200ms ease'))
    ])
  ]
})
export class OwlPage {
  @ViewChild('flashlight') flashlight: ElementRef;
  @HostListener('window:touchmove', ['$event']) onTouchMove(event) { this.handleOnTouchMove(event); }
  cursorX;
  cursorY;
  parentOffset;
  transitionOpacity: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

handleMouseMove(e) {
    TweenMax.set(this.flashlight, {
      background:`radial-gradient(circle at ${this.cursorX}px ${this.cursorX}px, transparent 0, rgba(0,0,0,0.3) 2vw, rgba(0,0,0,0.5) 3vw, rgba(0,0,0,0.7) 4vw, rgba(0,0,0,0.85) 7vw, rgba(0,0,0,0.95) 15vw )`}); 
}

handleOnTouchMove(event) {
  // this.m_rotation_y = -1 - (event.targetTouches[0].clientX / this.WIDTH)*2;
  // this.m_rotation_x = 1 + (event.targetTouches[0].clientY / this.HEIGHT)*2;
  // this.animate();
  // e.changedTouches[0].clientY : e.clientY) - parentOffset.top;
  this.parentOffset = this.flashlight.nativeElement.parent.offset();
  this.cursorX = event.changedTouches[0].clientX - this.parentOffset.left;
  this.cursorY = event.changedTouches[0].clientY - this.parentOffset.top;
}

ngAfterViewInit() {
  console.log('this.flashlight.nativeElement',this.flashlight.nativeElement);
  //this.parentOffset = this.flashlight.nativeElement.parent.offset();
  TweenMax.to(this.flashlight, 3, {opacity: 1});
  setTimeout(() => {
    this.transitionOpacity = true;
  },300);
}

}
