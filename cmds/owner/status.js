module.exports = {
  async run(client, interaction){
    const content = interaction.options.getString("content")
    const type = interaction.options.getString("type")
    const types = [
      {
       name: "playing",
        type: 1
      },
      {
        name: "watching",
        type: 3
      },
      {
        name: "streaming",
        type: 2
      }
    ]


     client.user.setActivity(content , {type: types.find(a => a.name === type).type});

    await client.embed({
      color: client.config.colors.succes,
      title: "Successfully changed status.",
      desc: `**Type:** ${type.charAt(0).toUpperCase() + type.slice(1)}\n**Content:** ${content}`,
      type: "reply"
    }, interaction)

    
  }
}