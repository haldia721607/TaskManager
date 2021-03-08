import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  @Input("error") error: string;
  @HostBinding("title") title: string;
  divElement: any;
  spanElement: any;
  spanText: any;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

  ngOnInit() {
    //this is example or Renderer2
    //Renderer2 dynamic html tag create karta hai / ishe example mai hum htmpl dynamic create kar rahe hai or style,class,errer text add kar rahe hai
    /* div */
    this.divElement = this.renderer2.createElement("div"); //<div></div> | Div tag create kiya 

    this.renderer2.setAttribute(this.divElement, "role", "alert"); //<div role="alert"> </div> | add kiya role attribute 

    this.renderer2.setAttribute(this.divElement, "class", "alert alert-danger fade show");
    //<div role="alert" class="alert alert-danger fade show"> </div> | ishme humne add kiya class ko

    this.renderer2.setStyle(this.divElement, "transition", "transform 0.5s");
    //<div role="alert" class="alert alert-danger fade show" style="transition: transform 0.5s"> </div> | ishe example mai humne style attribute tag add kiya

    /* span */
    this.spanElement = this.renderer2.createElement("span"); // ishme span tag create kiya
    this.renderer2.setAttribute(this.spanElement, "class", "message");// span tag mai class add kiya
    //<span class="message"></span>

    /* spanText */
    this.spanText = this.renderer2.createText(this.error); // spn tag mai dynamic error message ko add kiya  
    this.renderer2.appendChild(this.spanElement, this.spanText);//ab error message ko span tag mai add kiya
    //<span class="message">${this.error}</span>

    this.renderer2.appendChild(this.divElement, this.spanElement);//span tag ko div element add kiya
    //<div role="alert" class="alert alert-danger fade show" style="transition: transform 0.5s"> <span class="message">${this.error}</span> </div>

    this.elementRef.nativeElement.appendChild(this.divElement);// finaly div tag dom mai render kiya

    //Example of direct add div tag 
    //   this.elementRef.nativeElement.innerHTML = `
    //   <div class="alert alert-danger " role="alert" style="transition: transform 0.5s">
    //     <span class="text-danger">${this.error}</span>
    //   </div>
    // `;

    this.title = "Please try again...!";
  }

  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event) {
    // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.1)";
    this.renderer2.setStyle(this.divElement,"transform","scale(1.1)");
  }
  @HostListener("mouseleave", ["$event"])
  onMouseLeave() {
    // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
    this.renderer2.setStyle(this.divElement,"transform","scale(1)");

  }
}
