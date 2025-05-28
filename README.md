# E-Commerce Platform

A modern e-commerce platform built with React and Firebase, featuring a responsive design and comprehensive admin dashboard.

## Features

### User Features
- User authentication (Signup/Login)
- Product browsing and searching
- Shopping cart functionality
- Order placement and tracking
- User profile management
- Wishlist functionality

### Admin Features
- Product management (Add/Edit/Delete)
- Order management
- User management
- Sales analytics
- Inventory tracking

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Material Tailwind
  - React Router
  - React Context API

- **Backend:**
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[AyushFanasiya]/e-commerce-platform.git
cd e-commerce-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

The application is deployed on Vercel. You can access the live version at:
[E-Commerce Platform](https://e-commerce-platform-ayushfanasiya.vercel.app)

To deploy your own version:
1. Fork this repository
2. Create a new project on Vercel
3. Import your forked repository
4. Add the required environment variables in Vercel project settings
5. Deploy!

## Project Structure

```
src/
├── components/
│   ├── admin/         # Admin components
│   ├── layout/        # Layout components
│   ├── pages/         # Page components
│   └── shared/        # Shared components
├── context/           # Context providers
├── firebase/          # Firebase configuration
├── protectedRoute/    # Route protection
└── redux/            # Redux store and slices
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All sensitive information is stored in environment variables
- Firebase security rules are implemented
- Protected routes for admin and user sections
- Secure authentication flow

## Future Improvements

- [ ] Implement payment gateway integration
- [ ] Add email notifications
- [ ] Implement real-time chat support
- [ ] Add product reviews and ratings
- [ ] Implement advanced search and filtering
- [ ] Add multi-language support

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://material-tailwind.com/)
