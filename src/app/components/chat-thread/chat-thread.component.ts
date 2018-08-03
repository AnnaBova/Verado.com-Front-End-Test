import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { Message, User } from '../../services/mock-data/mock-data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { messageAdded } from '../../animations/animations'

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
  animations: [messageAdded]
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: string
  @Input() state: string // private or public thread
  messages: Message[]
  currentUser: User
  subscriptions: Subscription[] = []
  constructor(private messageService: MessagesService, private authService: AuthService) { }

  ngOnDestroy() {
    this.subscriptions.forEach( sub$ => sub$.unsubscribe() )
  }

  ngOnInit() {
    const incomingMessagesWatcherSub$ = this.getIncomingMessagesWatcher()
      .subscribe((message: Message) => {
        this.messages.push(message)
      })
    
    const currentUserSub$ = this.authService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user
      })
    
    this.subscriptions.push(incomingMessagesWatcherSub$, currentUserSub$)
    
    this.getThreadMessages()
  }

  /* get messages stream channel depending on component state */
  getIncomingMessagesWatcher() { 
    switch(this.state) {
      case 'private':
        return this.messageService.privateIncomingMessage
      case 'public':
        return this.messageService.incomingMessage
      default:
        return this.messageService.incomingMessage
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if thread has changed get messages by new thread
    this.getThreadMessages()
  }

  getThreadMessages() {
    const chatMessageSub$ = this.messageService.getChatMessages(this.thread, this.state)
      .subscribe((messages: Message[]) => this.messages = messages)
    this.subscriptions.push(chatMessageSub$)
  }

}
