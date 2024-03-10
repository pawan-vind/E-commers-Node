const { Category } = require("../Model/category")

exports.fetchCategory = async(req, res) =>{
    try {
        const categorys  = await Category.find({}).exec()
        res.status(200).json(categorys)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.createcategory = async(req, res) =>{
    console.log("first")
    try {
        const category  = new Category(req.body)
        console.log(category)
        const doc = await category.save()
        console.log(doc)
        res.status(200).json(doc)
    } catch (error) {
        console.log(error)
        console.log("ky hua")
        res.status(400).json(error)
    }
}