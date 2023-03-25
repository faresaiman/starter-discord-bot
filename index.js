const Discord = require('discord.js')
const fs = require('node:fs');
const path = require('node:path');
const { GatewayIntentBits, Events, Collection, REST, Routes } = require('discord.js');
require('discord-reply')
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
})
const token = process.env.TOKEN


const express = require('express')
const app = express()

app.get("/", (req, res) => {
  res.send("Starting.")
})
app.listen(3000, () => {
  console.log("Starting Triangular test bot...")
})

client.templateEmbed = function() {
  return new Discord.EmbedBuilder()
    .setAuthor({
      name: client.user.username,
      iconURL: client.user.avatarURL({ size: 1024 })
    })
    .setColor(client.config.colors.normal)
    .setFooter({
      text: client.config.discord.footer,
      iconURL: client.user.avatarURL({ size: 1024 })
    })
    .setTimestamp();
}

client.config = {
  colors: { succes: '#57F287', error: '#ED4245', normal: '#5865F2' },
  discord: {
    footer: `© Triangular 2023 - ${new Date().getFullYear()}`
  }
}

client.commands = new Discord.Collection()


client.embed = async function({
  embed: embed = client.templateEmbed(),
  title: title,
  desc: desc,
  color: color,
  image: image,
  author: author,
  url: url,
  footer: footer,
  thumbnail: thumbnail,
  fields: fields,
  content: content,
  components: components,
  type: type
}, interaction) {
  if (title) embed.setTitle(title);
  if (desc && desc.length >= 2048) embed.setDescription(desc.substr(0, 2044) + "...");
  else if (desc) embed.setDescription(desc);
  if (image) embed.setImage(image);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (fields) embed.addFields(fields);
  if (author) embed.setAuthor(author);
  if (url) embed.setURL(url);
  if (footer) embed.setFooter({ text: footer });
  if (color) embed.setColor(color);
  return client.sendEmbed({
    embeds: [embed],
    content: content,
    components: components,
    type: type
  }, interaction)
}


client.sendEmbed = async function({
  embeds: embeds,
  content: content,
  components: components,
  type: type
}, interaction) {
  if (type && type.toLowerCase() == "edit") {
    return await interaction.edit({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true
    }).catch(e => { });
  }
  else if (type && type.toLowerCase() == "editreply") {
    return await interaction.editReply({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true
    }).catch(e => { });
  }
  else if (type && type.toLowerCase() == "reply") {
    return await interaction.reply({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true
    }).catch(e => { });
  }
  else if (type && type.toLowerCase() == "update") {
    return await interaction.update({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true
    }).catch(e => { });
  }
  else if (type && type.toLowerCase() == "ephemeraledit") {
    return await interaction.editReply({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true,
      ephemeral: true
    }).catch(e => { });
  }
  else if (type && type.toLowerCase() == "ephemeral") {
    return await interaction.reply({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true,
      ephemeral: true
    }).catch(e => { });
  }
    else if (type && type.toLowerCase() == "followup") {
    return await interaction.followUp({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true,
      ephemeral: true
    }).catch(e => { });
  }
      else if (type && type.toLowerCase() == "replyephemeral") {
    return await interaction.followUp({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true,
      ephemeral: true
    }).catch(e => { });
  }
  else {
    return await interaction.send({
      embeds: embeds,
      content: content,
      components: components,
      fetchReply: true
    }).catch(e => { });
  }
}





const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.TOKEN)