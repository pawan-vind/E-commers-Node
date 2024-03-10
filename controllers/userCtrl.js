const { User } = require("../Model/user")

exports.fetchUserById = async(req, res)=>{
    const {id} = req.user
    try {
        const user = await User.findById(id, 'name, email addresses').exec()
        res.status(201).json({id:user.id, addresses: user.addresses, email: user.email, role: user.role})
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.updateUser = async (req, res)=>{
    const {id} = req.params;
try {
 const user  = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.status(201).json(user)
} catch (error) {
  console.log(error)
    res.status(400).json(error)
      }
    }