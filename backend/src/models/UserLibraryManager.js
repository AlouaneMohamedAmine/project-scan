// Manager
const AbstractManager = require("./AbstractManager");

class UserLibraryManager extends AbstractManager {
  constructor() {
    super({ table: "UserLibrary" });
  }

  findByUserId(user_id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );
  }

  findByManhwaId(manhwa_id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE manhwa_id = ?`,
      [manhwa_id]
    );
  }

  insert(userLibrary) {
    return this.connection.query(
      `INSERT INTO ${this.table} (user_id, manhwa_id) VALUES (?, ?)`,
      [
        userLibrary.user_id,
        userLibrary.manhwa_id,
      ]
    );
  }

  delete(user_id, manhwa_id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE user_id = ? AND manhwa_id = ?`, [
      user_id,
      manhwa_id,
    ]);
  }
}

module.exports = UserLibraryManager;
