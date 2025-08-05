<<<<<<< HEAD
# LogiFlow - Professional Logistics Website

A comprehensive logistics website with package calculation features, interactive maps, and separate pages for liquid and solid package shipping.

## Features

### 🏠 Main Website
- **Modern Responsive Design**: Clean, professional interface that works on all devices
- **Interactive Navigation**: Smooth scrolling and mobile-friendly hamburger menu
- **Google Maps Integration**: Interactive map showing company location
- **Contact Form**: Functional contact form with validation
- **Service Showcase**: Detailed information about logistics services

### 📦 Package Calculators
- **Liquid Package Calculator**: Specialized pricing for liquid cargo
  - Different liquid types (water, oil, chemicals, hazardous materials, food, pharmaceuticals)
  - Temperature control options
  - Special handling requirements
  - Volume and weight calculations

- **Solid Package Calculator**: Comprehensive pricing for solid goods
  - Package type selection (standard, fragile, heavy machinery, electronics, furniture, automotive)
  - Dimensional weight calculations
  - Fragility and insurance options
  - Express delivery options

### 🗺️ Map Integration
- Google Maps API integration
- Company location marker
- Custom map styling
- Responsive map container

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interface
- Fast loading times

## File Structure

```
logistics-website/
├── index.html              # Main homepage
├── liquid-packages.html    # Liquid package calculator page
├── solid-packages.html     # Solid package calculator page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── README.md              # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and calculations
- **Google Maps API**: Interactive mapping
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Inter font family)

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** to the liquid or solid package pages to test calculators
4. **Replace** `YOUR_API_KEY` in the Google Maps script tag with your actual API key

## Google Maps Setup

To enable the map functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps JavaScript API
4. Create credentials (API key)
5. Replace `YOUR_API_KEY` in the script tag:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
   ```

## Calculator Features

### Liquid Package Calculator
- **Liquid Types**: Water, Oil, Chemical, Hazardous, Food, Pharmaceutical
- **Factors**: Weight, Volume, Distance, Service Type
- **Options**: Temperature Control, Special Handling
- **Pricing**: Base rates with multipliers for different liquid types

### Solid Package Calculator
- **Package Types**: Standard, Fragile, Heavy Machinery, Electronics, Furniture, Automotive
- **Factors**: Weight, Dimensions, Distance, Service Type
- **Options**: Fragile Handling, Insurance, Express Delivery
- **Pricing**: Volumetric weight calculations with size and fragility factors

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Update the color scheme by changing CSS custom properties
- Adjust responsive breakpoints as needed

### Functionality
- Edit `script.js` to modify calculation algorithms
- Update base rates and multipliers in the PackageCalculator class
- Add new package types or service options

### Content
- Update company information in HTML files
- Modify service descriptions and features
- Add new pages or sections as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and assets
- Minified CSS and JavaScript (recommended for production)
- Fast loading times
- Mobile-optimized

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please contact the development team.

---

**LogiFlow** - Your trusted partner in logistics and shipping solutions.
=======
# LogiFlow - Professional Logistics Website

A comprehensive logistics website with package calculation features, interactive maps, and separate pages for liquid and solid package shipping.

## Features

### 🏠 Main Website
- **Modern Responsive Design**: Clean, professional interface that works on all devices
- **Interactive Navigation**: Smooth scrolling and mobile-friendly hamburger menu
- **Google Maps Integration**: Interactive map showing company location
- **Contact Form**: Functional contact form with validation
- **Service Showcase**: Detailed information about logistics services

### 📦 Package Calculators
- **Liquid Package Calculator**: Specialized pricing for liquid cargo
  - Different liquid types (water, oil, chemicals, hazardous materials, food, pharmaceuticals)
  - Temperature control options
  - Special handling requirements
  - Volume and weight calculations

- **Solid Package Calculator**: Comprehensive pricing for solid goods
  - Package type selection (standard, fragile, heavy machinery, electronics, furniture, automotive)
  - Dimensional weight calculations
  - Fragility and insurance options
  - Express delivery options

### 🗺️ Map Integration
- Google Maps API integration
- Company location marker
- Custom map styling
- Responsive map container

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interface
- Fast loading times

## File Structure

```
logistics-website/
├── index.html              # Main homepage
├── liquid-packages.html    # Liquid package calculator page
├── solid-packages.html     # Solid package calculator page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── README.md              # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and calculations
- **Google Maps API**: Interactive mapping
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Inter font family)

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** to the liquid or solid package pages to test calculators
4. **Replace** `YOUR_API_KEY` in the Google Maps script tag with your actual API key

## Google Maps Setup

To enable the map functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps JavaScript API
4. Create credentials (API key)
5. Replace `YOUR_API_KEY` in the script tag:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
   ```

## Calculator Features

### Liquid Package Calculator
- **Liquid Types**: Water, Oil, Chemical, Hazardous, Food, Pharmaceutical
- **Factors**: Weight, Volume, Distance, Service Type
- **Options**: Temperature Control, Special Handling
- **Pricing**: Base rates with multipliers for different liquid types

### Solid Package Calculator
- **Package Types**: Standard, Fragile, Heavy Machinery, Electronics, Furniture, Automotive
- **Factors**: Weight, Dimensions, Distance, Service Type
- **Options**: Fragile Handling, Insurance, Express Delivery
- **Pricing**: Volumetric weight calculations with size and fragility factors

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Update the color scheme by changing CSS custom properties
- Adjust responsive breakpoints as needed

### Functionality
- Edit `script.js` to modify calculation algorithms
- Update base rates and multipliers in the PackageCalculator class
- Add new package types or service options

### Content
- Update company information in HTML files
- Modify service descriptions and features
- Add new pages or sections as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and assets
- Minified CSS and JavaScript (recommended for production)
- Fast loading times
- Mobile-optimized

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please contact the development team.

---

**LogiFlow** - Your trusted partner in logistics and shipping solutions.
>>>>>>> a9cf3c4 (Initial commit)
