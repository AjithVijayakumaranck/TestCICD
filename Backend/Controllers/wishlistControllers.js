const WISHLIST = require("../Models/favouriteModel")

module.exports = {

    //add to wishlist

    addWishList: async (req, res) => {
        try {
            const { userId, productId } = req.body
            const Wishlist = await WISHLIST.findOne({ userId: userId })
            if (Wishlist) {
                const productINC = await Wishlist.wishlist.includes(productId)
                if (productINC) {
                    res.status(500).json({ message: "product already exist in Wishlist" })
                } else {
                    WISHLIST.updateOne({ userId: userId }, {
                        $push: {
                            wishlist: productId
                        }
                    }).then(() => {
                        res.status(200).json({ message: "Successfully added" })
                    }).catch((error) => {
                        res.status(500).json({ message: "Something went wrong" })
                    })
                }
            } else {
                const wishlistTemplate = new WISHLIST({
                    userId: userId,
                    wishlist: [productId]
                })

                wishlistTemplate.save().then(() => {
                    res.status(200).json({ message: "Successfully added" })
                }).catch((error) => {
                    res.status(500).json({ message: "Something went wrong" })
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })

        }
    },
    getWishList:async (req, res) => {
        try {
           const {userId} = req.params
           const wishlist = await WISHLIST.find({userId:userId}).sort({createdAt:-1})
           if(wishlist){
               res.status(200).json(wishlist)
           }else{
               res.status(404).json({message:"Cant find your wishlist"})
           }
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }

    },

    //remove from wishlist
    remove_product: async (req, res) => {
        try {
            const { userId, productId } = req.params

            const wishlistDetails = await WISHLIST.findOne({ userId: userId })

            if (!wishlistDetails) {
                res.status(404).json({ message: "Product not found in your wishlist" })
            } else {
                WISHLIST.updateOne({ _id: wishlistDetails._id }, {
                    $pull: {
                        wishlist: productId
                    }
                }).then(() => {
                    res.status(200).json({ message: "successfully removeed" })
                }).catch(() => {
                    res.status(400).json({ message: "failed to remove" })
                })
            }


        } catch (error) {
            res.status(500).json({ message: "something went wrong" })

        }
    }
}