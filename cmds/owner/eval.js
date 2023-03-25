const { inspect } = require("util")


module.exports = {
  async run(client, interaction){
    let code = interaction.options.getString("code")
        code = code.replace(/[""]/g, '"').replace(/['']/g, "'");
        let evaled;
          try {
            const start = process.hrtime();
          evaled = eval(code);

          if (evaled instanceof Promise) {
            evaled = await evaled;
          }

          const stop = process.hrtime(start);
          const outputResponse = `\`\`\`${inspect(evaled, { depth: 0 })}\n\`\`\``;

        await client.embed({
          color: client.config.colors.normal,
          title: 'eval',
          desc: `${outputResponse}`,
          type: 'reply'
        }, interaction)
          } catch (err) {
            await client.embed({
              color: client.config.colors.error,
              title: "eval",
              desc: `**Error:**\n\`\`\`${err.message}\`\`\``,
              type: "reply"
            }, interaction)
          }


        }
  
}