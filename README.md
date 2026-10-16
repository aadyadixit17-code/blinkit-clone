# ⚡ Blinkit Clone (Full-Stack Quick Commerce App)

A feature-rich quick-commerce web application inspired by Blinkit, developed with **React**, **Express.js**, and **MongoDB Atlas**. It features dynamic product browsing, real-time cart state management, secure email/JWT authentication, live order tracking, and a secure payment gateway workflow.

---
## 🚀 Live Demo
**Deployed App:** [https://blinkit-clone-1-iziw.onrender.com/] (https://blinkit-clone-1-iziw.onrender.com/)

## 🚀 Implemented Features

- **Dynamic Product Catalog & Search:** Fetch and filter products dynamically from a MongoDB database with real-time text searching.
- **Smart Cart Management:** Add, remove, update quantities, calculate totals instantly using React Context API, and automatically clear inventory upon user logout.
- **Persistent JWT Authentication:** Secure email registration and login backed by MongoDB user persistence, password hashing via `bcryptjs`, JWT token generation, and `localStorage` session preservation across refreshes.
- **Order History & Management:** Dedicated `/orders` page to view past orders, transaction details, and item breakdowns.
- **Live Delivery Tracking:** Interactive order progress view and estimated 10-minute delivery countdown timer UI.
- **Sandbox Payment Flow:** Custom-styled Razorpay sandbox payment modal overlay that transitions seamlessly into an order confirmation success screen.
- **Cloud Persistence & Deployment:** RESTful backend endpoints built with Express.js connected securely to a MongoDB Atlas cluster, with support for a clean monolithic build deployment.
- **Thorough API Testing:** All backend API endpoints have been rigorously tested using **Postman**.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Context API, Axios, Modern CSS
- **Backend:** Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), bcryptjs
- **Database:** MongoDB Atlas (Cloud NoSQL Database)
- **Testing & Tools:** Postman (API Testing), Razorpay Sandbox (Payments)

---

## 📸 Project Showcase

Below is a visual breakdown of the application frontend, payment simulation, API testing, and cloud database storage.

### Application Interface & Payment Workflow
| Dashboard / Storefront | Payment Gateway & Success Screen |
| :---: | :---: |
| <img src="dashboard.png" width="400" alt="Dashboard View" /> | <img src="payment.png" width="400" alt="Payment & Success Flow" /> |
| *Browse categories, search items, and manage cart inventories.* | *Razorpay sandbox checkout simulation leading to instant confirmation.* |

### Backend API Testing & Cloud Database
| Postman API Validation | MongoDB Atlas Database Cluster |
| :---: | :---: |
| <img src="postman.jpeg" width="400" alt="Postman API Testing" /> | <img src="mongo db.jpeg" width="400" alt="MongoDB Atlas Storage" /> |
| *Rigorously tested REST endpoints for products and orders.* | *Persistent JSON collections securely hosted in MongoDB Atlas.* |

---

## ⚙️ Quick Start & Installation

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/your-username/blinkit-clone.git](https://github.com/your-username/blinkit-clone.git)
   cd blinkit-clone
   ```
   
2. **Configure Environment Variables:**
Create a .env file inside your server/ directory:
```bash
Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

3. **Install Dependencies & Run Backend:**
```bash
Bash
cd server
npm install
node server.js
``` 

4. **Install Dependencies & Run Frontend:**
```bash
Bash
cd client
npm install
npm start
``` 

## 🛡️ Security Note
Sensitive credentials and local environment files (.env) are excluded from version control via .gitignore to ensure repository safety.