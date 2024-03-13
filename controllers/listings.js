const Listing=require('../models/listing.js');

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find();
    let filter;
    res.render('./listings/index.ejs',{allListings,filter});
}

module.exports.filterIndex = async(req,res)=>{
    let filter = req.params;
    const allListings = await Listing.find();
    res.render('./listings/index.ejs',{allListings,filter});  
}

module.exports.renderNewForm = (req,res)=>{  
    res.render('./listings/new.ejs');
};

module.exports.showListing =async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    if(!listing){
        error='Listing you requested for does not exist';
        req.flash('error',error);
       return  res.redirect(`/listings`); 
    }
    res.render('./listings/show.ejs',{listing}); 
};

module.exports.createListing=async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing=new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

    console.log(newListing);
     
    await newListing.save();
    
    req.flash("success","new Listing Created");
    res.redirect('/listings');
};

module.exports.renderEditForm = async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requestted for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render('./listings/edit.ejs',{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body});

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename; 
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash('success','Listing Updated');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success','Listing Deleted');
    res.redirect(`/listings`);
};

 