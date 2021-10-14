const express = require('express');
const router = express.Router();
const {loginUser, saveData,fetchData,deleteUserName,authorize} =require('../handlers/handler.js')
const auth = require('../config/Stratergy.js')



router.post('/login',loginUser)
router.post('/data',auth,saveData)
router.get('/data',auth,fetchData)
router.post('/delete',auth, deleteUserName)
router.post('/auth',auth,authorize)




 

module.exports = router;

