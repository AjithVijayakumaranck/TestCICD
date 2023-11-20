const SUBSCRIPTION = require("../../Models/subcriptionModel");

module.exports = {

    //add new subscription

    addSubcription: async (req, res) => {
        try {


            const { planName, planDuration, features, discount, monthlyPricing, yearlyPricing , extraAds , extraImges} = req.body //change
            const existedPlan = await SUBSCRIPTION.findOne({ plan_name: planName })

            if (!existedPlan) {


                SUBSCRIPTION.create({
                    plan_name: planName,
                    plan_duration: planDuration,
                    Features: features,
                    monthly_pricing: monthlyPricing,
                    yearly_pricing: yearlyPricing,
                    discount: discount,
                    extra_ads: extraAds,
                    extra_images: extraImges
                }).then((response) => {
                    res.status(200).json({ response, message: "plan is active" })
                }).catch((error) => {
                    res.status(400).json({ error, message: "plan is not added" })
                })


            } else {
                res.status(409).json({ message: "plan already existed" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" })
        }
    },

    //edit existing subscription record

    updateSubscription: async (req, res) => {
        try {
            console.log(req.body, "edit subscription");
            const { subscriptionId, planName, planDuration, features, discount, monthlyPricing, yearlyPricing } = req.body //change
            const subcriptionDetails = await SUBSCRIPTION.findOne({ _id: subscriptionId }) //change

            if (subcriptionDetails) { //change
                SUBSCRIPTION.updateOne({ _id: subscriptionId }, {
                    $set: {
                        plan_name: planName,
                        plan_duration: planDuration,
                        Features: features,
                        monthly_pricing: monthlyPricing,
                        yearly_pricing: yearlyPricing,
                        discount: discount
                    }
                }).then((response) => {
                    res.status(200).json({ response, message: "Plan resetted" })
                }).catch((error) => {
                    res.status(400).json({ error, message: "Plan not found" })
                })
            } else {
                res.status(404).json({ message: "Plan not exist" })
            }

        } catch (error) {

            console.log(error, "some error have been occurred");
            res.status(500).json({ message: "something went wrong" })

        }
    },

    // delete subscription Plan

    deleteSubscription: async (req, res) => {
        try {
            const { subscriptionId } = req.params
            const subcriptionDetails = await SUBSCRIPTION.findByid(subscriptionId)
            if (!subcriptionDetails) {
                res.status(404).json({ message: "Plan not exist" })
            } else {
                SUBSCRIPTION.updateOne({ _id: subscriptionId }, { active_status: false }).then((response) => { //change updateOne
                    res.status(200).json({ response, message: "Plan deactivated" })
                }).catch((err) => {
                    res.status(400).json({ error, message: "Plan not deactivated" })
                })
            }
        } catch (error) {
            res.status(500).json({ message: "some error have been occurred" })
        }
    },

    //get all subscription

    getSubscriptions: async (req, res) => {
        try {
            const subscriptionPlans = await SUBSCRIPTION.find()
            if (subscriptionPlans) {
                res.status(200).json(subscriptionPlans)
            } else {
                res.status(404).json({ message: "Plan not found" })
            }
        } catch (error) {
            res.status(500).json({ message: "some error have been occurred" })
        }
    },

    //get single subscription
    getSubscription: async (req, res) => {
        try {
            const { subscriptionId } = req.params
            //console.log(subscriptionId, "Id subscribe");
            const subscriptionDetails = await SUBSCRIPTION.findOne({ _id: subscriptionId }) //change
            //console.log(subscriptionDetails, "details subscribe");
            if (!subscriptionDetails) {
                res.status(404).json({ message: "No subscription found" })
            } else {
                res.status(200).json(subscriptionDetails)
            }

        } catch (error) {
            res.status(500).json({ message: "some error have been occurred" })
        }
    }

}