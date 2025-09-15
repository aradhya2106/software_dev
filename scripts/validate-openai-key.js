// scripts/validate-openai-key.js
require('dotenv').config();
const { OpenAI } = require('openai');

console.log('\n🔑 OpenAI API Key Validation\n');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.log('❌ Error: OPENAI_API_KEY is not set in your .env file\n');
  console.log('Please add your OpenAI API key to the .env file:');
  console.log('OPENAI_API_KEY="your-api-key-here"\n');
  console.log('To get an API key, visit: https://platform.openai.com/account/api-keys\n');
  process.exit(1);
}

// Format check
if (!apiKey.startsWith('sk-')) {
  console.log('❌ Error: The OPENAI_API_KEY does not have the correct format\n');
  console.log('OpenAI API keys typically start with "sk-"\n');
  console.log('Please check your API key and try again.\n');
  process.exit(1);
}

// Create OpenAI client
const openai = new OpenAI({ apiKey });

async function validateApiKey() {
  try {
    console.log('Testing API key by making a small request to OpenAI...\n');
    
    // Make a minimal API call to validate the key
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say "API key is working!" in one short sentence' }],
      max_tokens: 12
    });
    
    console.log('✅ Success! API key is valid and working.\n');
    console.log('Response received:');
    console.log(response.choices[0].message.content);
    console.log('\nYou can now use the OpenAI API in your application.\n');
    
  } catch (error) {
    console.log('❌ Error: The API key validation failed\n');
    console.log(`Error message: ${error.message}\n`);
    
    if (error.message.includes('Incorrect API key')) {
      console.log('Your API key appears to be invalid. Please check for typos or get a new key.\n');
    } else if (error.message.includes('exceeded your current quota')) {
      console.log('Your API key is valid, but you have exceeded your quota.\n');
      console.log('Please check your usage limits at: https://platform.openai.com/account/billing/\n');
    } else {
      console.log('There was an issue with your API key or the OpenAI service.\n');
      console.log('Please ensure your internet connection is working and try again.\n');
    }
    
    process.exit(1);
  }
}

validateApiKey();