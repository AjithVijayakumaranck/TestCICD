const WISHLIST = require("../Models/favouriteModel")

module.exports = {
    addWishList :async (req,res)=>{
     try {
        const{userId,productId}=req.body
        const Wishlist =await WISHLIST.findOne({userId:userId})
        if(Wishlist){
           const productINC = await Wishlist.wishlist.includes(productId)
           if(productINC){
            res.status(500).json({message:"product already exist in Wishlist"})
           }else{
            WISHLIST.updateOne({userId:userId},{
                $push:{
                    wishlist:productId
                }
            }).then(()=>{
                res.status(200).json({message:"Successfully added"})
            }).catch((error)=>{
                res.status(500).json({message:"Something went wrong"})
            })
        }
    }else{
            const wishlistTemplate = new WISHLIST({
                userId:userId,
                wishlist:[productId]
            })

           wishlistTemplate.save().then(()=>{
            res.status(200).json({message:"Successfully added"})
        }).catch((error)=>{
            res.status(500).json({message:"Something went wrong"})
        })
    }
} catch (error) {
         res.status(500).json({message:"Something went wrong"})
        
     }
}
}