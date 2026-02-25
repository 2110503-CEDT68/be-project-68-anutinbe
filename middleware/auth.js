const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    };
    if(!token){
        return res.status(401).json({success:false,message:"Not authorize to access this route"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await User.findById(decoded.id);
        next();
    }catch(err){
        console.log(err.stack);
        return res.status(401).json({success:false,message:"Not authorize to access this route"});
    }
}
exports.getMe=async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,data:user
        
    });
}