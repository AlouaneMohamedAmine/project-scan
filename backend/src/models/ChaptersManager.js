// Manager
const AbstractManager = require("./AbstractManager");

class ChaptersManager extends AbstractManager {
  constructor() {
    super({ table: "Chapters" });
  }

  find(id) {
    return this.connection.query(
      `SELECT id, chapter, manhwa_id, views FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findByManhwaId(manhwa_id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE manhwa_id = ?`,
      [manhwa_id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT id, chapter, manhwa_id, views FROM ${this.table}`
    );
  }

  insert(chapter) {
    return this.connection.query(
      `INSERT INTO ${this.table} (chapter, manhwa_id, views) VALUES (?, ?, ?)`,
      [
        chapter.chapter,
        chapter.manhwa_id,
        chapter.views,
      ]
    );
  }

  update(chapter) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      chapter,
      chapter.id,
    ]);
  }
}

module.exports = ChaptersManager;