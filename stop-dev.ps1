# Stop processes listening on common dev ports (backend 5002, frontend 5173-5180)
$ports = @(5002) + (5173..5180)

foreach ($p in $ports) {
  try {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conns) {
      $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
      foreach ($id in $pids) {
        Write-Output "Stopping process $id listening on port $p"
        Stop-Process -Id $id -Force -ErrorAction SilentlyContinue
      }
    }
  } catch {
    # skip
  }
}

Write-Output "Stop command completed. Verify with: netstat -ano | findstr ":5002""
