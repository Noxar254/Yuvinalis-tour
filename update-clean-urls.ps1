# PowerShell script to verify and update internal links for clean URL system
# This script ensures all .html links work properly with the new clean URL structure

Write-Host "Clean URL Link Verification Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Get all HTML files
$htmlFiles = Get-ChildItem -Path "*.html" | Where-Object { $_.Name -notlike "test-*" }

Write-Host "`nFound HTML files:" -ForegroundColor Yellow
$htmlFiles | ForEach-Object { Write-Host "  - $($_.Name)" }

# Define the clean URL mappings
$urlMappings = @{
    'apply-visa.html' = '/visa/'
    'visa-services.html' = '/visa-services/'
    'flight-booking.html' = '/flights/'
    'hotel-booking.html' = '/hotels/'
    'accommodations.html' = '/accommodations/'
    'events.html' = '/events/'
    'tours.html' = '/tours/'
    'dubai-packages.html' = '/packages/'
    'gallery.html' = '/gallery/'
    'about-us.html' = '/about/'
    'plan-your-travel.html' = '/plan/'
    'booking.html' = '/booking/'
    'shop.html' = '/shop/'
    'freight-services.html' = '/freight/'
    'job-seekers.html' = '/jobs/'
    'more-attractions.html' = '/attractions/'
    'hatta-road-trip-details.html' = '/hatta-trip/'
}

Write-Host "`nURL Mappings:" -ForegroundColor Yellow
$urlMappings.GetEnumerator() | ForEach-Object {
    Write-Host "  $($_.Key) -> $($_.Value)" -ForegroundColor Cyan
}

Write-Host "`nChecking internal links in HTML files..." -ForegroundColor Yellow

foreach ($file in $htmlFiles) {
    Write-Host "`nProcessing: $($file.Name)" -ForegroundColor Magenta
    
    $content = Get-Content $file.FullName -Raw
    $linkCount = 0
    
    # Find all href attributes with .html links
    $hrefPattern = 'href="([^"]*\.html[^"]*)"'
    $matches = [regex]::Matches($content, $hrefPattern)
    
    foreach ($match in $matches) {
        $fullHref = $match.Groups[1].Value
        $linkCount++
        
        # Extract just the filename part (before any # or ?)
        $fileName = $fullHref -replace '#.*$', '' -replace '\?.*$', ''
        
        if ($urlMappings.ContainsKey($fileName)) {
            Write-Host "    ✓ Found mappable link: $fullHref" -ForegroundColor Green
        } else {
            Write-Host "    ⚠ Non-mappable link: $fullHref" -ForegroundColor Yellow
        }
    }
    
    if ($linkCount -eq 0) {
        Write-Host "    No .html links found" -ForegroundColor Gray
    } else {
        Write-Host "    Total links found: $linkCount" -ForegroundColor White
    }
}

Write-Host "`n" -ForegroundColor Green
Write-Host "Verification complete!" -ForegroundColor Green
Write-Host "The url-handler.js script will automatically handle these links:" -ForegroundColor Cyan
Write-Host "- In LOCAL development: Links work with .html extensions" -ForegroundColor Cyan
Write-Host "- In PRODUCTION: Links redirect to clean URLs automatically" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Deploy files to Apache server with mod_rewrite" -ForegroundColor White
Write-Host "2. Test clean URLs in production environment" -ForegroundColor White
Write-Host "3. Verify all navigation works correctly" -ForegroundColor White
