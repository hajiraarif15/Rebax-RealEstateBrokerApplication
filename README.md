# RebaX - Real Estate Broker Application 🏠

A modern, full-stack real estate platform built with **Spring Boot** and **React** that connects property brokers with potential buyers through an intuitive interface and real-time messaging system.

![RebaX Platform](https://img.shields.io/badge/Platform-Real%20Estate-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Java](https://img.shields.io/badge/Java-17+-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### 🏢 **For Brokers**
- **Dashboard Analytics** - Comprehensive overview with interactive charts and statistics
- **Property Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Listing Management** - View and manage all property listings
- **Real-time Chat** - Communicate directly with interested buyers
- **Inquiry Management** - Track and respond to buyer inquiries
- **PDF Brochures** - Generate downloadable property brochures

### 🏠 **For Buyers**
- **Property Search** - Advanced filtering by location, price, type, and purpose
- **Property Details** - Detailed property information with image galleries
- **Google Maps Integration** - Interactive location viewing
- **Favorites System** - Save and manage favorite properties
- **Direct Communication** - Chat with property brokers
- **Inquiry System** - Send property inquiries and questions

### 🔧 **Technical Features**
- **JWT Authentication** - Secure user authentication and authorization
- **Role-based Access Control** - Separate interfaces for brokers and buyers
- **Responsive Design** - Mobile-friendly interface with dark/light mode
- **Real-time Messaging** - Continuous chat system between users
- **File Persistence** - H2 database with file-based storage
- **RESTful APIs** - Clean and well-documented backend APIs

## 🛠️ Technology Stack

### **Backend**
- **Framework:** Spring Boot 3.3.4
- **Language:** Java 17+
- **Database:** H2 Database (File-based)
- **Security:** Spring Security with JWT
- **ORM:** JPA/Hibernate
- **Build Tool:** Maven

### **Frontend**
- **Framework:** React 18.2.0
- **Build Tool:** Vite
- **Styling:** TailwindCSS + DaisyUI
- **Icons:** Heroicons React
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### **Additional Libraries**
- **PDF Generation:** jsPDF + html2canvas
- **Animations:** React CountUp + Framer Motion
- **Notifications:** React Hot Toast
- **Image Handling:** Swiper.js

## 🚀 Getting Started

### **Prerequisites**
- Java 17 or higher
- Node.js 16+ and npm
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-username/rebax-real-estate.git
cd rebax-real-estate
```

2. **Backend Setup**
```bash
cd rebax-backend
./mvnw clean install
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`

3. **Frontend Setup**
```bash
cd rebax-frontend
npm install
npm run dev
```
The frontend development server will start on `http://localhost:5173`

### **Default Login Credentials**

The application includes a data seeder that creates default users:

**Broker Account:**
- Email: `broker@rebax.com`
- Password: `password`

**Buyer Account:**
- Email: `buyer@rebax.com`
- Password: `password`

## 📁 Project Structure

```
rebax-real-estate/
├── rebax-backend/              # Spring Boot Backend
│   ├── src/main/java/com/rebax/rebaxbackend/
│   │   ├── config/            # Security & CORS configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA Entities
│   │   ├── enums/            # Enum definitions
│   │   ├── repository/       # Data repositories
│   │   ├── service/          # Business logic layer
│   │   └── startup/          # Application initialization
│   └── src/main/resources/
│       └── application.properties
├── rebax-frontend/            # React Frontend
│   ├── src/
│   │   ├── api/              # API configuration
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page components
│   │   └── assets/           # Static assets
│   ├── public/               # Public assets
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Properties**
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/{id}` - Get property by ID
- `POST /api/properties` - Create new property (Broker only)
- `PUT /api/properties/{id}` - Update property (Broker only)
- `DELETE /api/properties/{id}` - Delete property (Broker only)
- `GET /api/properties/my` - Get broker's properties

### **Favorites**
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites/{propertyId}` - Add to favorites
- `DELETE /api/favorites/{propertyId}` - Remove from favorites

### **Inquiries**
- `GET /api/inquiries` - Get user inquiries
- `POST /api/inquiries` - Send inquiry
- `PUT /api/inquiries/{id}/read` - Mark as read

### **Chat**
- `GET /api/chat/inquiry/{id}` - Get chat history
- `POST /api/chat/send` - Send message

## 🌐 Features in Detail

### **Property Management**
- Create detailed property listings with multiple images
- Edit existing properties with real-time updates
- Delete properties with confirmation dialogs
- Advanced search and filtering capabilities

### **Communication System**
- Real-time chat between brokers and buyers
- Inquiry system for initial property interest
- Message history and read status tracking
- Notification system for new messages

### **Dashboard Analytics**
- Property statistics with interactive charts
- Recent activities and quick actions
- Performance metrics and insights
- Responsive design for all devices

### **User Experience**
- Modern, intuitive interface design
- Dark/Light mode toggle
- Mobile-responsive layouts
- Loading states and error handling
- Toast notifications for user feedback

## 🚧 Development

### **Running in Development Mode**

**Backend (with auto-restart):**
```bash
cd rebax-backend
./mvnw spring-boot:run
```

**Frontend (with hot reload):**
```bash
cd rebax-frontend
npm run dev
```

### **Building for Production**

**Backend:**
```bash
cd rebax-backend
./mvnw clean package
java -jar target/rebax-backend-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd rebax-frontend
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙋‍♂️ Support

If you have any questions or need help with setup, please open an issue or contact:

- **Email:** hajiraarif24@gmail.com
- **GitHub Issues:** [Create an Issue](https://github.com/your-username/rebax-real-estate/issues)

**Built with ❤️ by Hajira Arif**

*RebaX - Connecting Properties with People*
