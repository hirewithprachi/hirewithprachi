# Move all missing images to public/assets/images/

# Copy missing images from Hirable theme files
$hirablePath = "Hirable – Human Resources & Recruiting WordPress Theme_files"
$targetPath = "public/assets/images"

# List of images to copy
$imagesToCopy = @(
    "about-img-1.jpg",
    "about-img-2.jpg", 
    "about-img-3.jpg",
    "benefit-img-1.jpg",
    "benefit-img-2.jpg",
    "hero-image.png",
    "logo.svg",
    "author-1.jpg",
    "author-2.jpg",
    "author-3.jpg",
    "author-4.jpg"
)

foreach ($image in $imagesToCopy) {
    $source = "$hirablePath/$image"
    $destination = "$targetPath/$image"
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $destination -Force
        Write-Host "Copied: $image"
    } else {
        Write-Host "Missing: $image"
    }
}

# Create missing demo images by copying existing ones
if (Test-Path "$targetPath/prachi-logo.webp") {
    Copy-Item -Path "$targetPath/prachi-logo.webp" -Destination "$targetPath/logo.png" -Force
    Write-Host "Created: logo.png"
}

# Create fallback image
if (Test-Path "$targetPath/prachi-logo.webp") {
    Copy-Item -Path "$targetPath/prachi-logo.webp" -Destination "public/fallback-image.jpg" -Force
    Write-Host "Created: fallback-image.jpg"
}

# Create demo chart images
if (Test-Path "$targetPath/prachi-logo.webp") {
    Copy-Item -Path "$targetPath/prachi-logo.webp" -Destination "$targetPath/demo-bar-chart.png" -Force
    Copy-Item -Path "$targetPath/prachi-logo.webp" -Destination "$targetPath/demo-pie-chart.png" -Force
    Write-Host "Created: demo-bar-chart.png and demo-pie-chart.png"
}

Write-Host "Image consolidation complete!" 