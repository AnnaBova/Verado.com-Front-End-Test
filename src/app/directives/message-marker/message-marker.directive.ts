import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[messageMarker]'
})
export class MessageMarkerDirective {
  @Input('messageMarker') currentUserNickname: string
  @Input() messageText: string
  constructor(public elementRef: ElementRef) { }

  ngOnChanges() {
    if(this.messageText[0] === '@') {
      const [nickname] = this.messageText.split(' ')
      if(nickname.slice(1) === this.currentUserNickname) {
        this.elementRef.nativeElement.classList.add('text-danger')
      } else {
        this.elementRef.nativeElement.classList.remove('text-danger')
      }
    }
  }

}
