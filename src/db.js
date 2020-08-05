import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL_PRD,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Successfully connected to MongoDB")
const handleError = error => console.log(`❌  ERROR on DB Connection ${error}`)

db.once("open", handleOpen);
db.on("error", handleError);