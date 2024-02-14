const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const productManager = new ProductManager();

//rutas:

router.get("/", async (req, res) => {
  try {
      const limit = req.query.limit || 1;
      const page = req.query.limit ||2;

      const productos = await productManager.getProducts(limit, page);
      console.log(productos)
      res.render("index", {prod: productos,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages,
        limit: productos.limit
    })
    
  } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
});


router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
      const producto = await productManager.getProductById(id);
      if (!producto) {
          return res.json({
              error: "Producto no encontrado"
          });
      }

      res.json(producto);
  } catch (error) {
      console.error("Error al obtener producto", error);
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
});


router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
      await productManager.addProduct(nuevoProducto);
      res.status(201).json({
          message: "Producto agregado exitosamente"
      });
  } catch (error) {
      console.error("Error al agregar producto", error);
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
});


router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productoActualizado = req.body;

  try {
      await productManager.updateProduct(id, productoActualizado);
      res.json({
          message: "Producto actualizado exitosamente"
      });
  } catch (error) {
      console.error("Error al actualizar producto", error);
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
});


router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
      await productManager.deleteProduct(id);
      res.json({
          message: "Producto eliminado exitosamente"
      });
  } catch (error) {
      console.error("Error al eliminar producto", error);
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
});

module.exports = router;