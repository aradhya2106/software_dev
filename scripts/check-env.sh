# This script checks if environment variables are loading correctly
# You can run this with: npm run check-env

echo "Checking environment variables..."

# Check if NODE_ENV is set
if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV is not set"
else
  echo "NODE_ENV: $NODE_ENV"
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set"
else
  echo "DATABASE_URL: [MASKED]"
fi

# Check if OPENAI_API_KEY is set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "⚠️ OPENAI_API_KEY is not set"
else
  echo "OPENAI_API_KEY: [MASKED]"
fi

echo "Environment check complete"