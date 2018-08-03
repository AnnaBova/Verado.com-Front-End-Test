import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { Subscription } from 'rxjs';

// import 'rxjs/add/operator/first'

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  chatActive: boolean
  privateChatActive: boolean
  subscriptions: Subscription[] = []
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    const privateChatSub$ = this.messagesService.privateChat
      .subscribe(_ => {
        console.log(1)
        this.privateChatActive = true
      })

    this.subscriptions.push(privateChatSub$)
  }

  toggleChat() {
    this.chatActive = !this.chatActive
    this.privateChatActive = false
  }

  propagation(event: Event) {
    event.stopPropagation()
  }

}
