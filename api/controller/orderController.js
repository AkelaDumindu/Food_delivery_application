const Order = require("../model/orderSchema");
const Customer = require("../model/customerSchema");

const createOrder=(req,resp)=>{
    const order = new Order({
        date:req.body.date,
        customerDetails:req.body.customerDetails,
        totalCost:req.body.totalCost,
        products:req.body.products
    });

    order.save().then(response=>{
        resp.status(201).json({'message':'order saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findOrder=(req,resp)=>{
    Order.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json({'data':selectedObj});
        }
        return resp.status(404).json({'message':'Order not found!'});
    });
}
const updateOrder=async (req,resp)=>{
    const updateData = await Order.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            date:req.body.date,
            customerDetails:req.body.customerDetails,
            totalCost:req.body.totalCost,
            products:req.body.products
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const deleteOrder=async (req,resp)=>{
    const deleteData = await Order.findByIdAndDelete({'_id':req.params.id});

    if(deleteData){
        return  resp.status(204).json({'message':'deleted'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}

const findAllOrder = (req, resp) => {
    Order.find({})
        .then(result => {
            resp.status(200).json({ status: true, data: result });
        })
        .catch(error => {
            resp.status(500).json(error);
        });
};

const findAllIncome=async (req,resp)=>{
    try{
        const result = await Order.aggregate([
            {$group:{
                _id:null,
                    totalCostSum:{$sum:'$totalCost'}
                }}
        ]);
        console.log(result);
        const totalCostSum= result.length>0?result[0].totalCostSum:0;
        resp.json({totalCostSum});
    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}
const findAllCount=(req,resp)=>{
    try{
        Order.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}


module.exports = {
    createOrder,
    findOrder,
    updateOrder,
    deleteOrder,
    findAllOrder,
    findAllCount,
    findAllIncome
    // findAll,
};