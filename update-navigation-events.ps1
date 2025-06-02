# PowerShell script to update navigation "Events & Hikes" to "Events and Tours"
# and update dropdown menu items

$files = Get-ChildItem -Path "." -Name "*.html"

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating navigation in $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Replace "Events & Hikes" with "Events and Tours" in navigation
        $content = $content -replace 'Events & Hikes', 'Events and Tours'
        
        # Update the dropdown menu items for events section
        # Replace "All Events" with "All Tours and Events"
        $content = $content -replace 'All Events', 'All Tours and Events'
        
        # Replace "Upcoming Events" with "Upcoming Tours and Events"
        $content = $content -replace 'Upcoming Tours and Events', 'Upcoming Tours and Events'
        $content = $content -replace 'Upcoming Events', 'Upcoming Tours and Events'
        
        # Write the updated content back to the file
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "Updated $file"
    }
}

Write-Host "Navigation updates completed for all HTML files!"
