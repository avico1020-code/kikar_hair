# MyCity (העיר שלי) - React Native Expo

A mobile app for local city social networking in Hebrew with RTL support. Built with React Native and Expo for easy testing with Expo Go.

## Features

### 🏠 Home Screen
- Scrolling ticker with municipal updates
- Four main category cards:
  - 🏢 Businesses (עסקים)
  - 🛍️ Products (מוצרים)
  - 🔁 Second-Hand (יד שנייה)
  - 🎉 Events (אירועים)
- Preview of latest posts from each category

### 🏢 Businesses
- Search and filter by business type
- Grid view of local businesses
- Detailed business pages with:
  - Contact information (phone, website)
  - Interactive map with location
  - Social media links (Facebook, Instagram)
  - Business description

### 🛍️ Products
- Social feed of business promotions
- Search and filter functionality
- Like and comment on posts
- Direct link to business profiles
- Time-based post display

### 🔁 Second-Hand Marketplace
- Grid view of items for sale
- Advanced filtering:
  - Category selection
  - Condition filter
  - Price range
- Item detail pages with:
  - Multiple image support
  - Full description
  - Seller contact options (call/WhatsApp)

### 🎉 Events Calendar
- Monthly calendar view with event indicators
- List of upcoming events
- Event detail pages with:
  - Date, time, and location
  - Ticket price information
  - External ticket purchase links

## Design
- **Background Color:** Cream (#FFF8E7)
- **Button Color:** Beige (#F5DEB3)
- **Text Color:** Black
- **Layout:** Right-to-Left (RTL)
- **Language:** Hebrew
- **UI Style:** Rounded corners, clean and modern

## Installation & Running with Expo Go

### Prerequisites
- Node.js (14 or higher)
- npm or yarn
- Expo Go app on your phone:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

or

```bash
npx expo start
```

### Step 3: Open in Expo Go

After running `npm start`, you'll see a QR code in your terminal.

**On iOS:**
1. Open the Camera app
2. Point it at the QR code
3. Tap the notification to open in Expo Go

**On Android:**
1. Open the Expo Go app
2. Tap "Scan QR Code"
3. Scan the QR code from your terminal

The app will load on your phone in a few seconds!

## Project Structure

```
src/
├── navigation/
│   └── AppNavigator.js          # Navigation configuration
├── screens/
│   ├── HomeScreen.js             # Main home screen
│   ├── BusinessesScreen.js       # Businesses list
│   ├── BusinessDetailScreen.js   # Business details
│   ├── ProductsScreen.js         # Products feed
│   ├── SecondHandScreen.js       # Second-hand marketplace
│   ├── SecondHandDetailScreen.js # Item details
│   ├── EventsScreen.js           # Events calendar
│   └── EventDetailScreen.js      # Event details
├── components/
│   ├── ScrollingTicker.js        # Ticker component
│   └── CategoryCard.js           # Category card component
├── constants/
│   └── theme.js                  # Colors, spacing, fonts
└── data/
    └── mockData.js               # Sample data
```

## Features Implementation

### RTL Support
- Automatic RTL layout for Hebrew text
- Proper text alignment and spacing
- Mirror-reversed navigation

### Navigation
- Stack navigation for all screens
- Proper params passing between screens
- Custom styling for headers

### Interactions
- Search functionality in all categories
- Filter chips for categories
- Like button with state management
- Modal filters for second-hand items
- Calendar date selection
- External links (phone, WhatsApp, maps, websites)

## Development Commands

```bash
# Start development server
npm start

# Start with clearing cache
npm start --clear

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Troubleshooting

**Can't scan QR code?**
- Make sure your phone and computer are on the same WiFi network
- Try using the "Tunnel" connection type in the Expo dev tools

**App not loading?**
- Clear the Expo cache: `npm start --clear`
- Restart the Expo Go app
- Check your internet connection

**RTL not working?**
- Restart the Expo Go app
- The RTL layout is forced in the navigation configuration

## Future Enhancements
- User authentication (Supabase)
- Real-time database integration
- Push notifications for events
- Image upload functionality
- User profiles and favorites
- In-app messaging between buyers and sellers

## Technologies Used
- React Native
- Expo SDK 50
- React Navigation 6
- React Native Maps
- Expo Vector Icons

---

Made with ❤️ for your local community
