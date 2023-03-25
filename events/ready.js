    const { GatewayIntentBits, Events, Collection, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const token = process.env.TOKEN

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
const commandsPath = path.join(`${__dirname}`, "..", 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
    console.log(`Successfully loaded ${command.data.name}`)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const commands = [];
const commandsPathh = path.join(__dirname, "..", 'commands');
const commandFiless = fs.readdirSync(commandsPathh).filter(file => file.endsWith('.js'));

for (const file of commandFiless) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
}

client.subCommands = new Collection()
const subcommandsPathh = path.join(__dirname, "..", 'cmds');
const subcommandFiless = fs.readdirSync(subcommandsPathh);

for (const file of subcommandFiless) {
  const cmdpath = path.join(__dirname, "..", 'cmds', `${file}`);
const cmdFiles = fs.readdirSync(cmdpath).filter(file => file.endsWith('.js'));
	for (const fil of cmdFiles) {
    const command = require(`../cmds/${file}/${fil}`);
    client.subCommands.set(`${file}/${fil.replace(".js", "")}`, command)
  }
	
}

client.loadCmd = async function(client, interaction) {
  if(interaction.options._subcommand){
    client.subCommands.get(`${interaction.commandName}/${interaction.options._subcommand}`).run(client, interaction)
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${Array.from(client.commands).length} application (/) commands.`);
    

		const data = await rest.put(
	Routes.applicationCommands(`${client.user.id}`),
	{ body: commands },
);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

await client.user.setActivity("/help" , {type: 1});


    
		console.log(`Ready! Logged in as ${client.user.tag}`)
	},
};