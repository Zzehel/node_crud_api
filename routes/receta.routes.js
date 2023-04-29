module.exports = app => {
    const recetas = require("../controllers/receta.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", recetas.create);
  
    // Retrieve all Tutorials
    router.get("/", recetas.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", recetas.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", recetas.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", recetas.deleteOne);
  
    // Delete all Tutorials
    router.delete("/", recetas.deleteAll);
  
    app.use('/api/recetas', router);
  };