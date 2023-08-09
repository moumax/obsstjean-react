const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      mail: Joi.string().max(45).presence(this.presence),
      password: Joi.string().max(500).presence(this.presence),
      role: Joi.string().max(15).presence(this.presence),
      name: Joi.string().max(100).presence(this.presence),
    };

    if (forCreation)
      joiObject.password = Joi.string().max(500).presence(this.presence);
    else
      joiObject.password_hash = Joi.string().max(500).presence(this.presence);

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(user) {
    return this.database.query(
      `insert into user (mail, password_hash, name, role) values (?, ?, ?, ?)`,
      [user.mail, user.password_hash, user.name, user.role]
    );
  }

  update(user, id) {
    return this.database.query(`update user set ? where id = ?`, [user, id]);
  }

  findAll() {
    return this.database.query(`select * from ${this.table}`);
  }

  findByUserEmail(mail) {
    return this.database
      .query(`select * from user where mail = ?`, [mail])
      .then((result) => result[0]);
  }

  findByUserId(user, id) {
    return this.database.query(`select * from user where id = ?`, [user, id]);
  }
}

module.exports = UserManager;
