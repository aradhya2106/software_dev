# scripts/check-environment.ps1
# A comprehensive environment checker for the software-engineer project

Write-Host "`n🔍 Starting Environment Check" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Load environment variables from .env file
$envPath = Join-Path $PSScriptRoot ".." ".env"
$envVars = @{}

function Load-EnvFile {
    param (
        [string]$EnvFilePath
    )
    
    if (Test-Path $EnvFilePath) {
        $envContent = Get-Content -Path $EnvFilePath -ErrorAction SilentlyContinue
        
        foreach ($line in $envContent) {
            if ($line -match '^\s*([^#][^=]+)=(.*)$') {
                $name = $matches[1].Trim()
                $value = $matches[2].Trim()
                # Remove surrounding quotes if present
                if ($value -match '^"(.*)"$') {
                    $value = $matches[1]
                }
                # Store in our hash table
                $envVars[$name] = $value
            }
        }
        
        return $true
    } else {
        return $false
    }
}

# 1. Check for .env file
Write-Host "`n📄 Checking for .env file..." -ForegroundColor Cyan
if (Load-EnvFile -EnvFilePath $envPath) {
    Write-Host "✅ .env file found and loaded" -ForegroundColor Green
} else {
    Write-Host "❌ No .env file found at: $envPath" -ForegroundColor Red
    Write-Host "  → Create a .env file based on .env.example" -ForegroundColor Yellow
}

# 2. Check Node.js environment
Write-Host "`n⚙️ Checking Node.js environment..." -ForegroundColor Cyan
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    $npmVersion = npm -v
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to detect Node.js or npm" -ForegroundColor Red
    Write-Host "  → Please make sure Node.js is installed and in your PATH" -ForegroundColor Yellow
}

# 3. Check for required environment variables
Write-Host "`n🔑 Checking environment variables..." -ForegroundColor Cyan

# Check DATABASE_URL
if ($envVars.ContainsKey("DATABASE_URL")) {
    $dbUrl = $envVars["DATABASE_URL"]
    if ($dbUrl -match "^(postgresql|mysql|sqlite|sqlserver|mongodb|cockroachdb)://") {
        Write-Host "✅ DATABASE_URL is set and has valid format" -ForegroundColor Green
    } else {
        Write-Host "⚠️ DATABASE_URL is set but may have invalid format" -ForegroundColor Yellow
        Write-Host "  → Expected format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ DATABASE_URL is not set in .env file" -ForegroundColor Red
    Write-Host "  → Add DATABASE_URL to your .env file" -ForegroundColor Yellow
}

# Check OPENAI_API_KEY
if ($envVars.ContainsKey("OPENAI_API_KEY")) {
    $apiKey = $envVars["OPENAI_API_KEY"]
    if ($apiKey -match "^sk-[a-zA-Z0-9_\-]{32,}") {
        Write-Host "✅ OPENAI_API_KEY is set and format looks valid" -ForegroundColor Green
        Write-Host "  → To validate the API key: npm run validate-openai-key" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️ OPENAI_API_KEY is set but format may be invalid" -ForegroundColor Yellow
        Write-Host "  → OpenAI API keys typically start with 'sk-' followed by a long string" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ OPENAI_API_KEY is not set in .env file" -ForegroundColor Red
    Write-Host "  → Add OPENAI_API_KEY to your .env file" -ForegroundColor Yellow
}

# 4. Check Prisma setup
Write-Host "`n🔄 Checking Prisma setup..." -ForegroundColor Cyan
$prismaSchemaPath = Join-Path $PSScriptRoot ".." "prisma" "schema.prisma"

if (Test-Path $prismaSchemaPath) {
    Write-Host "✅ Prisma schema found" -ForegroundColor Green
    
    # Check if prisma client is installed
    if (Test-Path (Join-Path $PSScriptRoot ".." "node_modules" ".prisma")) {
        Write-Host "✅ Prisma client appears to be generated" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Prisma client may not be generated" -ForegroundColor Yellow
        Write-Host "  → Run 'npx prisma generate' to generate the client" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Prisma schema not found at: $prismaSchemaPath" -ForegroundColor Red
}

# 5. Check Next.js setup
Write-Host "`n🌐 Checking Next.js setup..." -ForegroundColor Cyan
$nextConfigPath = Join-Path $PSScriptRoot ".." "next.config.js"

if (Test-Path $nextConfigPath) {
    Write-Host "✅ Next.js config found" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js config not found at: $nextConfigPath" -ForegroundColor Red
}

# 6. Summary
Write-Host "`n📋 Environment Check Summary" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. If any issues were found, resolve them according to the suggestions" -ForegroundColor Yellow
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor Yellow
Write-Host "3. To check if your OpenAI API key is valid, run: npm run validate-openai-key" -ForegroundColor Yellow
Write-Host "`n✨ Check complete" -ForegroundColor Cyan