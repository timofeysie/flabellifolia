import { Component, ElementRef, Renderer2, ViewChild, RendererStyleFlags2 } from '@angular/core';
import { NavController, NavParams, Content, App } from 'ionic-angular';
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
    lastX: number;
    lastY: number;
    cursorX;
    cursorY;
    parentOffset;
    transitionOpacity: boolean = false;

  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
        private renderer: Renderer2,
        private app: App) { }
        
    
    handleStart(event){
        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    handleMove(ev){
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;
        // if we were using a canvas to draw a line
        // this would be one way to do it:
        // ctx.beginPath();
        // ctx.lineJoin = "round";
        // ctx.moveTo(this.lastX, this.lastY);
        // ctx.lineTo(currentX, currentY);
        // ctx.closePath();
        // ctx.strokeStyle = this.currentColour;
        // ctx.lineWidth = this.brushSize;
        // ctx.stroke();       
        this.lastX = currentX;
        this.lastY = currentY;
    }

	handleOnTouchMove(event) {
		this.cursorX = event.clientX;
		this.cursorY = event.clientY;
		let bg = `radial-gradient(
            circle at ${this.cursorX}px ${this.cursorY}px, 
				transparent 0, rgba(0,0,0,0.3) 2vw, 
				rgba(0,0,0,0.5) 3vw, 
				rgba(0,0,0,0.7) 4vw, 
				rgba(0,0,0,0.85) 7vw, 
                rgba(0,0,0,0.95) 15vw )`; 
        if (this.renderer && this.flashlight) {
    		this.renderer.setStyle(this.flashlight.nativeElement, 'background', bg, RendererStyleFlags2.Important);
        }
	}

	ngAfterViewInit() {
        this.app._setDisableScroll(true);
		// start the fade to black
		setTimeout(() => {
            this.transitionOpacity = true;
            setTimeout(() => {
                this.starting = true;
            }, 2000);
		},300);
	}

}
