const models = require("../models");
const { verifyPassword } = require("../helpers/argonHelper");
const { encodeJwt } = require("../helpers/jwtHelper");

const login = (req, res) => {
  const { mail, password } = req.body;

  models.user.findByUserEmail(mail).then((user) => {
    if (!user) {
      res.status(401).send("Invalid credentials");
    }
    if (password.length === 0) {
      res.status(401).send("Password field is empty");
    } else {
      try {
        verifyPassword(password, user[0].password_hash).then((verification) => {
          if (verification) {
            const userAnswer = user[0];
            delete userAnswer.password_hash;
            const token = encodeJwt(userAnswer);
            res.cookie("token", token, { httpOnly: false, secure: false });
            res.status(200).json({
              id: userAnswer.id,
              mail: userAnswer.mail,
              role: userAnswer.role,
              name: userAnswer.name,
            });
          } else {
            res.status(401).send("Invalid credentials");
          }
        });
      } catch (err) {
        res.status(401).send(err);
        console.error("Erreur catch");
      }
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};

module.exports = { login, logout };
