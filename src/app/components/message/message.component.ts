import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Message } from '../../services/mock-data/mock-data.service';
import { MessagesService } from '../../services/messages/messages.service';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message
  @Input('currentUser') currentUserNickName: string
  @ViewChild('offerModal') offerModal: any
  subscriptions: Subscription[] = []

  get isOwner(): boolean { // check for message header status
    return this.currentUserNickName === this.message.from.nickname
  }

  get isOfferToCurrentUser(): boolean { // check for clickable offer
    return this.message.body['toWhom'] && this.currentUserNickName === this.message.body['toWhom'].slice(1)  
  }

  constructor(private modalService: NgbModal, private messagesService: MessagesService) { }

  ngOnInit() { }

  showOfferModal() {
    if(!this.isOfferToCurrentUser) {
      return
    }
    
    this.modalService.open(this.offerModal).result
        .then(_ => {
          this.messagesService.privateChat.next(this.message)
        })
        .catch(_ => console.log(_))
  }

}
