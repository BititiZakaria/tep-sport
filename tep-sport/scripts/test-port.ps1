param(
    [string]$TargetHost = '127.0.0.1',
    [int]$TargetPort = 3000
)
try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $async = $tcp.BeginConnect($TargetHost, $TargetPort, $null, $null)
    $wait = $async.AsyncWaitHandle.WaitOne(3000)
    if (-not $wait) {
        Write-Output "TcpTestSucceeded: False (timeout)"
    } else {
        $tcp.EndConnect($async)
        Write-Output "TcpTestSucceeded: True"
        $tcp.Close()
    }
} catch {
    Write-Output "TcpTestSucceeded: False ($($_.Exception.Message))"
}

Try {
    $proc = Get-Process -Name node -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,Path
    if ($proc) {
        Write-Output "Node processes:"
        $proc | Format-Table -AutoSize | Out-String | Write-Output
    } else {
        Write-Output "Node processes: none found"
    }
} Catch {
    Write-Output "Error listing node processes: $($_.Exception.Message)"
}