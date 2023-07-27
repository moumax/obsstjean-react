const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "event" });
  }

  validate(data, forCreation = true) {
    this.presence = forCreation ? "required" : "optional";

    const joiObject = {
      title: Joi.string().max(150).presence(this.presence),
      description: Joi.string().max(500).presence(this.presence),
      date: Joi.date().presence(this.presence),
      site: Joi.string().max(100).presence(this.presence),
    };

    return Joi.object(joiObject).validate(data, { abortEarly: false }).error;
  }

  insert(event) {
    return this.database.query(
      `insert into event (title, description, date, site, userId) values (?, ?, ?, ?, ?)`,
      [event.title, event.description, event.date, event.site, event.userId]
    );
  }

  update(event, id) {
    return this.database.query(`update event set ? where id = ?`, [event, id]);
  }

  findAll() {
    return this.database.query(`select * from ${this.table}`);
  }

  findByEventId(event, id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      event,
      id,
    ]);
  }
}

module.exports = EventManager;
