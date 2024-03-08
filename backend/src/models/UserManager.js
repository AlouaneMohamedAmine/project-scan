const AbstractManager = require("./AbstractManager");

// Classe UserManager qui hérite de AbstractManager
class UserManager extends AbstractManager {
  // Constructeur qui définit la table sur laquelle UserManager va opérer
  constructor() {
    super({ table: "users" });
  }

  // Méthode pour trouver un utilisateur par son ID
  // Ne renvoie que l'id, le nom d'utilisateur et l'email pour des raisons de sécurité
  find(id) {
    return this.connection.query(
      `SELECT id, username, email FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  // Méthode pour trouver un utilisateur par son email
  // Renvoie toutes les informations de l'utilisateur, y compris le mot de passe haché
  findByEmailWithPassword(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  // Méthode pour récupérer tous les utilisateurs
  // Ne renvoie que l'id, le nom d'utilisateur, l'email et le statut d'administrateur pour des raisons de sécurité
  findAll() {
    return this.connection.query(
      `SELECT id, username, email, is_admin FROM ${this.table}`
    );
  }

  // Méthode pour insérer un nouvel utilisateur dans la base de données
  insert(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (username, email, hashedPassword, is_admin) VALUES (?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.hashedPassword,
        user.is_admin,
      ]
    );
  }

  // Méthode pour mettre à jour les informations d'un utilisateur
  update(user) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      user,
      user.id,
    ]);
  }

  // Méthode pour mettre à jour l'avatar d'un utilisateur
  updateAvatar(id, avatar) {
    return this.connection.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatar, id]
    );
  }
}

module.exports = UserManager;
