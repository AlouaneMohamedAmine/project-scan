const AbstractManager = require("./AbstractManager");

class LikesManager extends AbstractManager {
  constructor() {
    super({ table: "Likes" });
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

  insert(like) {
    return this.connection.query(
      `INSERT INTO ${this.table} (user_id, chapter_id, number_of_likes) VALUES (?, ?, ?)`,
      [
        like.user_id,
        like.chapter_id,
        like.number_of_likes,
      ]
    );
  }
}

module.exports = LikesManager;
