const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const Review = require('./review.js')
const User = require('./user.js');

let listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    }, 
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    category:{
        type:String,
        enum:["trending","iconicCity","castle","pool","mountain","room","camping","farm","arctic","boat","beach"],
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review',
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing){
     let res =    await Review.deleteMany({_id: {$in: listing.reviews}})
        console.log(res);
    }
});

let Listing=mongoose.model('Listing',listingSchema);

module.exports=Listing;