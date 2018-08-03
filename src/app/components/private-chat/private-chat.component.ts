import { Component, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessagesService } from '../../services/messages/messages.service';
import { AuthService } from '../../services/auth/auth.service';
import { User, Message } from '../../services/mock-data/mock-data.service';
import { privateChatAppear } from '../../animations/animations'


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css'],
  animations: [privateChatAppear]
})
export class PrivateChatComponent implements OnInit {
  threadList: any[] = []
  threadSelected: any = {}
  currentUser: User
  @HostBinding('@privateChatAppear') 
  get componentLoaded() {
    return true
  }
  message: Message = {}
  privateChat: number
  subscriptions: Subscription[] = []
  constructor(private messagesService: MessagesService, 
              private authService: AuthService) { }

  ngOnInit() {
    const currentUserSub$ = this.authService.currentUser
      .subscribe((user: User) => this.currentUser = user)


    const privateChatSub$ = this.messagesService.privateChat
      .subscribe((message: Message) => {
          const threadListItem: any = {}
          /* searchString need to get sample from inmemory db */
          threadListItem.searchString = `${message.from.nickname}/${message.body['toWhom'].slice(1)}` 

          
          // get thread title depending on who is current user
          if(message.from.nickname === this.currentUser.nickname) {
            threadListItem.value = message.body['toWhom'].slice(1)
          } else {
            threadListItem.value = message.from.nickname
          }

          // add thread to thread list
          if(this.threadList.findIndex(thread => thread.searchString === threadListItem.searchString) < 0) {
            this.threadList.push(threadListItem)
          }
          
          this.threadSelected = threadListItem
      })
    
    this.subscriptions.push(privateChatSub$, currentUserSub$)
  }
  
  changeThread(thread: any) {
    this.threadSelected = thread
  }

  sendMessage() {
    this.message.from = this.currentUser
    this.message.searchString = this.threadSelected.searchString
    this.message.type = 'text_message'
    const messageToChart$ = this.messagesService.addMessageToChatThread(this.message)
      .subscribe(_ => {
        /* send message to chat thread by threadSelected and reset all fields */
        this.messagesService.privateIncomingMessage.next(this.message)
        this.message = {}
      })

    this.subscriptions.push(messageToChart$)
  }
}
