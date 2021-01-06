export interface WriteMessage {
  text: string;
  seen: boolean;
  date: Date;
  sender: string;
  receiver: string;
}
