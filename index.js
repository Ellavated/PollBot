require('dotenv').config();
const { Client } = require("discord.js");
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES']
});
const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;

client.login(token);

client.on('ready', () => {
  console.log(`${client.user.tag} is now online!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix) || message.channel.type == 'DM') return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;

  // TODO: command handler, if i choose to expand this
  switch (cmd) {
    case "create":
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You do not have permission to use this command.");
      let pollChannel = message.mentions.channels.first();
      if (!pollChannel) return message.reply("you must specify a channel");
      let pollDesc = args.slice(1).join(' ');

      let pollMsg = await pollChannel.send({
        embeds: [{
          title: 'New Poll!',
          description: pollDesc,
          color: Math.floor(Math.random() * 16777214) + 1,
        }]
      });
      
      await pollMsg.react('👍');
      await pollMsg.react('👎');
      return;
    case "help":
      return message.channel.send({
        embeds: [{
          title: "Help!",
          thumbnail: client.user.displayAvatarURL(),
          footer: "Created by Lunaaa#8447",
          timestamp: new Date,
          fields: [
            {
              name: "create",
              value: "p!create <#channel> <description>\nCreates a poll!"
            }
          ]
        }]
      })
  }
});