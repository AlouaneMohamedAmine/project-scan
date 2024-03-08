// Manager
const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "Comments" });
  }

  findByUserId(user_id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );
  }

  findByChapterId(chapter_id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE chapter_id = ?`,
      [chapter_id]
    );
  }

  insert(comment) {
    return this.connection.query(
      `INSERT INTO ${this.table} (comment, user_id, chapter_id) VALUES (?, ?, ?)`,
      [
        comment.comment,
        comment.user_id,
        comment.chapter_id,
      ]
    );
  }
}

module.exports = CommentsManager;