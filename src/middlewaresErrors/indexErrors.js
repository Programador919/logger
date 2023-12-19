import EErrors from "../../src/servicesErrors/enums.js";


export default (error,req,res,next) => {
    console.log(error.cause);
    switch(error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"error", error:"unhandled error"})
    }
}