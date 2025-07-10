k6 run load-test.js *>&1 | Tee-Object -FilePath instance-logs.txt

$instanceCounts = Get-Content instance-logs.txt |
    Select-String "instance=" |
    ForEach-Object {
        ($_ -split "instance=")[1].Split()[0]
    } |
    Group-Object |
    Sort-Object Count -Descending |
    ForEach-Object {
        [PSCustomObject]@{
            instance_id = $_.Name
            request_count = $_.Count
        }
    }

$instanceCounts | ConvertTo-Json | Out-File -Encoding UTF8 instance-summary.json

Write-Host "`n✅ Report saved as instance-summary.json"
