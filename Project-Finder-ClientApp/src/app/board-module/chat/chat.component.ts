import { ReadMessage } from './../../models/read-models/read-message';
import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { WriteMessage } from './../../models/write-models/write-message';
import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

var stompClient = null;
var isOpened = false;
var lastConversation = [];
var lastUnseen = [];
var partner = null;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  isChatOpened = false;
  textToSend = '';
  receiver = '';
  users: ReadUser[] = [];
  _conversation: ReadMessage[] = [];
  _unseenMessages: ReadMessage[] = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private tokenStorage: TokenStorageService,
    private httpService: HttpService
  ) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.httpService.getAll('users').subscribe(
      (users: ReadUser[]) => {
        this.users = users.filter(
          (u) => u.username !== this.tokenStorage.getUser().username
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  get conversation() {
    return this._conversation;
  }

  set conversation(value) {
    this._conversation = value;
  }

  get unseenMessages() {
    return this._unseenMessages;
  }

  set unseenMessages(value) {
    this._unseenMessages = value;
  }

  openChat = () => {
    this.isChatOpened = true;
    isOpened = true;
    this.httpService
      .getAll(
        'messages/unseen/receiver/' + this.tokenStorage.getUser().username
      )
      .subscribe(
        (messages: ReadMessage[]) => {
          this.unseenMessages = messages;
          lastUnseen = this.unseenMessages;
        },
        (err) => {
          console.log(err);
        }
      );
  };

  closeChat = () => {
    this.isChatOpened = false;
    isOpened = false;
    this.receiver = '';
    partner = '';
    this._conversation = [];
    this.unseenMessages = [];
  };

  initializeWebSocketConnection() {
    const serverUrl = 'http://127.0.0.1:8080/socket';
    const ws = new SockJS(serverUrl);
    stompClient = Stomp.over(ws);
    var username = this.tokenStorage.getUser().username;

    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe(
          '/message/' + username,
          (message) => {
            if (message.body) {
              const postedMessage: ReadMessage = JSON.parse(message.body);
              const findMessage = lastConversation.find(
                (m) => m.id === postedMessage.id
              );

              if(postedMessage.receiver === username && postedMessage.sender !== partner ) {
                  lastUnseen.push(postedMessage);
                  lastUnseen = lastUnseen
                  return;
                }

              if (findMessage) {
                findMessage.seen = true;
                return;
              }

              if (postedMessage.receiver === username) {
                if (isOpened) {
                  postedMessage.seen = true;
                  stompClient.send(
                    '/app/update/message',
                    {},
                    JSON.stringify(postedMessage)
                  );
                } else {
                  lastUnseen.push(postedMessage);
                }
              }
              lastConversation.push(postedMessage);
            }
          },
          (err) => console.log(err)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendMessage() {
    const messageToSend: WriteMessage = {
      text: this.textToSend,
      seen: false,
      date: new Date(),
      sender: this.tokenStorage.getUser().username,
      receiver: this.receiver,
    };
    stompClient.send('/app/send/message', {}, JSON.stringify(messageToSend));
    this.textToSend = '';
  }

  getConversation() {
    partner = this.receiver;

    this.httpService
      .getAll(
        'messages/sender/' +
          this.tokenStorage.getUser().username +
          '/receiver/' +
          this.receiver
      )
      .subscribe(
        (messages: ReadMessage[]) => {
          this.conversation = messages;
          lastConversation = this.conversation;
          this.markMessagesAsSeen();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  isUserTheSender(name) {
    return this.tokenStorage.getUser().username === name;
  }

  openConversation(name) {
    this.receiver = name;
    this.getConversation();
  }

  markMessagesAsSeen() {
    this.unseenMessages.forEach((message) => {
      if (
        message.seen === false &&
        message.sender === this.receiver &&
        message.receiver === this.tokenStorage.getUser().username
      ) {
        this.httpService
          .patch('messages/' + message.id, {
            seen: true,
          })
          .subscribe(
            () => {
              message.seen = true;
              stompClient.send(
                '/app/update/message',
                {},
                JSON.stringify(message)
              );
              this.conversation.forEach((m) => (m.seen = true));
              this.unseenMessages = this.unseenMessages.filter(
                (m) => m.id !== message.id
              );
              lastUnseen = this.unseenMessages;
            },
            (err) => {
              console.log(err);
            }
          );
      }
    });
  }
}
