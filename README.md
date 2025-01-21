# Chatbot with AI and Friendly Mode

This project is a chatbot application that allows users to interact in two modes:
1. **Friendly Mode**: Fetches predefined responses from a database.
2. **AI Mode**: Generates responses using Google's Gemini API (Generative AI).

## Features
- Toggle between **Friendly Mode** and **AI Mode**.
- Responsive user interface.
- Seamless backend integration with Prisma for database queries.
- AI responses powered by Gemini API.
- Graceful fallback messages for unmatched queries.

---

## Technologies Used

### Frontend:
- React.js
- Axios
- CSS (responsive design with gradients)

### Backend:
- Node.js (Express)
- Prisma (PostgreSQL ORM)
- Google's Gemini API
- CORS for cross-origin requests

### Database:
- PostgreSQL

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [PostgreSQL](https://www.postgresql.org/) installed and running.
- Gemini API key.

### Steps to Run

#### 1. Clone the Repository
```bash
git clone https://github.com/your-repo-url/chatbot.git
cd chatbot
```

#### 2. Set Up Environment Variables
Create a `.env` file in the project root with the following variables:
```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

#### 3. Install Dependencies
##### For Backend:
```bash
cd backend
npm install
```
##### For Frontend:
```bash
cd frontend
npm install
```

#### 4. Set Up the Database
- Apply Prisma migrations to your PostgreSQL database:
```bash
cd backend
npx prisma migrate dev
```
#### 5. Seed the database with initial data.
```bash
node prisma/seed.js  
```

#### 6. Start the Application
##### Start Backend:
```bash
cd backend
npm start
```
##### Start Frontend:
```bash
cd frontend
npm run dev
```

#### 7. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Project Structure
```
├── backend
│   ├── server.js           # Main server file
│   ├── prisma
│   │   ├── schema.prisma   # Database schema
│   └── .env                # Environment variables
│
├── frontend
│   ├── src
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   └── public              # Static files
│
└── README.md               # Project documentation
```

---

## API Endpoints

### `/api/chat`
- **Method**: POST
- **Body**:
  - `message`: The user's message.
  - `use_ai`: Boolean value to indicate mode.
- **Response**:
  - `reply`: The chatbot's response.

---

## Future Enhancements
- Integrate more advanced AI models.
- Add user authentication.
- Save chat history in the database.
- Support for multiple languages.

---

## Contributing
Feel free to contribute to this project by creating pull requests or raising issues.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

