require('dotenv').config();
const { Client, Collection } = require("discord.js");
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

  if (cmd == 'create') {
    let pollChannel = message.mentions.channels.first();
    if (!pollChannel) return message.reply("you must specify a channel");
    let pollDesc = args.slice(1).join(' ');

    let pollMsg = await pollChannel.send({
      embeds: [{
        title: 'New Poll!',
        description: pollDesc
      }]
    });
    
    await pollMsg.react('👍');
    await pollMsg.react('👎');
  }
});