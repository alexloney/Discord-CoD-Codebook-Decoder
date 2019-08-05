const Discord = require('discord.js');
const token = require('./token.json');
const botconfig = require('./botconfig.json');
const codebook = require('./codebook.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    
    if (message.content.startsWith(`${botconfig.prefix}${botconfig.command}`))
    {
        let parts = message.content.split(' ');
        let command = parts[0];

        // Remove the command from the array
        parts.shift();

        if (parts.length < 2) {
            const embed = new RichEmbed()
                .setTitle('Unable to parse message')
                .setColor(0xFF0000)
                .setDescription('Usage: ' + botconfig.prefix + botconfig.command + " PAGE MESSAGE");

            message.channel.send(embed);
            return;
        }

        let page = parts[0];
        
        // Remove the page number from the array.
        parts.shift();

        if (page in codebook.pages) {
            const embed = new RichEmbed()
                .setTitle('Unknown page number')
                .setColor(0xFF0000)
                .setDescription('Specified page number does not seem to exist')

            message.channel.send(embed);
            return;
        }

        if (parts.length - 2 > codebook.pages[page].length) {
            const embed = new RichEmbed()
                .setTitle('Message too long')
                .setColor(0xFF0000)
                .setDescription('The provided message appears to be to long')

            message.channel.send(embed);
            return;
        }

        let decoded = [];
        let pos = 0;
        parts.forEach(item => {
            decoded.push(item);
            decoded[pos] = decoded[pos] - codebook.pages[page][pos];
            decoded[pos] = codebook.key[decoded[pos]];

            pos += 1;
        });
        
        const embed = new RichEmbed()
            .setTitle('Decoded Message')
            .setColor(0x00FF00)
            .setDescription(decoded.join(''));
        
        message.channel.send(embed);

        console.log(decoded);
    }
});

// Invite URL: https://discordapp.com/oauth2/authorize?&client_id=608060735599149206&scope=bot&permissions=0
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token.token);

