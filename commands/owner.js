const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { inspect } = require('util');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('owner')
    .setDescription('Owner category')
    .addSubcommand(cmd =>
      cmd
        .setName("guild")
        .setDescription("Leave a guild or checks if the bot is in it.")
        .addStringOption(op => op
          .setName('type')
          .setDescription("The type of the process")
          .setRequired(true)
          .addChoices(
            {
              name: "Check", value: "check"
            },
            {
              name: "Leave", value: "leave"
            }
          )
        )
        .addStringOption(op => op
          .setName("guildid")
          .setDescription("The ID of the guild.")
          .setRequired(true))
      )

    
    .addSubcommand(cmd =>
      cmd
        .setName("eval")
        .setDescription("Runs a command.")
        .addStringOption(op => op.setName("code").setDescription("The code you want to run.").setRequired(true)))
    .addSubcommand(cmd =>
      cmd
        .setName("status")
        .setDescription("Changes the status of the bot.")
        .addStringOption(op => op.setName("content").setDescription("The content").setRequired(true))
        .addStringOption(op =>
          op.setName("type").setDescription("The type of status").setRequired(true).addChoices(
            { name: "Watching", value: "watching" },
            { name: "Playing", value: "playing" }
          )

        )
    ),
  async execute(interaction, client) {
    if (!["538352367654141952"].includes(interaction.user.id)) return client.embed({
      color: client.config.colors.error,
      title: "Missing permissions.",
      desc: '**Error:**\n```Only the owner can use this command.```',
      type: "ephemeral"
    }, interaction)
    client.loadCmd(client, interaction)
  }
}