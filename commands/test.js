const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test category')
  .addSubcommand(cmd =>
      cmd
        .setName("bruh")
        .setDescription("Testing.")
    ),
  async execute(interaction, client) {
    client.loadCmd(client, interaction)
  }
};
