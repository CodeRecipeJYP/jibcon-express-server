'use strict';
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {type: String, index: { unique: true }, required: true},
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

ProductSchema.method("update", function (updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

const Product = mongoose.model("Product", ProductSchema);
module.exports.Product = Product;


const ProductInstanceSchema = new Schema({
    text: String,
    createAt: {type: Date, default: Date.now},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
});

ProductInstanceSchema.pre("save", function (next) {
    this.answers.sort(sortAnswers);
    next();
});

const ProductInstance = mongoose.model("ProductInstance", ProductInstanceSchema);
module.exports.ProductInstance = ProductInstance;
