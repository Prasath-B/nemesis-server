const jwt  = require('jsonwebtoken')


const auth =async (req,res,next)=>{
 
  try { 

      
      const token =  req.header('x-auth-token')
      const decodedToken = jwt.verify(token,"NemesisProject"); 

      req.userData = {
         email: decodedToken.email,
         id: decodedToken.id 
   };    
   next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Auth failed!" });
  }


};

module.exports =auth;