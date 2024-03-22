const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { OpenAI } = require('openai');
require('dotenv').config();

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
console.log(process.env.OPENAI_API_KEY)

// Specify the phone number you want to listen to
const allowedNumber = '256750514356@c.us'; // Replace with the actual number

client.on('message', async message => {
    // Check if the message is from the allowed number
    if (message.from !== allowedNumber) {
        console.log(`Ignoring message from ${message.from}`);
        return; // Ignore messages from other numbers
    }

    console.log(message.body); // Log the message to the console for debugging

    // Call the OpenAI API to get a response
    try {
        const response = await openai.completions.create({
            engine: "gpt-3.5-turbo",
            prompt: "You are a helpful assistant. " + message.body,
            max_tokens: 60,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        // Send the response back to the user
        const reply = response.choices[0].text;
        message.reply(reply);
    } catch (error) {
        console.error('Error from OpenAI:', error);
        message.reply('I am having trouble thinking of a response right now.');
    }
});
