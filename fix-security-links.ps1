# PowerShell script to fix all target="_blank" links missing rel="noopener"

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix various patterns of target="_blank" without rel="noopener"
    $patterns = @(
        # Pattern 1: target="_blank"> without any rel attribute
        @{
            Pattern = 'target="_blank">'
            Replacement = 'target="_blank" rel="noopener">'
        },
        # Pattern 2: target="_blank" > (with space) without any rel attribute
        @{
            Pattern = 'target="_blank" >'
            Replacement = 'target="_blank" rel="noopener">'
        },
        # Pattern 3: Links that have rel but not noopener
        @{
            Pattern = 'target="_blank" rel="([^"]*)"(?![^>]*noopener)'
            Replacement = 'target="_blank" rel="$1 noopener"'
        }
    )
    
    $originalContent = $content
    
    foreach ($pattern in $patterns) {
        $content = $content -replace $pattern.Pattern, $pattern.Replacement
    }
    
    # Only write back if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  ✓ Updated: $($file.Name)"
    } else {
        Write-Host "  - No changes needed: $($file.Name)"
    }
}

Write-Host "`nFinished processing all HTML files!"
