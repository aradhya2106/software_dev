# This script checks if environment variables are loading correctly
# You can run this with: npm run check-env:ps

Write-Host "Checking environment variables..." -ForegroundColor Cyan
$envPath = Join-Path $PSScriptRoot ".." ".env"

# Function to load environment variables from .env file
function Load-EnvFile {
    param (
        [string]$EnvFilePath
    )
    
    if (Test-Path $EnvFilePath) {
        Write-Host "Loading variables from .env file..." -ForegroundColor Cyan
        $envContent = Get-Content -Path $EnvFilePath -ErrorAction SilentlyContinue
        
        foreach ($line in $envContent) {
            if ($line -match '^\s*([^#][^=]+)=(.*)$') {
                $name = $matches[1].Trim()
                $value = $matches[2].Trim()
                # Remove surrounding quotes if present
                if ($value -match '^"(.*)"$') {
                    $value = $matches[1]
                }
                # Set the variable in the current PowerShell session
                Set-Variable -Name "env:$name" -Value $value -Scope Script
            }
        }
    } else {
        Write-Host "No .env file found at: $EnvFilePath" -ForegroundColor Yellow
    }
}

# Load environment variables from .env file
Load-EnvFile -EnvFilePath $envPath

Write-Host "=== System Environment Variables ===" -ForegroundColor Cyan

# Check if NODE_ENV is set in system environment
if ([string]::IsNullOrEmpty($env:NODE_ENV)) {
  Write-Host "NODE_ENV is not set in system environment" -ForegroundColor Yellow
} else {
  Write-Host "NODE_ENV: $env:NODE_ENV"
}

# Check if DATABASE_URL is set in system environment
if ([string]::IsNullOrEmpty($env:DATABASE_URL)) {
  Write-Host "DATABASE_URL is not set in system environment" -ForegroundColor Yellow
} else {
  Write-Host "DATABASE_URL: [MASKED - SYSTEM]"
}

# Check if OPENAI_API_KEY is set in system environment
if ([string]::IsNullOrEmpty($env:OPENAI_API_KEY)) {
  Write-Host "OPENAI_API_KEY is not set in system environment" -ForegroundColor Yellow
} else {
  Write-Host "OPENAI_API_KEY: [MASKED - SYSTEM]"
}

Write-Host "`n=== .env File Variables ===" -ForegroundColor Cyan

# Attempt to read values from .env file directly for reporting
if (Test-Path $envPath) {
    $envContent = Get-Content -Path $envPath -ErrorAction SilentlyContinue
    $envVars = @{}
    
    foreach ($line in $envContent) {
        if ($line -match '^\s*([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remove surrounding quotes if present
            if ($value -match '^"(.*)"$') {
                $value = $matches[1]
            }
            $envVars[$name] = $value
        }
    }
    
    # Check if NODE_ENV is set in .env
    if (-not $envVars.ContainsKey("NODE_ENV")) {
        Write-Host "NODE_ENV is not set in .env file" -ForegroundColor Yellow
    } else {
        Write-Host "NODE_ENV: $($envVars["NODE_ENV"])"
    }
    
    # Check if DATABASE_URL is set in .env
    if (-not $envVars.ContainsKey("DATABASE_URL")) {
        Write-Host "DATABASE_URL is not set in .env file" -ForegroundColor Yellow
    } else {
        Write-Host "DATABASE_URL: [MASKED - .env]"
    }
    
    # Check if OPENAI_API_KEY is set in .env
    if (-not $envVars.ContainsKey("OPENAI_API_KEY")) {
        Write-Host "OPENAI_API_KEY is not set in .env file" -ForegroundColor Yellow
    } else {
        $apiKey = $envVars["OPENAI_API_KEY"]
        if ($apiKey -like "sk-*") {
            Write-Host "OPENAI_API_KEY: [MASKED - .env] (Format looks valid)" -ForegroundColor Green
        } else {
            Write-Host "OPENAI_API_KEY: [MASKED - .env] (Format might not be valid)" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "No .env file found - cannot check for variables in .env" -ForegroundColor Yellow
}

Write-Host "`nEnvironment check complete" -ForegroundColor Cyan