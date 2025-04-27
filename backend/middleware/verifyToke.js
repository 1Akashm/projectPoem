const jwt = require("jsonwebtoken")
const verifyToken = async(req,res,next)=>
{
    const token = req.cookies.token;

    if(!token)
    {
        return res.json({
            status: "Failed",
            message: "unauthorized - no token provided"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            res.json({
                status: "Failed",
            message: "unauthorized - invalid token"
            })
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.json({
            status: "Failed",
            message: message.error
        })
    }
}

module.exports = verifyToken