const { Order } = require("../Model/order");

exports.fetchOrderByUser = async(req, res) =>{
    const {id} = req.user;
    try {
        const order  = await Order.find({user:id})
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.createOrders = async(req, res) =>{
    try {
        const order  = new Order(req.body)
        const doc = await order.save()
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteOrder = async(req, res) =>{
    const {id} = req.params;
    try {
        const order = await Order.findByIdAndDelete(id)
        res.status(200).json({sucess: "Remove From Order List"})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateOrder = async (req, res)=>{
    const {id} = req.params;
try {
 const order  = await Order.findByIdAndUpdate(id, req.body, {new: true})
    res.status(201).json(order)
} catch (error) {
  console.log(error)
    res.status(400).json(error)
      }
}

exports.fetchAllOrders = async (req, res)=>{
    // filter = {"category:["smartphone", "laptops"]}
    // sort = {_sort:"price", _order:"desc"}
    // pagination = {_page:1, _limit:10}
  
    let query = Order.find({deleted: {$ne: true}})
    let totalOrdersQuery = Order.find({deleted: {$ne:true}})
    
  //   TODO: get sorted from discounted price
    if(req.query._sort && req.query._order){
      query = query.sort({[req.query._sort]: req.query._order});
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({totalDocs})
  
    if(req.query._page && req.query._limit){
      const pageSize = req.query._limit;
      const page = req.query._page
      query = query.skip(pageSize*(page -1)).limit(pageSize)
    }
      try {
          const doc = await query.exec() 
          res.set('X-Total-Count', totalDocs)
          res.status(201).json(doc)
      } catch (error) {
          res.status(400).json(error)
      }
  }
  