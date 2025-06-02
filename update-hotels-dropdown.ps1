# PowerShell script to update Hotels dropdown structure across all HTML files
# Replace "Hotels" and "Bedspaces" with "Luxury Hotels" and "Shared Rooms"

$workingDirectory = "C:\Users\user\Desktop\Just code\Beyond-miles"
$htmlFiles = Get-ChildItem -Path $workingDirectory -Filter "*.html" | Where-Object { $_.Name -notlike "*test*" }

Write-Host "Starting Hotels dropdown update process..." -ForegroundColor Green
Write-Host "Found $($htmlFiles.Count) HTML files to process" -ForegroundColor Yellow

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern 1: Hotels with index.html# link
    $content = $content -replace '<li><a href="index\.html#hotels" class="dropdown-link">Hotels</a></li>', '<li><a href="accommodations.html" class="dropdown-link">Luxury Hotels</a></li>'
    
    # Pattern 2: Hotels with just # link
    $content = $content -replace '<li><a href="#hotels" class="dropdown-link">Hotels</a></li>', '<li><a href="accommodations.html" class="dropdown-link">Luxury Hotels</a></li>'
    
    # Pattern 3: Bedspaces with index.html# link
    $content = $content -replace '<li><a href="index\.html#bedspaces" class="dropdown-link">Bedspaces</a></li>', '<li><a href="accommodations.html" class="dropdown-link">Shared Rooms</a></li>'
    
    # Pattern 4: Bedspaces with just # link
    $content = $content -replace '<li><a href="#bedspaces" class="dropdown-link">Bedspaces</a></li>', '<li><a href="accommodations.html" class="dropdown-link">Shared Rooms</a></li>'
    
    # Pattern 5: Handle accommodations.html dropdown link (may exist)
    $content = $content -replace '<li><a href="accommodations\.html" class="dropdown-link">Hotels</a></li>', '<li><a href="accommodations.html" class="dropdown-link">Luxury Hotels</a></li>'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "✓ Updated $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "- No changes needed for $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "`nHotels dropdown update completed!" -ForegroundColor Green

# Verification: Count instances of new links
Write-Host "`nVerification Results:" -ForegroundColor Yellow
$luxuryHotelsCount = 0
$sharedRoomsCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $luxuryHotelsCount += ($content | Select-String -Pattern "Luxury Hotels" -AllMatches).Matches.Count
    $sharedRoomsCount += ($content | Select-String -Pattern "Shared Rooms" -AllMatches).Matches.Count
}

Write-Host "Total 'Luxury Hotels' links found: $luxuryHotelsCount" -ForegroundColor Green
Write-Host "Total 'Shared Rooms' links found: $sharedRoomsCount" -ForegroundColor Green

# Check for any remaining old links
$remainingHotels = 0
$remainingBedspaces = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $remainingHotels += ($content | Select-String -Pattern 'class="dropdown-link">Hotels</a>' -AllMatches).Matches.Count
    $remainingBedspaces += ($content | Select-String -Pattern 'class="dropdown-link">Bedspaces</a>' -AllMatches).Matches.Count
}

Write-Host "Remaining old 'Hotels' dropdown links: $remainingHotels" -ForegroundColor $(if($remainingHotels -eq 0){"Green"}else{"Red"})
Write-Host "Remaining old 'Bedspaces' dropdown links: $remainingBedspaces" -ForegroundColor $(if($remainingBedspaces -eq 0){"Green"}else{"Red"})
