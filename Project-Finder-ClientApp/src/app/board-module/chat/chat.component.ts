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
  serverUrl = 'http://127.0.0.1:8080/socket';
  ws = new SockJS(this.serverUrl);
  stompClient = Stomp.over(this.ws);

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
    if (this.users.length > 0) {
      this.receiver = this.users[0].username;
      this.isChatOpened = true;
      this.httpService
        .getAll(
          'messages/unseen/receiver/' + this.tokenStorage.getUser().username
        )
        .subscribe(
          (messages: ReadMessage[]) => {
            this.unseenMessages = messages;
          },
          (err) => {
            console.log(err);
          }
        );
      this.getConversation();
    }
  };

  closeChat = () => {
    this.isChatOpened = false;
    this.receiver = '';
    this._conversation = [];
    this.unseenMessages = [];
  };

  initializeWebSocketConnection() {
    let state = this;

    this.stompClient.connect(
      {},
      function (frame) {
        state.stompClient.subscribe(
          '/message/' + state.tokenStorage.getUser().username,
          (message) => {
            if (message.body) {
              const postedMessage: ReadMessage = JSON.parse(message.body);
              const findMessage = state.conversation.find(
                (m) => m.id === postedMessage.id
              );

              if (findMessage) {
                findMessage.seen = true;
                return;
              }

              if (
                postedMessage.receiver ===
                  state.tokenStorage.getUser().username &&
                postedMessage.sender !== state.receiver
              ) {
                state.unseenMessages.push(postedMessage);
                state.unseenMessages = state.unseenMessages;
                return;
              }

              if (
                postedMessage.receiver === state.tokenStorage.getUser().username
              ) {
                if (state.isChatOpened) {
                  postedMessage.seen = true;
                  state.stompClient.send(
                    '/app/update/message',
                    {},
                    JSON.stringify(postedMessage)
                  );
                } else {
                  state.unseenMessages.push(postedMessage);
                }
              }

              state.conversation.push(postedMessage);
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
    this.stompClient.send(
      '/app/send/message',
      {},
      JSON.stringify(messageToSend)
    );
    this.textToSend = '';
  }

  getConversation() {
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
              this.stompClient.send(
                '/app/update/message',
                {},
                JSON.stringify(message)
              );
              this.conversation.forEach((m) => (m.seen = true));
              this.unseenMessages = this.unseenMessages.filter(
                (m) => m.id !== message.id
              );
            },
            (err) => {
              console.log(err);
            }
          );
      }
    });
  }
}
