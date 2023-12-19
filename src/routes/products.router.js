import { Router } from "express";
import ProductDTO from "../dao/DTOs/product.dto.js";
import { productService } from "../repositories/index.js";
import Products from "../dao/mongo/products.mongo.js"
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateProductErrorInfo } from "../services/errors/info.js";

const router = Router()

const productMongo = new Products()

router.get("/", async (req, res) => {
    let result = await productMongo.get()
    res.send({ status: "success", payload: result })
})

//--------------------------------------------------------//

router.post("/", async (req, res) => {
    let { description, image, price, stock, category, availability } = req.body
    const product = { description, image, price, stock, category, availability}
    if (!description || !price) {
        try {
            // Some code that might throw an error
            throw customError.createError({
                name: 'Error en Creacion de Producto',
                cause: generateProductErrorInfo(product),
                message: 'Error al intentar crear el Producto',
                code: EErrors.REQUIRED_DATA,
            });
        } catch (error) {
            console.error(error);
        }
    }
    let prod = new ProductDTO({ description, image, price, stock, category, availability })
    let result = await productService.createProduct(prod)
})

export default router