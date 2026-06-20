# allow-node-firewall.ps1
# Script to add a Windows Firewall rule allowing node.exe on port 3000 and test connectivity.
# Run this script elevated (as Administrator).

$nodePath = "C:\Program Files\nodejs\node.exe"
$ruleName = "Allow Node 3000"
$port = 3000

Write-Host "Adding firewall rule to allow $nodePath on TCP port $port (rule: $ruleName) ..." -ForegroundColor Cyan
try {
    netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow program="$nodePath" protocol=TCP localport=$port enable=yes | Out-Null
    Write-Host "Firewall rule added (or already exists)." -ForegroundColor Green
} catch {
    Write-Host "Failed to add firewall rule: $_" -ForegroundColor Red
}

Write-Host "\nTesting TCP connectivity to 127.0.0.1:$port ..." -ForegroundColor Cyan
try {
    $test = Test-NetConnection -ComputerName 127.0.0.1 -Port $port -WarningAction SilentlyContinue
    $test | Format-List | Out-Host
    if ($test.TcpTestSucceeded) {
        Write-Host "\nTcpTestSucceeded: True — ouvrez http://127.0.0.1:3000 dans votre navigateur." -ForegroundColor Green
    } else {
        Write-Host "\nTcpTestSucceeded: False — vérifiez que Next.js tourne et que node.exe est bien le binaire écoutant sur le port." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Erreur lors du test : $_" -ForegroundColor Red
}

Write-Host "\nAffichage des processus node trouvés:" -ForegroundColor Cyan
Get-Process -Name node -ErrorAction SilentlyContinue | Format-Table Id,ProcessName,Path -AutoSize | Out-Host

Write-Host "\nTerminé." -ForegroundColor Cyan
