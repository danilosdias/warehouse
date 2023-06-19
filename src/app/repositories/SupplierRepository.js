const db = require('../../database');

class SupplierRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM supplier ORDER BY name ${direction}`);

    return rows;
  };

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM supplier WHERE id = $1`, [id]);

    return row;
  };

  async findByMail(mail) {
    const [row] = await db.query(`SELECT * FROM supplier WHERE mail = $1`, [mail]);

    return row;
  };

  async findByName(name) {
    const [row] = await db.query(`SELECT * FROM supplier WHERE name = $1`, [name]);

    return row;
  }

  async findByCnpj(cnpj) {
    const [row] = await db.query(`SELECT * FROM supplier WHERE cnpj = $1`, [cnpj]);

    return row;
  };

  async create({name, cnpj = '', phone = '', mail = ''}) {
    const [row] = await db.query(`
      INSERT INTO supplier(name, cnpj, phone, mail)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, cnpj, phone, mail]);

    return row;
  };

  async update(id, {name, cnpj, phone, mail}) {
    const [row] = await db.query(`
      UPDATE supplier SET
      name = $1,
      cnpj = $2,
      phone = $3,
      mail = $4,
      updated_at = now()
      WHERE id = $5
      RETURNING *
    `, [name, cnpj, phone, mail, id]);

    return row;
  };

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM supplier WHERE id = $1
    `, [id]);

    return deleteOp;
  };
}

module.exports = new SupplierRepository();
