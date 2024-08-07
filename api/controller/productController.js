const Product= require('../model/productSchema');


const createProduct=(req,resp)=>{
    const product = new Product({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        unitPrice:req.body.unitPrice,
        qtyOnHand:req.body.qtyOnHand
    });
    product.save().then(response=>{
        resp.status(201).json({'message':'Product saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findProduct=(req,resp)=>{
    Product.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message':'customer not found!'});
    });
}
const updateProduct=async (req,resp)=>{
    const updateData = await Product.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description,
            image:req.body.image,
            unitPrice:req.body.unitPrice,
            qtyOnHand:req.body.qtyOnHand
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const deleteProduct=async (req,resp)=>{
    const deleteData = await Product.findByIdAndDelete({'_id':req.params.id});

    if(deleteData){
        return  resp.status(204).json({'message':'deleted'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
// const findAllProduct = async (req, resp) => {
//         try {
//             const { searchText, page = 1, size = 10 } = req.query;
    
//             const pageNumber = parseInt(page);
//             const pageSize = parseInt(size);
    
//             const query = {};
//             if (searchText) {
//                 query.$text = { $search: searchText };
//             }
    
//             const skip = (pageNumber - 1) * pageSize;
//             const response = await Customer.find(query).limit(pageSize).skip(skip);
//             return resp.status(200).json(response);
//         } catch (error) {
//             console.log(error);
//             return resp.status(500).json({ 'message': 'Internal server error' });
//         }
//     };

const findAllProduct = (req, resp) => {
    Product.find({})
        .then(result => {
            resp.status(200).json({ status: true, data: result });
        })
        .catch(error => {
            resp.status(500).json(error);
        });
};


module.exports = {
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct,
    findAllProduct,
    // findAllCount,
    // findAllMin
    // findAll,
};