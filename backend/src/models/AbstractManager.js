// Classe de base pour les gestionnaires de modèles
class AbstractManager {
    // Constructeur prenant le nom de la table en paramètre
    constructor({ table }) {
      this.table = table;
    }
  
    // Méthode pour trouver un enregistrement par son ID
    find(id) {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    }
  
    // Méthode pour récupérer tous les enregistrements de la table
    findAll() {
      return this.connection.query(`SELECT * FROM ${this.table}`);
    }
  
    // Méthode pour supprimer un enregistrement par son ID
    delete(id) {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
  
    // Méthode pour définir la connexion à la base de données
    setConnection(connection) {
      this.connection = connection;
    }
  }
  
  module.exports = AbstractManager;
  