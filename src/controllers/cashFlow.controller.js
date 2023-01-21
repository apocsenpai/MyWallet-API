import db from "../db/db.js";
import dayjs from "dayjs";
export const cashEntry = async (req, res) => {
  const { userId } = res.locals;
  const entry = {
    ...req.body,
    userId,
    isEntry: true,
    date: dayjs().format("DD/MM"),
  };
  try {
    await db.collection("cashflow").insertOne(entry);
    res.status(201).send({ message: "Entrada registrada com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const cashOutflow = async (req, res) => {
  const { userId } = res.locals;
  const entry = {
    ...req.body,
    userId,
    isEntry: false,
    date: dayjs().format("DD/MM"),
  };
  try {
    await db.collection("cashflow").insertOne(entry);
    res.status(201).send({ message: "Entrada registrada com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
