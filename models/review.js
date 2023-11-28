// models/listing.js
const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const reviewSchema = new Schema({
    rating: {
      type: Number,
      min:1,
      max:5
    },
    comment:
       { type: String,},
    createdAt:{
        type: Date,
        default: Date.now()
    },
    author:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review

// each hotel has multiple revies which is not infinite : so one to few relationship;