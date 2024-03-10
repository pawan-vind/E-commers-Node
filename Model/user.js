const mongoose  = require('mongoose')
const {Schema}  = mongoose;

const userSchema = new Schema({
name:  {type : String},
email: {type : String, require: true, unique: true},
password: {type : Buffer, require: true},
role: {type : String, require: true, default: 'user'},
addresses: {type: [Schema.Types.Mixed]},
orders: {type: [Schema.Types.Mixed]},
salt: Buffer
})

// "email": "pawan@gmail.com",
// "password": "Pawan_0915@",
// "id": 1,
// "role": "user",
// "addresses": [
//   {
//     "name": "Paw kumar",
//     "email": "pawan@gmail.com",
//     "phone": "7000858680",
//     "street": "Ho no 11 pathani",
//     "city": "bhoapl",
//     "state": "Madhya Pradesh",
//     "pinCode": "462022"
//   },
//   {
//     "name": "Nutan ",
//     "email": "pawan@gmail.com",
//     "phone": "7000858680",
//     "street": "Ho no 11 pathani",
//     "city": "bhoapl",
//     "state": "Madhya Pradesh",
//     "pinCode": "462022"
//   },
//   {
//     "name": "raja ji",
//     "email": "pawan@gmail.com",
//     "phone": "7000858680",
//     "street": "Ho no 11 pathani",
//     "city": "bhoapl",
//     "state": "Madhya Pradesh",
//     "pinCode": "462022"
//   }
// ]

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
})

exports.User = mongoose.model('User', userSchema)