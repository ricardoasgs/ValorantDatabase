const axios = require("axios");

class matchController{

  async index(matchId){
    const match = await axios.get(
      `https://api.henrikdev.xyz/valorant/v2/match/${matchId}`
    );
    return match; 
  }
}

module.exports =  new matchController();