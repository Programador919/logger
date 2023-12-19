import mongoose from "mongoose"

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    description: { type: String, max: 100},
    image: { type: String, max: 100},
    price: { type: Number},
    stock: { type: Number},
    category: { type: String, max: 50 }, // Campo para la categoría
    availability: { type: String, enum: ['in_stock', 'out_of_stock'] } // Campo para la disponibilidad
})

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel;