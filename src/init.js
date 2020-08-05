import "@babel/polyfill";
import app from "./app";
import './db'
import dotenv from "dotenv"
dotenv.config();
import "./models/video"
import "./models/comment"
import "./models/user"

const PORT = process.env.PORT || 4000;

const handelListening = () => console.log(`✅  Listening on : http://localhost:${PORT}`);

app.listen(PORT,handelListening);