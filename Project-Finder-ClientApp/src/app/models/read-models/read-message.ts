export interface ReadMessage {
  id: number;
  text: string;
  seen: boolean;
  date: Date;
  sender: string;
  receiver: string;
}
