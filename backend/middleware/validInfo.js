const message = (status, message)=>{
    return {status, message};
};
module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    function validPassword(password){
       return /^.{8,}$/.test(password);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(403).json(message(403,"Missing Credentials"));
      } else if (!validEmail(email)) {
        return res.status(403).json(message(403,"Invalid Email"));
      }
    } else if (req.path === "/login") {
      if(!validPassword(password)){
        return res.status(403).json(message(403,"Password must be at least 8 character."));
      }
      if (![email, password].every(Boolean)) {
        return res.status(403).json(message(403,"Missing Credentials"));
      } else if (!validEmail(email)) {
        return res.status(403).json(message(403,"Invalid Email"));
      }
    }
  
    next();
  };