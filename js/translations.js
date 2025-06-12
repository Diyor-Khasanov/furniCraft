// Enhanced Translation System with Fallbacks
const translations = {
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    news: "News",
    contact: "Contact",
    hero_title: "Crafting Comfort, Designing Dreams",
    hero_subtitle:
      "Premium furniture for your home and office with exceptional quality and design",
    view_products: "View Products",
    contact_us: "Contact Us",
    scroll_down: "Scroll Down",
    about_title: "About Our Craft",
    about_subtitle: "Discover our passion for furniture making",
    about_heading: "Handcrafted Excellence Since 1995",
    about_text_1:
      "For over 25 years, we've been creating furniture that combines timeless design with modern functionality. Our craftsmen pour their expertise into every piece, ensuring quality that lasts generations.",
    about_text_2:
      "We source only the finest materials from sustainable forests and ethical suppliers, because we believe beautiful furniture should also be responsible.",
    years_experience: "Years Experience",
    happy_customers: "Happy Customers",
    designs_created: "Designs Created",
    slide_1: "Master Woodworking",
    slide_2: "Creative Design",
    slide_3: "Quality Inspection",
    products_title: "Our Collections",
    products_subtitle: "Explore our premium furniture lines",
    all: "All",
    living: "Living Room",
    bedroom: "Bedroom",
    office: "Office",
    outdoor: "Outdoor",
    product_1_name: "Modern Sofa",
    product_1_desc:
      "Premium fabric with wooden legs, available in multiple colors.",
    product_2_name: "King Size Bed",
    product_2_desc: "Solid walnut frame with premium upholstered headboard.",
    product_3_name: "Executive Desk",
    product_3_desc:
      "Handcrafted mahogany desk with leather inlay and brass details.",
    dimensions: "Dimensions",
    material: "Material",
    weight: "Weight",
    add_to_cart: "Add to Cart",
    view_all: "View All Products",
    news_title: "Latest News",
    news_subtitle: "Stay updated with our latest designs and offers",
    news_1_title: "Top Furniture Trends for 2023",
    news_1_excerpt:
      "Discover the emerging trends that will dominate interior design this year...",
    news_2_title: "Our Commitment to Sustainable Materials",
    news_2_excerpt:
      "How we're reducing our environmental impact through responsible sourcing...",
    read_more: "Read More",
    june: "June",
    july: "July",
    contact_title: "Get In Touch",
    contact_subtitle: "We'd love to hear from you",
    address: "Address",
    company_address: "123 Furniture Street, Tashkent, Uzbekistan",
    phone: "Phone",
    email: "Email",
    your_name: "Your Name",
    your_email: "Your Email",
    your_phone: "Your Phone",
    your_message: "Your Message",
    send_message: "Send Message",
    quick_links: "Quick Links",
    new_arrivals: "New Arrivals",
    newsletter: "Newsletter",
    newsletter_text:
      "Subscribe to get updates on new products and special offers.",
    subscribe: "Subscribe",
    copyright: "© 2023 FurniCraft. All Rights Reserved.",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    footer_about:
      "Crafting exceptional furniture with passion and precision since 1995.",
  },
  ru: {
    // Russian translations (same structure as English)
  },
  uz: {
    // Uzbek translations (same structure as English)
  },
};

// Initialize translations
function initTranslations() {
  const langButtons = document.querySelectorAll(".lang-btn");
  let currentLang = localStorage.getItem("language") || "en";

  // Set initial language
  setLanguage(currentLang);

  // Language switcher buttons
  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
      localStorage.setItem("language", lang);

      // Update active button
      langButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });

    // Mark current language button as active
    if (button.getAttribute("data-lang") === currentLang) {
      button.classList.add("active");
    }
  });
}

// Set language for the page
function setLanguage(lang) {
  if (!translations[lang]) {
    console.error(`Language ${lang} not found`);
    lang = "en"; // Fallback to English
  }

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    } else if (translations["en"][key]) {
      element.textContent = translations["en"][key]; // Fallback to English
    }
  });

  // Update all placeholder texts
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      element.setAttribute("placeholder", translations[lang][key]);
    } else if (translations["en"][key]) {
      element.setAttribute("placeholder", translations["en"][key]);
    }
  });

  // Update HTML lang attribute
  document.documentElement.setAttribute("lang", lang);

  // Update direction for RTL languages if needed
  if (lang === "ar" || lang === "he") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
}

// Expose to global scope
window.initTranslations = initTranslations;
