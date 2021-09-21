const Discord = require("discord.js");
const client = new Discord.Client();

const playerController = require("./playerController");
const matchController = require("./matchController");

require("dotenv").config();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", async msg => {
  const message = msg.toString().split(" ");
  if (message[0] == "!player") {
    const player = message[1];
    const tag = message[2];
    const user = await playerController.index(player, tag);

    console.log(user);

    const level = user.account_level;
    const nick = `${user.name} #${user.tag}`;

    const embed = new Discord.RichEmbed()
      .setTitle("User Info:")
      .setColor(0xff0000)
      .setDescription(`O Level Atual de ${nick} é: ${level}`);

    msg.channel.send(embed);
  } else if(message[0] == "!match"){
    const player = message[1];
    const tag = message[2];
    const matches = await matchController.index(player, tag);

    const embed = new Discord.RichEmbed()
      .setTitle("Partida Atual:")
      .setColor(0xff0000);
      await matches.players.all_players.map(player=> {
        embed.addField(`${player.name} - ${player.currenttier_patched}`, `${player.character}`, false);
      })
      

    msg.channel.send(embed);
  }else if(message[0] == "!."){
    const matches = await matchController.index("Mika.Rega", "1997");

    const embed = new Discord.RichEmbed()
      .setTitle("Partida Atual:")
      .setColor(0xff0000);
      await matches.players.all_players.map(player=> {
        embed.addField(`${player.name} - ${player.currenttier_patched}`, `${player.character}`, false);
      })
      

    msg.channel.send(embed);
  }
  else {
    return;
  }
});

client.login(process.env.BOT_TOKEN);