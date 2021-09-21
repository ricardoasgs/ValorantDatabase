const axios = require("axios");

class playerController{

  async index(player, tag, region = "na"){
    try{
    const user = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/account/${player}/${tag}`
    );
    return user.data.data; 
    } catch(e){
      
    }
  }
}

module.exports = new playerController();