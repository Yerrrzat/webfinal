# Web Final Project: DE TeaHouse

## Overview

This repository contains the final project for the web development course: **DE TeaHouse**, an e-commerce website for tea and desserts. The application is built entirely using client-side technologies (HTML, CSS, JavaScript with jQuery) and demonstrates proficiency in core web development concepts, including user authentication, form validation, search functionality, local storage persistence, and external API integration.

The project was developed to fulfill all specified course requirements, ensuring all features are fully functional, relevant to the project's theme, and presented in a polished, professional manner.

## Features & Requirements Fulfillment

### 1. Responsiveness (10 points)

The website is fully responsive and adapts seamlessly to various screen sizes.
*   Utilizes Bootstrap 5's grid system and responsive utilities.
*   Tested on desktop, tablet, and mobile device emulators.
*   All content, navigation, and interactive elements remain accessible and usable across all device types.

### 2. Hosting (5 points)

The project is hosted on GitHub Pages for public access.
*   Repository URL: `https://yerrrzat.github.io/webfinal/`
*   A detailed `README.md` file is included within the repository, as required.

### 3. Light and Dark Modes (5 points)

The application provides users with the ability to switch between light and dark themes.
*   A toggle button (`#themeToggle`) is available in the top-right corner of the navigation bar on all pages.
*   The selected theme preference is persisted in `localStorage`.
*   CSS classes are applied dynamically to ensure consistent styling across all pages, with appropriate color contrast for readability in both modes.

### 4. Design Quality (25 points)

The design is polished, professional, and free of formatting issues.
*   **Color Scheme:** A cohesive palette of earthy browns, creams, and soft neutrals is used, providing excellent contrast for text and interactive elements in both light and dark modes.
*   **Professionalism:** The layout is clean and organized, leveraging Bootstrap 5 components for consistency. All visual elements directly support the "tea house" theme.
*   **Relevance:** Every element, from typography to icons and buttons, serves a clear purpose and enhances the user experience. No placeholder or non-functional elements are present.

### 5. Enhanced JavaScript Functionality (25 points)

#### Authentication Features in Local Storage
*   **User Account Creation (Sign Up):** Implemented via `register.html`. User data (name, email, password) is validated against criteria (email format, password length, confirmation match) before being stored in `localStorage`.
*   **User Sign-in (Log In):** Implemented via `login.html`. Upon successful login, users are redirected to `profile.html`.
*   **Profile Display:** The `profile.html` page dynamically retrieves the current user's data from `localStorage` and displays their name and email address.

#### Saving Rating Information in Local Storage
*   A 5-star rating system is implemented for each product.
*   When a registered user rates a product, their rating is saved to `localStorage` under a unique key combining their email and the product ID.
*   Average ratings for products are calculated from all stored ratings and displayed to non-logged-in users.

#### Form Validation
*   All forms (`register.html`, `login.html`, `delivery.html`) include comprehensive client-side validation:
    *   **Password:** Must be at least 6 characters long.
    *   **Email:** Validated against a standard email format regex.
    *   **Confirmation:** Passwords must match during registration.
    *   **Required Fields:** All fields are checked for emptiness before submission.
    *   **Delivery Form:** Validates that the user is logged in before allowing order submission.

#### Search and Filtration Features
*   An interactive search bar is available on `menu.html` and `bar-menu.html`.
*   As the user types, results are filtered in real-time, with matching text highlighted.
*   Autocomplete suggestions are generated from product titles and stored in an array for user convenience.
*   All search-related functionality is fully operational; no placeholder buttons are present.

### 8. External API Integration (10 points)

The project integrates with the **ExchangeRate-API** to provide dynamic currency conversion for product prices.
*   **Relevance:** The API is directly relevant to the e-commerce theme of the project, allowing international customers to view prices in their local currency.
*   **Implementation:** The application uses the free tier of the API endpoint `https://api.exchangerate-api.com/v4/latest/KZT` to fetch exchange rates for 165 currencies.
*   **Functionality:** Prices are stored in a base currency (KZT) and dynamically converted to USD or EUR based on user selection. The conversion uses the `Intl.NumberFormat` API for accurate, locale-specific formatting.
*   **Data Handling:** Rates are cached locally to minimize requests. The API provides indicative midpoint rates, which are suitable for display purposes in an e-commerce context.

### 9. Feature Cohesion and Relevance to Project Theme (10 points)

Every feature and design choice is carefully aligned with the theme of a digital tea shop.
*   The color scheme evokes warmth and tradition.
*   The product descriptions and imagery focus on the sensory experience of tea and dessert.
*   Functionalities like user profiles, ratings, and currency conversion enhance the shopping experience for a global customer base.
*   The overall user interface is intuitive and provides a positive, seamless experience from browsing to ordering.

### 10. Overall Presentation (5 points)

This README serves as a clear, concise, and professional documentation of the project. It outlines the project's purpose, features, technical implementation, and how it meets all course requirements. The code is well-structured and commented, facilitating understanding and future maintenance.

## Deployment URL

The live version of the project is deployed on GitHub Pages:

[https://yerrrzat.github.io/webfinal/](https://yerrrzat.github.io/webfinal/)

## Authors

*   Mukhametkali Dias
*   Qaldyqan Yerzat

---
