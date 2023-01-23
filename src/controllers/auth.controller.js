import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { sanitizeSignUp } from "../sanitizers/auth.sanatizer.js";
export const signUp = async (req, res) => {
  const { name, email, password } = sanitizeSignUp(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword });
    res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch ({ error }) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const signIn = async (req, res) => {
  const token = uuidV4();
  const { userId } = res.locals;
  try {
    await db.collection("sessions").insertOne({ token, userId });
    res.status(200).send({ message: "Login feito com sucesso!", token });
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const logout = async (req, res) => {
  const { userId } = res.locals;
  try {
    await db.collection("sessions").deleteMany({ userId });
    res.sendStatus(202);
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
