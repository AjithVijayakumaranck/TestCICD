const policies = require('../../Controllers/SuperAdmin/policy_controller');
const { authoriseJwt } = require('../../utilities/authorisation');

const router = require('express').Router();

// add terms and conditions
router.post("/add_terms",authoriseJwt,policies.addTerms)

//get active terms
router.get("/get_term",policies.getTerm)

// get all terms
router.get("/get_terms",policies.getTerms)





module.exports = router;