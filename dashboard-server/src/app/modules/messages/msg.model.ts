import { model, Schema } from "mongoose";
import { Tmessage } from "./msg.interface";

const ProjectSchema = new Schema<Tmessage>(
  {
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true, 
  },
  }
);

const Message  = model<Tmessage>("Message", ProjectSchema);

export default Message;