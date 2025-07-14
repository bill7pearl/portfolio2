# Modern Portfolio Website

Live link: https://bill7pearl.github.io/portfolio2/

A premium, responsive web developer portfolio website built with vanilla HTML, CSS, and JavaScript. Features modern animations, dark/light mode toggle, and a sleek design inspired by modern portfolios like Brittany Chiang's.

## ✨ Features

### 🎨 Design & UX
- **Modern & Minimalistic Design** - Clean, professional layout with premium aesthetics
- **Dark/Light Mode Toggle** - Seamless theme switching with animated transitions
- **Fully Responsive** - Optimized for all screen sizes and devices
- **Smooth Animations** - GSAP-powered scroll-triggered and mouse-triggered animations

### 🚀 Interactive Elements
- **Magnetic Buttons** - Subtle 3D hover effects on interactive elements
- **Scroll-triggered Animations** - Fade-ins, parallax effects, and pinned sections
- **Animated Skill Bars** - Progress bars that animate on scroll
- **Smooth Page Transitions** - Elegant navigation between sections

### 📱 Sections
- **Hero Section** - Engaging entrance animations with call-to-action buttons
- **About Section** - Personal introduction with animated statistics
- **Experience Timeline** - Professional journey with animated timeline
- **Projects Showcase** - Portfolio projects with hover effects
- **Skills Section** - Animated progress bars for technical skills
- **Contact Form** - Clean form with validation and success messages

### 🛠 Technical Features
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **GSAP Animations** - Professional-grade animations and effects
- **CSS Variables** - Dynamic theming system
- **Semantic HTML** - Accessible and SEO-friendly markup
- **Performance Optimized** - Fast loading and smooth interactions

## 🎯 Design Inspiration

This portfolio draws inspiration from modern design trends and portfolios like:
- [Brittany Chiang's Portfolio](https://brittanychiang.com/)
- Apple's design language
- Linear.app's interface
- Modern tech-forward aesthetics

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with theming
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Images and other assets (optional)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Customize**
   - Edit `index.html` to update content
   - Modify `styles.css` for styling changes
   - Update `script.js` for functionality modifications

## 🎨 Customization

### Content Updates

#### Personal Information
Edit the following sections in `index.html`:
- Hero section name and description
- About section content
- Experience timeline
- Project details
- Contact information

#### Styling
Modify CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #3b82f6;    /* Primary brand color */
    --accent-secondary: #1e40af;  /* Secondary brand color */
    --bg-primary: #ffffff;        /* Background color */
    --text-primary: #0f172a;      /* Primary text color */
}
```

#### Animations
Customize animations in `script.js`:
- Modify GSAP timelines in `AnimationManager` class
- Adjust scroll trigger settings
- Change magnetic effect intensity

### Adding New Sections

1. **HTML Structure**
   ```html
   <section id="new-section" class="new-section">
       <div class="container">
           <div class="section-header">
               <h2 class="section-title">New Section</h2>
               <div class="section-line"></div>
           </div>
           <!-- Your content here -->
       </div>
   </section>
   ```

2. **CSS Styling**
   ```css
   .new-section {
       padding: 6rem 0;
       background: var(--bg-secondary);
   }
   ```

3. **JavaScript Animations**
   ```javascript
   // Add to AnimationManager.setupScrollAnimations()
   gsap.from('.new-section', {
       scrollTrigger: {
           trigger: '.new-section',
           start: "top 80%",
           end: "bottom 20%",
           toggleActions: "play none none reverse"
       },
       opacity: 0,
       y: 50,
       duration: 0.8,
       ease: "power2.out"
   });
   ```

## 🎭 Animation Features

### GSAP Animations
- **ScrollTrigger** - Scroll-based animations
- **Timeline** - Complex animation sequences
- **Easing** - Smooth, professional transitions

### Magnetic Effects
- Subtle 3D hover effects on buttons
- Configurable intensity and behavior
- Smooth performance optimization

### Theme Transitions
- Animated color transitions
- Smooth backdrop filter changes
- Persistent theme storage

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Mobile Optimizations
- Touch-friendly interactions
- Optimized navigation menu
- Reduced animation complexity
- Improved performance

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 📈 Performance

### Optimizations
- Minimal JavaScript bundle
- Efficient CSS animations
- Optimized images and assets
- Lazy loading for better performance

### Loading Strategy
- Critical CSS inlined
- Non-critical resources loaded asynchronously
- Progressive enhancement approach

## 🎯 SEO & Accessibility

### SEO Features
- Semantic HTML structure
- Meta tags and descriptions
- Open Graph tags
- Structured data markup

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus management

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **Firebase Hosting**: Google's hosting solution

### Custom Domain
1. Purchase a domain
2. Configure DNS settings
3. Update hosting provider settings
4. Add SSL certificate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **GSAP** - For powerful animation capabilities
- **Inter Font** - For beautiful typography
- **Brittany Chiang** - For design inspiration
- **Modern Web Design Community** - For ongoing inspiration

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ and lots of ☕**

*This portfolio template is designed to showcase your skills and projects in the most professional and engaging way possible.* 
