module.exports = (sequelize, Sequelize) => {
    const Receta = sequelize.define("receta", {
      referencia: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return Receta;
  };