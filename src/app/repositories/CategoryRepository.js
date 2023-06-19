const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`SELECT * FROM category ORDER BY name ${direction}`);

    return rows;
  };

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM category WHERE id = $1`, [id]);

    return row;
  };

  async findByName(name) {
    const [row] = await db.query(`SELECT * FROM category WHERE name = $1`, [name]);

    return row;
  }

  async create({name}) {
    const [row] = await db.query(`
      INSERT INTO category(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  };

  async update(id, {name}) {
    const [row] = await db.query(`
      UPDATE category SET
      name = $1,
      updated_at = now()
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  };

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM category WHERE id = $1
    `, [id]);

    return deleteOp;
  };
}

module.exports = new CategoryRepository();
