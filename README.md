# Term Dictionary

**Term Dictionary** is an application for storing, searching, and displaying terms. It is designed for students, teachers, and anyone who wants a convenient reference for various terms and definitions.

## Features

- Store and quickly search terms
- Organize terms by categories for easier learning
- Support multiple views: list or grid
- Sort terms by name, popularity, date, or rating
- Multi-language support using i18next
- Modern interface built with React and Electron

## Technologies

- Frontend: React, Redux Toolkit, React Router, i18next
- Desktop: Electron
- Styling: CSS Modules
- Testing: React Testing Library
- Utilities: clsx, web-vitals

## Installation and Running

1. Clone the repository
   git clone https://github.com/yourusername/term-dictionary.git
   cd term-dictionary

2. Install dependencies
   npm install

3. Run the application

   - For browser development: npm start
   - To run Electron: npm run electron
   - For simultaneous development and Electron: npm run electron-dev

4. Build the project for production
   npm run build

## Project Structure

- src/ — source code
- src/components/ — React components
- src/redux/ — Redux slices and store
- src/assets/ — images and styles
- public/ — static files
- main.js — main Electron file

## Usage

Once the application is running, you can:

- Search for terms using the search bar
- Sort and filter terms by categories
- View terms in list or grid format
- Add new terms (if the feature is extended)

## Contributing

This project is open-source. You can contribute improvements or fixes:

1. Fork the repository
2. Create a new branch: git checkout -b feature/your-feature-name
3. Commit your changes: git commit -m "Add new feature"
4. Push the branch to your fork: git push origin feature/your-feature-name
5. Create a Pull Request to the main repository

## License

This project is licensed under the **MIT License**.
