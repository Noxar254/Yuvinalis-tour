# PowerShell script to fix remaining footer "Bedspaces" entries
$files = @("apply-visa.html", "more-attractions.html", "shop.html")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Replace Bedspaces with Domestic Tours and International Tours in footer sections only
        # Look for the specific pattern in footer links
        $content = $content -replace '<li><a href="#hotels">Bedspaces</a></li>', @"
<li><a href="#tours">Domestic Tours</a></li>
                    <li><a href="#tours">International Tours</a></li>
"@
        
        # Write the updated content back to the file
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "Updated $file"
    } else {
        Write-Host "File $file not found, skipping..."
    }
}

Write-Host "Remaining footer updates completed!"
