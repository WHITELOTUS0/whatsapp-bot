const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
console.log(process.env.OPENAI_API_KEY);

// Function to process a message and generate a response using OpenAI
async function processMessage(message) {
    console.log(message); // Log the message to the console for debugging

    // Call the OpenAI API to get a response
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo",
            prompt: "You are a helpful assistant. " + message,
            max_tokens: 60,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        // Return the response
        return response.choices[0].text;
    } catch (error) {
        console.error('Error from OpenAI:', error);
        return 'I am having trouble thinking of a response right now.';
    }
}

// Example usage
const message = "hello";
processMessage(message).then(reply => {
    console.log("Response:", reply);
});
