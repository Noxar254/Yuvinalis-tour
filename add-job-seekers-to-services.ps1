# PowerShell script to add "Job Seekers" to Services dropdown menu across all HTML files

$files = Get-ChildItem -Path "." -Name "*.html"

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating Services dropdown in $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Add Job Seekers link to Services dropdown menu after Freight Services
        # Pattern 1: For files with freight-services.html link
        $content = $content -replace '(<li><a href="freight-services\.html" class="dropdown-link">Freight Services</a></li>)', '$1
                    <li><a href="job-seekers.html" class="dropdown-link">Job Seekers</a></li>'
        
        # Pattern 2: For files with #freight-services link
        $content = $content -replace '(<li><a href="#freight-services" class="dropdown-link">Freight Services</a></li>)', '$1
                    <li><a href="job-seekers.html" class="dropdown-link">Job Seekers</a></li>'
        
        # Pattern 3: For files with index.html#freight-services link
        $content = $content -replace '(<li><a href="index\.html#freight-services" class="dropdown-link">Freight Services</a></li>)', '$1
                    <li><a href="job-seekers.html" class="dropdown-link">Job Seekers</a></li>'
        
        # Write the updated content back to the file
        Set-Content -Path $file -Value $content -Encoding UTF8
        
        Write-Host "Updated $file"
    }
}

Write-Host "Job Seekers added to Services dropdown in all HTML files!"
