# Start both services in a new PowerShell window using the root npm `dev` script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Output "Starting dev environment from: $scriptDir"

Start-Process -FilePath "powershell" -ArgumentList -NoExit, "-Command cd '$scriptDir'; npm run dev" -WindowStyle Normal

Write-Output "Launched dev processes in a new PowerShell window. Close the window to stop them." 
