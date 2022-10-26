const express = require('express');
const requireAuth = require('../middleware/requireAuth')


const {createAdditionalInfo, getAdditionalInfo, updateAdditionalInfo} = require('../controllers/userInfoController')

const router = express.Router();

// require for user auth
router.use(requireAuth);

router.get('/addinfo', getAdditionalInfo)
router.post('/addinfo', createAdditionalInfo)
router.patch('/addinfo/:id', updateAdditionalInfo)

module.exports = router;