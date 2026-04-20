# Portfolio - Lecture 06 & Weather App

## Features implemented
- **Weather App Page** - Real-time weather data from Open-Meteo API
- **11 Cities** - Kuopio, Helsinki, Tampere, Paris, Bayonne, Gaillac, Ljubljana, Yakutsk, Lisbon, Porto, Arcos de Valdevez
- **External Data Demo** - User data from JSONPlaceholder API
- **Theme Toggle** - Light/Dark mode with localStorage
- **Skills Section** - Grid layout with 6+ skills
- **Projects Section** - Showcasing portfolio projects
- **Navigation** - Links between pages
- **Responsive Design** - Mobile-friendly layout

## Pages
- **index.html** - Main portfolio page
- **weather.html** - Weather application page

## Weather App Features
- Real-time temperature data
- Wind speed information
- Multiple city selection
- API error handling
- Debug output console
- Same visual style as portfolio

## API Integration
- **Weather API**: Open-Meteo API (https://api.open-meteo.com)
- **User API**: JSONPlaceholder API (https://jsonplaceholder.typicode.com)
- Uses async/await for asynchronous operations
- Implements try/catch error handling
- Validates response.ok before processing

## How to test
### Portfolio Page (index.html)
- Click "Load Data" → fetches user data from API
- Click "Toggle Theme" → saves preference to localStorage
- Click "Weather App" link → navigates to weather page

### Weather Page (weather.html)
- Click any city button → fetches weather data
- View temperature and wind speed
- Check debug output for API logs
- Click "Back to Portfolio" → returns to main page

## Technical Details
- Clean separation between pages
- Shared CSS for consistent styling
- Dark mode support on both pages
- Mobile responsive design
- Console logging for debugging
- Proper error handling