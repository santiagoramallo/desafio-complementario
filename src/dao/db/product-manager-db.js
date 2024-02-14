const ProductModel = require("../models/product.model.js");


class ProductManager {

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            //Acá tenemos que cambiar la validacion: 
            const existeProducto = await ProductModel.findOne({ code: code });

            if (existeProducto) {
                console.log("El código debe ser único");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    async getProducts(limit,page) {
        try {
            const productos = await ProductModel.paginate({},{limit,page});
            return productos;
        } catch (error) {
            console.log("Error al obtener los productos", error);
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto encontrado!!");
            return producto;
        } catch (error) {
            console.log("Error al traer un producto por id");
        }
    }

    async updateProduct(id, updatedProducts) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, updatedProducts);

            if (!actualizado) {
                console.log("No se encuentra el producto");
                return null;
            }

            console.log("Producto actualizado con exito!");
            return actualizado;
        } catch (error) {
            console.log("Error al actualizar el producto", error);

        }
    }

    async deleteProduct(id) {
        try {
            const deleteado = await ProductModel.findByIdAndDelete(id);

            if (!deleteado) {
                console.log("No se escuentra el producto");
                return null;
            }

            console.log("Producto eliminado correctamente!");
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

module.exports = ProductManager; 