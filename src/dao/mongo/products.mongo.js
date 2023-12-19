import productsModel from './models/products.model.js'
import mongoose from 'mongoose'

export default class Products {
    constructor() {

    }

    get = async () => {
        let products = await productsModel.find().lean()
        return products
    }
    addProduct = async (prodData) => {
        try
        {
            let prodCreate = await productsModel.create(prodData);
            return prodCreate
            console.log("Producto creado correctamente")
        }catch(error){
            console.error('Error al crear producto:', error);
            return 'Error al crear producto';
        }      
    }
    updateProduct = async (prodId, prodData) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(prodId)) {
                return 'ID de producto no válido';
            }
            let updatedProduct = await productsModel.updateOne({ _id: new mongoose.Types.ObjectId(prodId) }, { $set: prodData });

        } catch (error) {
            console.error('Error al actualizar producto:', error);
            return 'Error al actualizar producto';
        }
    }
    deleteProduct = async (productId) => {
        try {
            // Verificar si el ID es válido
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return 'ID de producto no válido';
            }
    
            // Eliminar el producto utilizando el ID
            let deletedProduct = await productsModel.deleteOne({ _id: new mongoose.Types.ObjectId(productId) });
    
            if (deletedProduct.deletedCount > 0) {
                // Si se eliminó al menos un producto, se considera exitoso
                return 'Producto eliminado exitosamente';
            } else {
                return 'No se encontró un producto con el ID proporcionado';
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return 'Error al eliminar producto';
        }
    };
}