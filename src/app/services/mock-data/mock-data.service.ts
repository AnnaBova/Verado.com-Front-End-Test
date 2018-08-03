import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';



export interface User {
  id?: number
  email?: string
  password?: string
  nickname?: string
  firstname?: string
  lastname?: string
  role?: string

}

export interface Offer {
  toWhom?: string
  title?: string
  description?: string
}

 

export interface Message {
  id?: number
  type?: string
  body?: string | Offer
  chatThread?: string
  from?: User
  to?: User
  searchString?: string
}


@Injectable({
  providedIn: 'root'
})

export class MockDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users: User[] = [
      {
        'email': 'test@gmail.com',
        'firstname': 'Spanch',
        'lastname': 'Bob',
        'nickname': 'SpanchBob',
      },
      {
        'email': 'test1@gmail.com',
        'firstname': 'Patrick',
        'lastname': '',
        'nickname': 'Patrick',
      },
      {
        'email': 'test2@gmail.com',
        'firstname': 'Squidward',
        'lastname': '',
        'nickname': 'Squidward',
      },
      {
        'email': 'test3@gmail.com',
        'firstname': 'Harry',
        'lastname': '',
        'nickname': 'Harry',
      }
    ]
    const messages: Message[] = []
    

    return { users, messages }
  }

  genId(data: any[], collection:string): number {
    let id: number
    while(typeof id !== 'number' || data.findIndex(item => item.id == id) >= 0) { // get unique id
      id = Math.floor(Math.random()*100)
    }
    return id
  }
}
