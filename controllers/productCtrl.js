const { Product } = require("../Model/product")

exports.createProduct = async (req, res)=>{
    const product = new Product(req.body)
    try {
        const doc = await product.save() 
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.fetchAllProducts = async (req, res)=>{
  // filter = {"category:["smartphone", "laptops"]}
  // sort = {_sort:"price", _order:"desc"}
  // pagination = {_page:1, _limit:10}
  let condition = {}
  if(!req.query.admin){
    condition.deleted =  {$ne: true}
  }

  let query = Product.find(condition)
  let totalProductQuery = Product.find(condition)
  
  if(req.query.category){
    query = query.find({category: req.query.category});
    totalProductQuery = totalProductQuery.find({category: req.query.category})
  }
  if(req.query.brand){
    query = query.find({brand: req.query.brand});
    totalProductQuery = totalProductQuery.find({brand: req.query.brand});
  }
//   TODO: get sorted from discounted price
  if(req.query._sort && req.query._order){
    query = query.sort({[req.query._sort]: req.query._order});
  }

  const totalDocs = await totalProductQuery.count().exec();
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

exports.fetchAllProductById = async (req, res)=>{
const {id} = req.params;
try {
    const product  = await Product.findById(id)
    res.status(201).json(product)
} catch (error) {
    console.log(error)
    res.status(400).json(error)
}
}


exports.updateProduct = async (req, res)=>{
    const {id} = req.params;
try {
 const product  = await Product.findByIdAndUpdate(id, req.body, {new: true})
    res.status(201).json(product)
} catch (error) {
  console.log(error)
    res.status(400).json(error)
      }
    }