const Discord = require("discord.js");
const client = new Discord.Client();

const playerController = require("./playerController");
const matchController = require("./matchController");
const matchUserController = require("./matchUserController");

require("dotenv").config();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", async msg => {
  const message = msg.toString().split(" ");
  if (message[0] == "!player") {
    const player = message[1];
    const tag = message[2];
    const user = playerController.index(player, tag);

    const level = user.data.account_level
    const nick = `${user.data.name} #${user.data.tag}`

    const embed = new Discord.RichEmbed()
      .setTitle("User Info:")
      .setColor(0xff0000)
      .setDescription(`O Level Atual de ${nick} é: ${level}`);

    msg.channel.send(embed);
  } else if(message[0] == "!match"){
    const player = message[1];
    const tag = message[2];
    const matches = matchController.index(player, tag);

    const matchId = matches.data[0].matchid;

    const match = matchUserController.index(matchId);

    const embed = new Discord.RichEmbed()
      .setTitle("Partida Atual:")
      .setColor(0xff0000);
      await match.data.players.all_players.map(player=> {
        embed.setDescription(`${player.name} - ${player.character} - ${player.currenttier_patched}`);
      })
      

    msg.channel.send(embed);
  }
  
  else {
    return;
  }
});

client.login(process.env.BOT_TOKEN);