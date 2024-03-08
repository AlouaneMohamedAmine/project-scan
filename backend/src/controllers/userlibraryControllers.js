// Controller
const models = require("../models");

const browse = (req, res) => {
  models.userLibrary
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { user_id, manhwa_id } = req.params;

  models.userLibrary
    .find(user_id, manhwa_id)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.json({ status: "success" }).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: "failed" }).sendStatus(500);
    });
};

const add = (req, res) => {
  const userLibrary = req.body;
  models.userLibrary
    .insert(userLibrary)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { user_id, manhwa_id } = req.params;
  models.userLibrary
    .delete(user_id, manhwa_id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  add,
  destroy,
};