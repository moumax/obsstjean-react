const models = require("../models");
const { hashPassword } = require("../helpers/argonHelper");

const browse = (req, res) => {
  models.user
    .findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then((user) => {
      if (user.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const newUser = req.body;
  const authorized = true;

  if (authorized) {
    const validationErrors = models.user.validate(newUser);
    if (validationErrors) {
      console.error(validationErrors);
      return res.status(422).json({ validationErrors });
    }

    hashPassword(newUser.password).then((hash) => {
      delete newUser.password;

      models.user
        .insert({ ...newUser, password_hash: hash })
        .then(([result]) => {
          res.status(201).send({ ...newUser, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    });
  } else res.sendStatus(403);
  return true;
};

const edit = async (req, res) => {
  const newUser = req.body;
  const authorized = true;

  if (authorized) {
    if (newUser.password) {
      newUser.password_hash = await hashPassword(newUser.password);
      delete newUser.password;
    }
    const validationErrors = models.user.validate(newUser, false);
    if (validationErrors) res.status(422).json({ validationErrors });
    else {
      models.user
        .update(newUser, req.params.id)
        .then(([result]) => {
          if (result.affectedRows === 0) throw new Error("No change affected");
          delete newUser.password_hash;
          res.status(201).send({ ...newUser });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  } else res.sendStatus(403);
};

const destroy = (req, res) => {
  const authorized = true;

  if (authorized) {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else res.sendStatus(403);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
