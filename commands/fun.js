const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Fun category')
    .addSubcommand(cmd =>
      cmd
        .setName("howgay")
        .setDescription("Shows you howgay you're.")
        .addUserOption(op => op.setName("user").setDescription("The user you want to see how gay he is").setRequired(false))
    ),
  async execute(interaction, client) {
    switch (interaction.options._subcommand) {
      case "howgay":
        const user = interaction.options.getUser("user") || interaction.user
        const percent = Math.round(Math.random() * 100)
        const emb = new EmbedBuilder()
          .setTitle("Howgay")
          .setColor("#5865F2")
          .setTimestamp()
          .setDescription(`${user.id === interaction.user.id ? "You're" : `${user.tag} is`} **${percent}%** gay.`)
          .setFooter({
            text: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL({ size: 1024 })
          })
        const reallyGay = new EmbedBuilder()
          .setColor("#5865F2")
          .setTimestamp()
          .setFooter({
            text: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL({ size: 1024 })
          })
          .setDescription(`Wow ${user.id === interaction.user.id ? "you're" : "they're"} really gay.`)
        await interaction.reply({ embeds: [emb] })
        if (percent >= 50) {
          await interaction.followUp({ embeds: [reallyGay], ephemeral: true })
        }
        break;
    }
  }
};