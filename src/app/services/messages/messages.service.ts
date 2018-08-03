import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Message } from '../mock-data/mock-data.service';


@Injectable({
  providedIn: 'root'
})


export class MessagesService {
  incomingMessage: Subject<Message> = new Subject()
  privateIncomingMessage: Subject<Message> = new Subject()
  privateChat: ReplaySubject<any> = new ReplaySubject(1)
  constructor(private http: HttpClient) { }

  getChatMessages(thread: any, state?: any): Observable<Message[]> {
    let options = {
      params: new HttpParams()
        .set('chatThread', thread)
    }
    if(state) {
      options.params = new HttpParams().set('searchString', thread.searchString)
    }
    
    return this.http.get<Message[]>('api/messages', options)
  }

  addMessageToChatThread(message: Message): Observable<Message> {
    const options = {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    }
    return this.http.post<Message>('api/messages', message, options)
  }

  all() {
    return this.http.get<Message[]>('api/messages')
  }

}
