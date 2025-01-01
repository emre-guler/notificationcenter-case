# Notification Center Implementation

This project implements a dynamic notification center feature for e-commerce websites. It provides a user-friendly interface to display recent product views and notifications to users.

## Features

- Floating notification bell icon with smooth interactions
- Displays up to 3 most recently viewed products
- Persistent storage using localStorage
- Responsive design with modern UI
- Clean animations and transitions
- New product badges

## Technical Details

The implementation uses:
- Vanilla JavaScript
- jQuery 3.6.3
- CSS for styling and animations
- Browser's localStorage for data persistence

## Functionality

- Automatically tracks product views on product detail pages
- Stores last 3 viewed products
- Displays product information including:
  - Product image
  - Product title
  - Product description
  - "NEW" badge
- Toggle notification panel by clicking the bell icon

## Usage

1. Include the required jQuery dependency:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
```

2. Include the main.js file in your project
3. The notification center will automatically initialize on page load

## Storage

The notification center uses localStorage to persist viewed products. The storage key is 'notificationCenter' and stores an array of product objects containing:
- title
- description
- image
- productLink

## UI Components

- Small notification bell (🔔) that toggles to close button (❌) when panel is open
- Main notification panel with header "DISCOVER OUR DEALS"
- Product cards with images, titles, and descriptions
- Styled with a purple theme (#A34476)

## Notes

This was implemented as an interview case study demonstrating front-end development skills including:
- DOM manipulation
- State management
- UI/UX design
- Event handling
- Local storage usage 