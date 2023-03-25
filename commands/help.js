const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ComponentType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Views all the bot commands.'),
  async execute(interaction, client) {
    let cmds = []
    await client.commands.filter(a => a.data.name != "help").forEach(cmd => {
      cmds.push({
        label: `${cmd.data.name.charAt(0).toUpperCase() + cmd.data.name.slice(1)}`,
        description: `${cmd.data.description}`,
        value: `${cmd.data.name}/${interaction.user.id}`
      })
    })
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Select a category')
          .addOptions(cmds)
      );



    await client.embed({
      color: client.config.colors.normal,
      title: "Help menu",
      desc: "Select a category.",
      components: [row],
      type: "reply"
    }, interaction)

    const filter = i => {
      return i.user.id === interaction.user.id
    }

    let collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 60000 })

    collector.on("collect", async choice => {

      if (choice.user.id != interaction.user.id) {
        return await choice.reply({ content: "This menu isn't for you. Use </help:1089129945650974781> to see the bot commands.", ephemeral: true })
      }
      await choice.deferUpdate()
      const subCmds = client.commands.get(choice.values[0].split("/")[0]).data.options

      await client.embed({
        title: `${choice.values[0].split("/")[0].charAt(0).toUpperCase() + choice.values[0].split("/")[0].slice(1)}`,
        color: client.config.colors.normal,
        desc: `${subCmds.map(cm => `**${cm.name.charAt(0).toUpperCase() + cm.name.slice(1)}:** ${cm.description}`).join("\n")}`,
        components: [row],
        content: "",
        type: "editreply"
      }, interaction)
    })

  }


};
