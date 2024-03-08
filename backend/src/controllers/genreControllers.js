const models = require("../models");

// Méthode pour récupérer tous les genres
const browse = (req, res) => {
  models.genres
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour récupérer un genre spécifique par son ID
const read = (req, res) => {
  const { id } = req.params;

  models.genres
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

// Méthode pour ajouter un nouveau genre
const add = (req, res) => {
  const genre = req.body;
  models.genres
    .insert(genre)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour modifier le nom d'un genre existant
const edit = (req, res) => {
  const genre = req.body;
  genre.id = parseInt(req.params.id, 10);

  models.genres
    .update(genre)
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
