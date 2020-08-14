export class Plant {


  plantid: Number;
  plantName: String;
  danger?: Boolean;
  lastWatered: Date;
}


export class Message {
  clientuniqueid: string;
  type: string;
  message: string;
  date: Date;
}  
