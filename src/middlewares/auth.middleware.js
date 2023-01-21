import db from "../db/db.js";
import bcrypt from "bcrypt";
export const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token)
    return res.status(422).send({ message: "Insira um token válido!" });

  try {
    const checkSession = await db.collection("sessions").findOne({ token });
    if (!checkSession)
      return res.status(401).send({ message: "Token não encontrado!" });

    res.locals.userId = checkSession.userId;
    next();
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const userValidation = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const checkUser = await db.collection("users").findOne({ email });

    if (!checkUser)
      return res.status(404).send({ message: "Usuário ou senha incorretos!" });

    const isRightPassword = bcrypt.compareSync(password, checkUser.password);
    if (!isRightPassword)
      return res.status(404).send({ message: "Usuário ou senha incorretos!" });

    res.locals.userId = checkUser._id;
    next();
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
export const userVerification = async (req, res, next) => {
  const { email } = req.body;
  try {
    const checkUser = await db.collection("users").findOne({ email });

    if (checkUser)
      return res.status(409).send({ message: "Email indisponível!" });

    next();
  } catch (error) {
    res.status(500).send({ message: "Erro no servidor!" });
  }
};
