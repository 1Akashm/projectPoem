const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (res,userId)=>
{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d",
    })

    res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //protect from csrf attack
        maxAge: 7 * 24 * 60 * 60 * 1000, //equals to 7days if need 15days change the 7 to 15
    })
    return token;
}

module.exports = generateTokenAndSetCookie;