class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  // change adminId to the id of the administrator to avoid errors when deleting an old user

  delete(id) {
    const adminId = 3;
    return (
      this.database.query(
        `UPDATE event SET userId = ${adminId} WHERE userId = ?`,
        [id]
      ),
      this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
    );
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
