const axios = require("axios");

class playerController{

  async index(player, tag, region = "na"){
    const user = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/account/${player}/${tag}`
    );
    return user; 
  }
}

module.exports = new playerController();