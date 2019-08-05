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
        let command = parts.shift();

        if (parts.length < 2) {
            const embed = new Discord.RichEmbed()
                .setTitle('Unable to parse message')
                .setColor(0xFF0000)
                .setDescription('Usage: ' + botconfig.prefix + botconfig.command + " PAGE MESSAGE");

            message.channel.send(embed);
            return;
        }

        // Remove the page number from the array.
        let page = parts.shift();
        
        if (!(page in codebook.pages)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Unknown page number')
                .setColor(0xFF0000)
                .setDescription('Specified page number (' + page + ') does not seem to exist')

            message.channel.send(embed);
            return;
        }

        if (parts.length > codebook.pages[page].length) {
            const embed = new Discord.RichEmbed()
                .setTitle('Message too long')
                .setColor(0xFF0000)
                .setDescription('The provided message appears to be to long')

            message.channel.send(embed);
            return;
        }

        let decoded = [];
        let pos = 0;
        parts.forEach(item => {
            let letter = item;

            // Subtract the codebook entry from the input
            letter = letter - codebook.pages[page][pos];

            // Instead of having -36, 0, 36 = 0, -35, 1, 37 = 1, etc.
            // I'm just adding 36 to each entry to normalize it to be
            // 0 or higher, then mod'ing it by 36.
            letter = letter + 36;
            letter = letter % 36;

            // Lookup the letter in the codebook.
            letter = codebook.key[letter];

            // And store the decoded letter
            decoded.push(letter);

            pos += 1;
        });
        
        const embed = new Discord.RichEmbed()
            .setTitle('Decoded Message')
            .setColor(0x00FF00)
            .setDescription(decoded.join(''));
        
        message.channel.send(embed);
    }
});

// Invite URL: https://discordapp.com/oauth2/authorize?&client_id=608060735599149206&scope=bot&permissions=0
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token.token);

