# React Native News app

NewsApp is a React Native application that provides users with the latest news headlines. It allows users to toggle between dark and light themes and fetches news headlines from an external API. Additionally, users can perform various actions such as pinning, unpinning, deleting headlines by swiping gestures, viewing details of news articles, and sharing news headlines.

## Features

- Dark/Light Theme: Users can toggle between dark and light themes to customize their reading experience.
- Fetch Headlines: Users can fetch the latest news headlines by tapping the "refresh icon" button on the header or it will get updated every 10 seconds
- Splash Screen: The application displays a splash screen while loading initial data.
- Asynchronous Operations: Asynchronous operations, such as fetching headlines and loading theme mode from storage, are handled efficiently using Redux Toolkit and Redux Thunk middleware.
- Gesture Actions: Users can perform actions like pinning, unpinning, and deleting headlines by swiping gestures.
- View Details: Users can view detailed information about news articles by tapping on them.
- Share News Headlines: Users can share news headlines with others via various sharing options.

## Installation

    1. Clone this repository to your local machine.
    2. Navigate to the project directory.
    3. Run npm install to install dependencies.
    4. Run pod install in ios directory to install cocoapods.
    5. Add Your News API Key to the .env file
    6. Run npx react-native run-android to start the Android app.
    7. Run npx react-native run-ios to start the iOS app.

## Tech Stack

- React Native
- TypeScript
- React navigation
- Redux toolkit
- NewsApi
