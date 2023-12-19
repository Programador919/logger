import mongoose from "mongoose"

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({ 
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId, // Cambiamos el tipo a ObjectId
            ref: 'products', // Referencia al modelo 'productsModel'
          },
          quantity: Number,
        },
      ],
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;