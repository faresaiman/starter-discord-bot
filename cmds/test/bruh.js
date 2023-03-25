module.exports = {
  async run(client, interaction){
    await interaction.reply({ content: "this is a test command", ephemeral: true })
  }
}