import db from "../db/db.js";
import dayjs from "dayjs";
import { sanitizeCashFlowRegistry } from "../sanitizers/cashFlow.sanatizer.js";
export const registerClashFlow = async (req, res) => {
  const { userId } = res.locals;
  const registry = {
    ...sanitizeCashFlowRegistry(req.body),
    userId,
    date: dayjs().format("DD/MM"),
  };
  try {
    await db.collection("cashflow").insertOne(registry);
    res.status(201).send({ message: "Entrada registrada com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const getCashFlow = async (req, res) => {
  const { userId } = res.locals;
  try {
    const { name } = await db.collection("users").findOne({ _id: userId });
    const cashFlow = await db.collection("cashflow").find({ userId }).toArray();
    res.status(200).send({ cashFlow, name });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
