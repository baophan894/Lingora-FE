# Center Manager App

This project is a Center Manager application built using React, TypeScript, and Tailwind CSS. It provides a user-friendly interface for managing various aspects of a center, including course information and user management.

## Project Structure

The project is organized as follows:

```
center-manager-app
├── src
│   ├── components
│   │   ├── sidebar
│   │   │   ├── Sidebar.tsx          # Sidebar layout for the center manager
│   │   │   └── SidebarAvatarMenu.tsx # User avatar and dropdown menu
│   │   └── card
│   │       └── card-course.tsx      # Component for displaying course information
│   ├── types
│   │   └── index.ts                  # TypeScript types and interfaces
│   ├── App.tsx                       # Main application component
│   └── index.tsx                     # Entry point of the application
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── package.json                      # npm configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd center-manager-app
npm install
```

## Usage

To run the application in development mode, use the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Features

- Sidebar navigation for easy access to different sections of the application.
- User avatar with a dropdown menu for logout and other options.
- Responsive design using Tailwind CSS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.