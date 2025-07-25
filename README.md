# ✈️ Wonderlust - Explore & List Unique Stays

**Wonderlust** is a **Full-Stack MERN-inspired web application** (built with Node.js, Express.js, MongoDB, EJS, and Bootstrap) inspired by Airbnb.  
It lets users **discover, list, and manage vacation stays** around the world.  
With features like secure authentication, image uploads, category-based filtering, and map integration, Wonderlust offers a **smooth and intuitive experience** for travelers and hosts alike.

---

## 🌟 Live Demo

🔗 **View Deployed Project on Render**  
*https://wonderlust-ffz4.onrender.com*

---

## 🎯 Objectives & Scope

**Objectives:**
- List & discover unique stays
- User authentication & authorization
- Filter by category & search listings
- Upload & manage images
- Show listing locations on a map

**Scope:**
- Full CRUD for listings & reviews
- Secure login/logout and role-based permissions
- Real-time image hosting with Cloudinary
- Geocoding and location preview with Mapbox
- Flash messages & form validation for better UX

---

## ✨ Key Features

- 🔐 Passport.js based authentication (signup/login/logout)
- 🏠 CRUD: create, read, update, delete listings & reviews
- 🗺️ Mapbox integration for location previews
- 📸 Cloudinary image storage & multi-image upload
- 🧭 Search & filter listings by category or title/location
- ✅ Joi validation for secure data entry
- ⚡ Flash messages for user-friendly feedback
- 📱 Responsive UI built with Bootstrap & custom CSS

---

## 🛠 Tech Stack

| Frontend      | Backend         | Storage & APIs        | Database |
|--------------|-----------------|---------------------|----------|
| HTML, CSS, EJS | Node.js, Express | Cloudinary, Mapbox  | MongoDB  |
| Bootstrap     | Passport.js     |                     | Mongoose |

---

## ⚙️ Setup Instructions

### 📦 Backend Setup

1️. Clone the repository & navigate:
```bash
git clone https://github.com/yourusername/wonderlust.git
cd wonderlust
```

2️. Install dependencies:
```bash
npm install
```

3️. Create a .env file:
```ini
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
MAPBOX_TOKEN=xxxx
DB_URL=your_mongodb_connection
SECRET=your_session_secret
```

4️. Start the server:
```bash
nodemon app.js
```

### 🌐 Visit in browser:
http://localhost:8080

---

### 🛡 Security & Validation
- Session-based authentication with Passport.js
- Joi validation: listing fields, reviews, and user data
- Sensitive keys in .env and excluded via .gitignore
- Input sanitation & centralized error handling middleware

---

### 📊 What I Learned & Built
- End-to-end authentication flow
- Using Mapbox to geocode and display maps
- Handling file uploads securely with Multer + Cloudinary
- RESTful API design & modular controllers
- Real-world full-stack deployment process
- Designing clean, responsive UI with Bootstrap

---

### 💡 Challenges Faced
Challenge	Solution
Flash messages not showing	Used middleware res.locals to share flash messages
Cloudinary deletion of old images	Tracked filename & deleted using Cloudinary API
Filter & search overlap	Handled separately via dedicated controller & route logic
Validation breaking app	Added centralized Joi error handling middleware
Session issues after login/logout	Ensured proper Passport serialize & deserialize logic

---

### 💬 FAQs & Interview Questions
Q: Why did you choose Passport.js over JWT?
✅ Passport with sessions fits classic web apps where EJS renders server-side pages; JWT is better for SPAs or APIs.

Q: How do you prevent invalid data?
✅ Used Joi schema validation and backend sanitation.

Q: Why Cloudinary?
✅ Handles secure file hosting, image transformations, and easy URL management.

Q: How did you handle categories & search?
✅ Implemented /search and /filter routes; used regex & query params for flexible filtering.

---

### 🙌 Contact & Collaboration
Santhosh Korra
📧 santhoshnaik218@gmail.com
🌐 LinkedIn

---

### 🤝 Open to:
🌱 Contributing to open-source
✏️ Learning from mentors
💼 Internships & collaborations
🚀 Building real-world full-stack products
