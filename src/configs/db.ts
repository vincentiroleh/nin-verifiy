declare var process : {
    env: {
      NODE_ENV: string,
      MONGODB_URL: string
      PORT: number
    }
  }

import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const URL: string = process.env.MONGODB_URL;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection;
db.once('open', () => {
    console.log(`Database connected: ${URL}`);
});

db.on('error', (err: object) => {
    console.error(`connection error: ${err}`)
});

export default mongoose;