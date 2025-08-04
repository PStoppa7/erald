// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Google Maps Integration
function initMap() {
    // Default location (New York)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: defaultLocation,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#757575' }]
            }
        ]
    });

    // Add marker for company location
    new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: 'LogiFlow Headquarters',
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    });
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Package Calculation Functions
class PackageCalculator {
    constructor() {
        this.baseRates = {
            air: 2.5,
            sea: 0.8,
            ground: 1.2
        };
        
        this.distanceMultipliers = {
            local: 1.0,
            domestic: 1.5,
            international: 2.5
        };
    }

    calculateSolidPackage(weight, dimensions, distance, service) {
        const volume = dimensions.length * dimensions.width * dimensions.height;
        const volumetricWeight = volume / 5000; // Standard volumetric weight calculation
        const chargeableWeight = Math.max(weight, volumetricWeight);
        
        let baseRate = this.baseRates[service] || this.baseRates.ground;
        let distanceMultiplier = this.distanceMultipliers[distance] || this.distanceMultipliers.local;
        
        // Additional factors for solid packages
        const fragilityFactor = dimensions.fragile ? 1.3 : 1.0;
        const sizeFactor = volume > 1000000 ? 1.2 : 1.0; // Large package surcharge
        
        const totalPrice = chargeableWeight * baseRate * distanceMultiplier * fragilityFactor * sizeFactor;
        
        return {
            price: totalPrice,
            breakdown: {
                baseRate: baseRate,
                chargeableWeight: chargeableWeight,
                distanceMultiplier: distanceMultiplier,
                fragilityFactor: fragilityFactor,
                sizeFactor: sizeFactor
            }
        };
    }

    calculateLiquidPackage(weight, volume, distance, service, liquidType) {
        let baseRate = this.baseRates[service] || this.baseRates.ground;
        let distanceMultiplier = this.distanceMultipliers[distance] || this.distanceMultipliers.local;
        
        // Special handling for liquids
        const liquidHandlingFactor = this.getLiquidHandlingFactor(liquidType);
        const temperatureFactor = liquidType === 'hazardous' ? 1.5 : 1.0;
        const volumeFactor = volume > 1000 ? 1.3 : 1.0; // Large volume surcharge
        
        const totalPrice = weight * baseRate * distanceMultiplier * liquidHandlingFactor * temperatureFactor * volumeFactor;
        
        return {
            price: totalPrice,
            breakdown: {
                baseRate: baseRate,
                weight: weight,
                distanceMultiplier: distanceMultiplier,
                liquidHandlingFactor: liquidHandlingFactor,
                temperatureFactor: temperatureFactor,
                volumeFactor: volumeFactor
            }
        };
    }

    getLiquidHandlingFactor(liquidType) {
        const factors = {
            'water': 1.0,
            'oil': 1.2,
            'chemical': 1.8,
            'hazardous': 2.5,
            'food': 1.3,
            'pharmaceutical': 1.6
        };
        return factors[liquidType] || 1.0;
    }
}

// Initialize calculator
const calculator = new PackageCalculator();

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PackageCalculator;
}
