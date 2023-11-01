import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

server.use('/', routes())

const PORT = process.env.PORT || 3000;

server.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});