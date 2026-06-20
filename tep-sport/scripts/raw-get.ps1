$TargetHost = '127.0.0.1'
$TargetPort = 3000
try {
    $client = New-Object System.Net.Sockets.TcpClient($TargetHost,$TargetPort)
    $stream = $client.GetStream()
    $req = "GET / HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n"
    $bytes = [System.Text.Encoding]::ASCII.GetBytes($req)
    $stream.Write($bytes,0,$bytes.Length)
    $buffer = New-Object byte[] 65536
    $ms = New-Object System.IO.MemoryStream
    while (($read = $stream.Read($buffer,0,$buffer.Length)) -gt 0) {
        $ms.Write($buffer,0,$read)
    }
    $resp = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
    Write-Output $resp.Substring(0,[Math]::Min(2000,$resp.Length))
    $stream.Close()
    $client.Close()
} catch {
    Write-Output "ERROR: $($_.Exception.Message)"
}