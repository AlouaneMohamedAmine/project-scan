const AbstractManager = require("./AbstractManager");

// Classe ThemeManager qui hérite de AbstractManager
class ThemeManager extends AbstractManager {
  // Constructeur qui définit la table sur laquelle ThemeManager va opérer
  constructor() {
    super({ table: "Themes" });
  }

  // Méthode pour trouver un thème par son ID
  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  // Méthode pour récupérer tous les thèmes
  findAll() {
    return this.connection.query(
      `SELECT * FROM ${this.table}`
    );
  }

  // Méthode pour insérer un nouveau thème dans la base de données
  insert(theme) {
    return this.connection.query(
      `INSERT INTO ${this.table} (theme_name) VALUES (?)`,
      [theme.theme_name]
    );
  }

  // Méthode pour mettre à jour le nom d'un thème
  update(theme) {
    return this.connection.query(`UPDATE ${this.table} SET theme_name = ? WHERE id = ?`, [
      theme.theme_name,
      theme.id,
    ]);
  }
}

module.exports = ThemeManager;
