const pg = require('../database/config');
const bcrypt = require('bcrypt');

const message = (status, message)=>{
    return {status, message};
};

const register = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        const user = await pg.query("SELECT * FROM users WHERE user_email=$1",[email]);

        if(user.rows.length>0){
            return res.status(401).json(message(401,"User already exists"));
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pg.query("INSERT INTO users(user_name, user_email,user_password) VALUES($1,$2,$3) RETURNING *",[name, email, bcryptPassword]);

        res.status(200).json(message(200,`Welcome, ${newUser.rows[0].user_name}`));
    } catch (error) {
        console.log(error);
        res.status(500).json(message(500,"Server Error"));
    }
};

const login = async (req, res) =>{
    try{
       const {email, password} = req.body;
       const user = await pg.query("SELECT * FROM users WHERE user_email=$1",[email]);
       if(user.rows.length===0){
        return res.status(401).json(message(401,"Invalid user email!"));
       }
        
       const isValidPassword = await bcrypt.compare(password, user.rows[0].user_password);
       if(!isValidPassword){
        return res.status(401).json(message(401,"Invalid user password!"));
       }
       
       return res.status(200).json(message(200, "Successfully login!"));
    }catch(error){
        res.status(500).json(message(500,"Invalid user"));
    }
}

module.exports = {register,login};