import jwt  from "jsonwebtoken";

export function requireAuth(request , response , next){

    const token  = request.headers.authorization?.split(' ')[1];

    if(!token){
     return response.status(401).json({
      message: 'Please log in first.',
    })
    }

    try{
       request.user = jwt.verify(token , process.env.JWT_SECRET)
       next();

    }catch{
        response.status(401).json({
            message:"invalid or expired login token",
        })
    }
}