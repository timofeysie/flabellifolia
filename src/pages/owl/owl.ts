import { Component, ElementRef, Renderer2, ViewChild, HostListener, RendererStyleFlags2 } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
    @ViewChild(Content) content: Content;
    starting: boolean = false;
    @ViewChild('flashlight') private flashlight: ElementRef;
    @HostListener('window:touchmove', ['$event']) 
    public onTouchMove(event) { 
        this.handleOnTouchMove(event); 
    }
    cursorX;
    cursorY;
    parentOffset;
    transitionOpacity: boolean = false;

  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private renderer: Renderer2) { 
                // this.renderer.listen(this.elementRef.nativeElement.parentNode, 
                //     'touchmove', (event) => {
                //     // do stuff with the event
                // });
        }

	handleMouseMove(e) {
	}

	handleOnTouchMove(event) {
        console.log('event',event);
		this.cursorX = event.clientX;
		this.cursorY = event.clientY;
		let bg = `radial-gradient: 
			(circle at ${this.cursorX}px ${this.cursorX}px, 
				transparent 0, rgba(0,0,0,0.3) 2vw, 
				rgba(0,0,0,0.5) 3vw, 
				rgba(0,0,0,0.7) 4vw, 
				rgba(0,0,0,0.85) 7vw, 
				rgba(0,0,0,0.95) 15vw )`; 
		//this.renderer.setStyle(this.flashlight.nativeElement, 'background', bg, RendererStyleFlags2.Important);
		//console.log('this.flashlight.nativeElement',this.flashlight.nativeElement);
	}

	ngAfterViewInit() {
		//console.log('this.flashlight.nativeElement',this.flashlight.nativeElement);
		// start the fade to black
		setTimeout(() => {
            this.transitionOpacity = true;
            setTimeout(() => {
                this.starting = true;
            }, 2000);
		},300);
	}

}
