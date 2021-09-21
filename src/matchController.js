const axios = require("axios");

class matchController{

  async index(player, tag, region = "na"){
    const matches = await axios.get(
      `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${player}/${tag}`
    );
    return matches; 
  }
}

module.exports = new matchController();