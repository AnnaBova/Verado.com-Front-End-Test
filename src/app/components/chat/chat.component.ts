import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Message, Offer, User } from '../../services/mock-data/mock-data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from '../../services/messages/messages.service';
import { chatAppear } from '../../animations/animations'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [chatAppear]
})
export class ChatComponent implements OnInit {
  @ViewChild('form') form: NgForm
  threadList: {text: string, value: string}[] = [
    {
      text: 'Main Thread',
      value: 'main_thread'
    },
    {
      text: 'Thread One',
      value: 'thread_one'
    },
    {
      text: 'Thread Two',
      value: 'thread_two'
    },
    {
      text: 'Thread Three',
      value: 'thread_three'
    },
  ]
  threadSelected: string = 'main_thread'
  message: Message = {
    type: 'text_message',
    body: ''
  }
  offer: Offer = {}
  user: User
  subscriptions: Subscription[] = []

  @HostBinding('@chatAppear') get componentLoaded() {
    return true
  }

  constructor(private authService: AuthService, private messageService: MessagesService) { }

  ngOnDestroy() {
    this.subscriptions.forEach( sub$ => sub$.unsubscribe())
  }

  ngOnInit() {
    const currentUserSub$ = this.authService.currentUser.subscribe((user: User) => {
      this.user = user
    })
    this.subscriptions.push(currentUserSub$)
  }

  changeThread(thread: string) {
    this.threadSelected = thread
  }

  changeMessageType(messageType: string) {
    this.message.type = messageType
  }

  sendMessage() {
    if(this.form.invalid) {
      Object.keys(this.form.controls).forEach(control => {
        this.form.controls[control].markAsDirty()
        this.form.controls[control].markAsTouched()
      })
      return
    }
    
    this.message.from = this.user
    this.message.chatThread = this.threadSelected
    if(this.message.type === 'offer_message') { // else message body === string from "text_message" type
      this.message.body = this.offer
    }
    
    const messageToChart$ = this.messageService.addMessageToChatThread(this.message)
      .subscribe(_ => {
        /* send message to chat thread by threadSelected and reset all fields */
        this.messageService.incomingMessage.next(this.message)
        
        this.message = {
          type: this.message.type
        }
        this.offer = {}
        this.form.resetForm()
      })
    this.subscriptions.push(messageToChart$)
  }
}
