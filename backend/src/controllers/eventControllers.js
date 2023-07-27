const models = require("../models");

const browse = (req, res) => {
  models.event
    .findAll()
    .then((events) => res.send(events))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.event
    .find(req.params.id)
    .then((event) => {
      if (event.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(event);
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const newEvent = req.body;
  models.event
    .insert({ ...newEvent })
    .then(([result]) => {
      res.status(201).send({ ...newEvent, id: result.insertId });
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const newEvent = req.body;

  models.event
    .update(newEvent, req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) throw new Error("no change affected");
      res.status(201).send({ ...newEvent });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.event
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
