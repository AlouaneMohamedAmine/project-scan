const models = require("../models");

// Méthode pour récupérer tous les utilisateurs
const browse = (req, res) => {
  models.users
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour récupérer un utilisateur spécifique par son ID
const read = (req, res) => {
  const { id } = req.params;

  models.users
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

// Méthode pour ajouter un nouvel utilisateur
const add = (req, res) => {
  const user = req.body;
  models.users
    .insert(user)
    .then(([result]) => {
      res.status(201).json({ status: "success" });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour modifier les informations d'un utilisateur existant
const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.users
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Méthode pour supprimer un utilisateur
const destroy = (req, res) => {
  const { id } = req.params;
  models.users
    .delete(id)
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
  destroy,
};
