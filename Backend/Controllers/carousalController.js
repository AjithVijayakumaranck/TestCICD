const CAROUSAL = require("../Models/carousalModel");
const { cloudUpload, cloudDelete } = require("../utilities/cloudinary");

module.exports = {

    uploadCarousal: (req, res) => {
        console.log("carousal");
        try {
            const File = req.file.path
            cloudUpload(File, "Carousal").then((response) => {
                console.log(response, "image");
                CAROUSAL.create({
                    image: response
                }).then((respone) => {
                    res.status(200).json("carousal posted")
                }).catch((error) => {
                    res.status(400).json(error.message)
                })
            })

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    },

    deactivateCarousal: async (req, res) => {
        const { carousalId, status } = req.query
        try {
            const carousalDetails = await CAROUSAL.findById(carousalId)
            if (!carousalDetails) {
                res.status(404).json({ message: "carousal not found" });
            } else {
                CAROUSAL.findByIdAndUpdate(carousalDetails._id, { active: status }).then((response) => {
                    if (response.modifiedCount == 0) {
                        res.status(404).json({ message: "carousal not modified" });
                    } else {
                        res.status(200).json({ message: "carousal status toggled" })
                    }
                }).catch((error) => {
                    res.status(400).json(error.message)
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    deleteCarousal: async (req, res) => {
        const { carousalId } = req.query
        try {
            const carousalDetails = await CAROUSAL.findById(carousalId)
            console.log(carousalDetails.image);
            if (!carousalDetails) {
                res.status(404).json({ message: "carousal not found" });
            } else {
                cloudDelete(carousalDetails.image.public_id).then(() => {
                    CAROUSAL.findByIdAndUpdate(carousalDetails._id, { deleted: true }).then((response) => {
                        if (response.modifiedCount == 0) {
                            res.status(404).json({ message: "carousal not delted" });
                        } else {
                            res.status(200).json({ message: "carousal status deleted" })
                        }
                    }).catch((error) => {
                        console.log(error);
                        res.status(400).json(error.message)
                    })
                }).catch((error) => {
                    console.log(error);
                    res.status(400).json(error.message)
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    getCarousal: (req, res) => {
        try {
            CAROUSAL.find({deleted:false,active:true}).then((response) => {
                res.status(200).json(response)
            }).catch((error) => {
                res.status(400).json(error.message)
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}