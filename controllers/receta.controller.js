const db = require("../models");
const Receta = db.recetas;
const Op = db.Sequelize.Op;

// Create y guarda una receta
exports.create = (req, res) => {
  // valida la peticion
  if (!req.body.referencia) {
    res.status(400).send({
      message: "El contenido no puede estar vacio"
    });
    return;
  }

  // crea una receta
  const receta = {
    referencia: req.body.referencia,
    nombre: req.body.nombre
  };

  // graba la receta en la base de datos
  Receta.create(receta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear la receta"
      });
    });
};

// Lista todas las recetas
exports.findAll = (req, res) => {
  const referencia = req.query.referencia;
  var condition = referencia ? { referencia: { [Op.like]: `%${referencia}%` } } : null;

  Receta.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al cargar las recetas"
      });
    });
};

// Busca un receta especifica por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Receta.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar la receta ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error cargando la receta " + id
      });
    });
};

// actualiza una receta 
exports.update = (req, res) => {
  const id = req.params.id;

  Receta.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Receta actualizada"
        });
      } else {
        res.send({
          message: `No se puede actualizar la receta ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando la receta" + id
      });
    });
};

// elimina una receta especifica
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Receta.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Receta eliminada"
        });
      } else {
        res.send({
          message: `No se puede eliminar la receta ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar la receta " + id
      });
    });
};

// Elimina todas las recetas
exports.deleteAll = (req, res) => {
  Receta.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} recetas eliminadas` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al eliminar las recetas"
      });
    });
};
