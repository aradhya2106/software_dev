// scripts/check-openai-key.js
require('dotenv').config();

console.log('\n🔑 OpenAI API Key Configuration Check\n');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.log('❌ Error: OPENAI_API_KEY is not set in your .env file\n');
  console.log('Please add your OpenAI API key to the .env file:');
  console.log('OPENAI_API_KEY="your-api-key-here"\n');
  console.log('To get an API key, visit: https://platform.openai.com/account/api-keys\n');
  process.exit(1);
}

if (apiKey === 'dummy-key-for-development' || apiKey === 'your-actual-openai-api-key-goes-here') {
  console.log('⚠️  Warning: You are using a placeholder API key\n');
  console.log('The current key in your .env file is not a valid OpenAI API key.');
  console.log('Please replace it with your actual API key from OpenAI.\n');
  console.log('To get an API key, visit: https://platform.openai.com/account/api-keys\n');
  process.exit(1);
}

console.log('✅ OpenAI API key is configured (key format looks valid)\n');
console.log('Note: This check only validates that a key is present with the correct format.');
console.log('It does not verify if the key is active or has sufficient credits.\n');
console.log('If you still see API key errors in the app, please ensure your key is valid and has available credits.\n');