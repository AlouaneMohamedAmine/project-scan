const models = require("../models");

// Méthode pour récupérer tous les manhwas
const browse = (req, res) => {
  models.manhwa
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour récupérer un manhwa spécifique par son ID
const read = (req, res) => {
  const { id } = req.params;

  models.manhwa
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

// Méthode pour ajouter un nouveau manhwa
const add = (req, res) => {
  const manhwa = req.body;
  models.manhwa
    .insert(manhwa)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour modifier les informations d'un manhwa existant
const edit = (req, res) => {
  const manhwa = req.body;
  manhwa.id = parseInt(req.params.id, 10);

  models.manhwa
    .update(manhwa)
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
