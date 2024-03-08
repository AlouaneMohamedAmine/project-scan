const AbstractManager = require("./AbstractManager");

// Classe ManhwaManager qui hérite de AbstractManager
class ManhwaManager extends AbstractManager {
  // Constructeur qui définit la table sur laquelle ManhwaManager va opérer
  constructor() {
    super({ table: "Manhwa" });
  }

  // Méthode pour trouver un manhwa par son ID
  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  // Méthode pour récupérer tous les manhwas
  findAll() {
    return this.connection.query(
      `SELECT * FROM ${this.table}`
    );
  }

  // Méthode pour insérer un nouveau manhwa dans la base de données
  insert(manhwa) {
    return this.connection.query(
      `INSERT INTO ${this.table} (synopsis, author_name, cover_image, theme_id, genre_id) VALUES (?, ?, ?, ?, ?)`,
      [
        manhwa.synopsis,
        manhwa.author_name,
        manhwa.cover_image,
        manhwa.theme_id,
        manhwa.genre_id,
      ]
    );
  }

  // Méthode pour mettre à jour les informations d'un manhwa
  update(manhwa) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      manhwa,
      manhwa.id,
    ]);
  }
}

module.exports = ManhwaManager;
