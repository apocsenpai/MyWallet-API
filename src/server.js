import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
import cashFlowRouter from "./routers/cashFlow.router.js";

const server = express();
const PORT = 5000;
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(cashFlowRouter);
server.listen(PORT, () =>
  console.log(`Server is listening in the PORT: ${PORT}`)
);
