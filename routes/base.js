const express = require ("express")
const router = express.Router()

const base = require("../middleware/base")


router.get("/",base.basechecksession)







module.exports = router;