import Mongorito from 'mongorito'
import Dotenv from 'dotenv'
Dotenv.config();

let mongourl = null;

if (process.env.MONGO_PORT_27017_TCP_ADDR && process.env.MONGO_PORT_27017_TCP_PORT) {
  mongourl = `${process.env.MONGO_PORT_27017_TCP_ADDR}:${process.env.MONGO_PORT_27017_TCP_PORT}${process.env.MONGO_URL}`;
}
else {
  mongourl = process.env.MONGO_URL;
}

let db = new Mongorito(mongourl);


export default db
