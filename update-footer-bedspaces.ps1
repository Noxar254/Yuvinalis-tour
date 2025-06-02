# PowerShell script to update footer sections in all HTML files
# Replace "Bedspaces" with "Domestic Tours" and add "International Tours"

$htmlFiles = @(
    "about-us.html",
    "dubai-packages.html", 
    "events.html",
    "flight-booking.html",
    "freight-services.html",
    "gallery.html",
    "hotel-booking.html",
    "job-seekers.html",
    "plan-your-travel.html",
    "visa-services.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        
        # Read file content
        $content = Get-Content $file -Raw
        
        # Replace the footer destination section pattern
        $oldPattern = '<li><a href="#hotels">Bedspaces</a></li>'
        $newPattern = '<li><a href="#tours">Domestic Tours</a></li>' + "`r`n" + '                        <li><a href="#tours">International Tours</a></li>'
        
        $updatedContent = $content -replace [regex]::Escape($oldPattern), $newPattern
        
        # Write back to file
        Set-Content $file -Value $updatedContent -NoNewline
        
        Write-Host "✓ Updated $file"
    } else {
        Write-Host "⚠ File not found: $file"
    }
}

Write-Host "`nFooter updates completed!"
