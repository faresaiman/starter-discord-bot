module.exports = {
  async run(client, interaction){
    const type = interaction.options.getString('type')
    const guildId = `${interaction.options.getString('guildid')}`
    switch(type) {
      case "check":
        if(client.guilds.cache.get(guildId)) {
          await client.embed({
            color: client.config.colors.succes,
            title: "Guild checker",
            desc: `I'm in **${client.guilds.cache.get(guildId)}** server.`,
            type: "reply"
          }, interaction)
        } else {
          await client.embed({
            color: client.config.colors.error,
            title: "Guild checker",
            desc: `I'm not in this server.`,
            type: "reply"
          }, interaction)
        }
        break;
      case "leave":
        if(!client.guilds.cache.get(guildId)) return await client.embed({
            color: client.config.colors.error,
            title: "Leaving guild",
            desc: `I'm not in this server..`,
            type: "reply"
          }, interaction)
        await client.guilds.cache.get(guildId).leave()
        await client.embed({
            color: client.config.colors.succes,
            title: "Leaving guild",
            desc: `Successfully left guild`,
            type: "reply"
          }, interaction)
    }
  }
}