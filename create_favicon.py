#!/usr/bin/env python3
"""
Favicon Generator Script for Yuvinalis Tourism
This script converts the logo.jpg to various favicon formats
"""

from PIL import Image
import os

def create_favicon_from_logo():
    """Create favicon files from logo.jpg"""
    
    # Check if logo exists
    logo_path = "images/logo.jpg"
    if not os.path.exists(logo_path):
        print(f"Error: {logo_path} not found!")
        return
    
    try:
        # Open the logo image
        with Image.open(logo_path) as img:
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Create different sizes for favicon
            sizes = [
                (16, 16, "favicon-16x16.png"),
                (32, 32, "favicon-32x32.png"), 
                (180, 180, "apple-touch-icon.png"),
                (192, 192, "android-chrome-192x192.png"),
                (512, 512, "android-chrome-512x512.png")
            ]
            
            for width, height, filename in sizes:
                # Resize image
                resized = img.resize((width, height), Image.Resampling.LANCZOS)
                
                # Save as PNG
                output_path = f"images/{filename}"
                resized.save(output_path, "PNG")
                print(f"Created: {output_path}")
            
            # Create ICO file (for older browsers)
            ico_sizes = [(16, 16), (32, 32), (48, 48)]
            ico_images = []
            for width, height in ico_sizes:
                resized = img.resize((width, height), Image.Resampling.LANCZOS)
                ico_images.append(resized)
            
            # Save as ICO
            ico_path = "images/favicon.ico"
            ico_images[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
            print(f"Created: {ico_path}")
            
    except Exception as e:
        print(f"Error creating favicon: {e}")
        return
    
    # Create site.webmanifest
    create_webmanifest()
    print("All favicon files created successfully!")

def create_webmanifest():
    """Create site.webmanifest for PWA support"""
    manifest_content = """{
    "name": "Yuvinalis Tourism",
    "short_name": "YuvinalisTourism",
    "description": "Leading Dubai travel agency offering visa processing, tours, and hotel bookings",
    "icons": [
        {
            "src": "android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "android-chrome-512x512.png", 
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#3498db",
    "background_color": "#ffffff",
    "display": "standalone",
    "start_url": "/",
    "scope": "/"
}"""
    
    with open("images/site.webmanifest", "w") as f:
        f.write(manifest_content)
    print("Created: images/site.webmanifest")

if __name__ == "__main__":
    print("Generating favicon files for Yuvinalis Tourism...")
    create_favicon_from_logo()
