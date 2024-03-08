const models = require("../models");

// Méthode pour récupérer tous les thèmes
const browse = (req, res) => {
  models.themes
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour récupérer un thème spécifique par son ID
const read = (req, res) => {
  const { id } = req.params;

  models.themes
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

// Méthode pour ajouter un nouveau thème
const add = (req, res) => {
  const theme = req.body;
  models.themes
    .insert(theme)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour modifier le nom d'un thème existant
const edit = (req, res) => {
  const theme = req.body;
  theme.id = parseInt(req.params.id, 10);

  models.themes
    .update(theme)
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
