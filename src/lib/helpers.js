const helpers = {};
const bcrypt = require('bcryptjs');
const passport = require('passport');
helpers.encrypt_password = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(salt, password);
    return hash;
}

helpers.desencriptar = async(password, savePassword) =>{
   try{
    await bcrypt.compare(password, savePassword);
   }catch(e){
       console.log(e);
   }
};

module.exports = helpers;