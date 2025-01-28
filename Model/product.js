const mongoose  = require('mongoose')
const {Schema}  = mongoose;

const productSchema = new Schema({
title: {type : String, require: true, unique: true},
description: {type: String, require: true},
price: {type: Number, min:[0, "Wrong min price"], max:[100000, "Wrong max price"], require: true},
discountPercentage: {type: Number, min:[0, "Wrong min discountPercentage"], max:[100000, "Wrong max discountPercentage"],},
stock: {type: Number, min:[0, "Wrong min stock"],},
rating: {type: Number, min:[0, "Wrong min rating"], max:[5, "Wrong max rating"], default:0,},
brand: {type : String, require: true},
category: {type : String, require: true},
images: { type: [String] }, // Array of image paths
thumbnail: { type: String }, // Single image path
deleted: {type : Boolean,  default: false},
})

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
})

exports.Product = mongoose.model('product', productSchema)