import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MockDataService, Message } from './services/mock-data/mock-data.service'
import { WidgetComponent } from './components/widget/widget.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component'
import { MessageComponent } from './components/message/message.component';
import { MessageMarkerDirective } from './directives/message-marker/message-marker.directive';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { NicknameValidatorDirective } from './directives/nickname-validator/nickname-validator.directive';
import { UsersComponent } from './components/users/users.component'

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    ChatComponent,
    ChatThreadComponent,
    MessageComponent,
    MessageMarkerDirective,
    PrivateChatComponent,
    NicknameValidatorDirective,
    UsersComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    NgbModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(MockDataService, {caseSensitiveSearch: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
