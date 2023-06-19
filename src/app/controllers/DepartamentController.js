const DepartamentRepository = require('../repositories/DepartamentRepository');

class DepartamentController {
  async index(request, response) {
    const { orderBy } = request.query;
    const departament = await DepartamentRepository.findAll(orderBy);

    return response.json(departament);
  };

  async show(request, response) {
    const { id } = request.params;
    const departament = await DepartamentRepository.findById(id);

    if(!departament) {
      return response.status(404).json({ error: 'Departament not found' });
    }

    return response.json(departament);
  };

  async store(request, response) {
    const { name } = request.body;

    if(!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const departament = await DepartamentRepository.findByName(name);
    if(departament) {
      return response.status(400).json({ error: 'This departament is already in use' });
    }

    return response.json(departament);
  };

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const departamentExists = await DepartamentRepository.findById(id);
    if(!departamentExists) {
      return response.status(404).json({ error: 'Departament not found' });
    };

    if(!name) {
      return response.status(400).json({ error: 'Name is required' });
    };

    const departamentNameExists = await DepartamentRepository.findByName(name);
    if(departamentNameExists && departamentNameExists.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    };

    const departament = await DepartamentRepository.update(id, {name});

    return response.json(departament);
  };

  async delete(request, response) {
    const { id } = request.params;

    await DepartamentRepository.delete(id);

    return response.sendStatus(204);
  };
}

module.exports = new DepartamentController();
