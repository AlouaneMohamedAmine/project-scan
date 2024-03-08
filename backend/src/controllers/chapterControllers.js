// Controller
const models = require("../models");

const browse = (req, res) => {
  models.chapters
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
  const { id } = req.params;

  models.chapters
    .find(id)
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
  const chapter = req.body;
  models.chapters
    .insert(chapter)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const chapter = req.body;
  chapter.id = parseInt(req.params.id, 10);

  models.chapters
    .update(chapter)
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
  edit,
};