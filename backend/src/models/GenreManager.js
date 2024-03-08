const AbstractManager = require("./AbstractManager");

// Classe GenreManager qui hérite de AbstractManager
class GenreManager extends AbstractManager {
  // Constructeur qui définit la table sur laquelle GenreManager va opérer
  constructor() {
    super({ table: "Genres" });
  }

  // Méthode pour trouver un genre par son ID
  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  // Méthode pour récupérer tous les genres
  findAll() {
    return this.connection.query(
      `SELECT * FROM ${this.table}`
    );
  }

  // Méthode pour insérer un nouveau genre dans la base de données
  insert(genre) {
    return this.connection.query(
      `INSERT INTO ${this.table} (genre_name) VALUES (?)`,
      [genre.genre_name]
    );
  }

  // Méthode pour mettre à jour le nom d'un genre
  update(genre) {
    return this.connection.query(`UPDATE ${this.table} SET genre_name = ? WHERE id = ?`, [
      genre.genre_name,
      genre.id,
    ]);
  }
}

module.exports = GenreManager;
