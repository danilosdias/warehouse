const SupplierRepository = require('../repositories/SupplierRepository');

class SupplierController {
  async index(request, response) {
    const { orderBy } = request.query;
    const suppliers = await SupplierRepository.findAll(orderBy);

    return response.json(suppliers);
  };

  async show(request, response) {
    const { id } = request.params;
    const supplier = await SupplierRepository.findById(id);

    if(!supplier) {
      return response.status(404).json({ error: 'Supplier not found' });
    }

    return response.json(supplier);
  };

  async store(request, response) {
    const { name, cnpj, phone, mail } = request.body;

    if(!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const supplierExists = await SupplierRepository.findByName(name);

    if(supplierExists) {
      return response.status(400).json({ error: 'This name is already in use' });
    };

    const supplierMailExists = await SupplierRepository.findByMail(mail);

    if(supplierMailExists && supplierMailExists.mail !== "") {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const supplier = await SupplierRepository.create({
      name,
      mail,
      phone,
      cnpj,
    });

    return response.status(201).json(supplier);
  };

  async update(request, response) {
    const { id } = request.params;
    const { name, cnpj, phone, mail } = request.body;

    const supplierExists = await SupplierRepository.findById(id);
    if(!supplierExists) {
      return response.status(404).json({ error: 'Supplier not found' });
    }

    if(!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const supplierNameExists = await SupplierRepository.findByName(name);
    if(supplierNameExists && supplierNameExists.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const supplierMailExists = await SupplierRepository.findByMail(mail);
    if(supplierMailExists && supplierMailExists.id !== id && supplierMailExists.mail !== mail) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const supplierCnpjExists = await SupplierRepository.findByCnpj(cnpj);
    if(supplierCnpjExists && supplierCnpjExists.id !== id && supplierMailExists.cnpj !== cnpj) {
      return response.status(400).json({ error: 'This CNPJ is already in use' });
    }

    const supplier = await SupplierRepository.update(id, {
      name, cnpj, phone, mail,
    });

    return response.json(supplier);
  };

  async delete(request, response) {
    const { id } = request.params;

    await SupplierRepository.delete(id);

    return response.sendStatus(204);
  };
};

module.exports = new SupplierController();
