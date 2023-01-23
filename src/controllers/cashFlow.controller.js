import db from "../db/db.js";
import dayjs from "dayjs";
import { sanitizeCashFlowRegistry } from "../sanitizers/cashFlow.sanatizer.js";
import { ObjectId } from "mongodb";
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
export const deleteCashFlow = async (req, res) => {
  const { registryId } = req.params;
  try {
    await db.collection("cashflow").deleteOne({ _id: ObjectId(registryId) });
    res.status(202).send({ message: "Deletado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const getCashFlowById = async (req, res) => {
  const { registryId } = req.params;
  try {
    const cashFlow = await db
      .collection("cashflow")
      .findOne({ _id: ObjectId(registryId) });
    res.status(200).send({ ...cashFlow });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const updateCashFlowRegistry = async (req, res) => {
  const { registryId } = req.params;
  const { amount, description } = req.body;
  try {
    await db
      .collection("cashflow")
      .updateOne(
        { _id: ObjectId(registryId) },
        { $set: { amount, description } }
      );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
