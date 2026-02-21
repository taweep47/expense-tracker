# 💰 Expense Tracker App

A multi-user Expense Tracker built with **React + Tailwind CSS + JSON Server**.  
This project demonstrates CRUD operations, authentication, soft delete logic, and analytics dashboard features.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- Multi-user support
- User-based expense filtering

### 💵 Expense Management (CRUD)
- Create expense
- Edit expense
- Soft delete (using `deletedAt`)
- Optimistic UI updates
- Timestamp support (`createdAt`, `updatedAt`)

### 📊 Dashboard Analytics
- Total expenses
- Current month expenses
- Category count
- Charts visualization
- Monthly comparison logic

### 🧠 Advanced Logic
- Soft delete with frontend filtering
- Multi-user data isolation
- Clean custom hook (`useExpenses`)
- Timestamp-based tracking

---

## 🛠 Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **HTTP Client**: Axios
- **Backend (Mock API)**: json-server
- **Version Control**: Git + GitHub

---

## 📂 Project Structure


src/
│
├── auth/
├── hooks/
│ └── useExpenses.js
├── features/
│ └── expenses/
├── components/
│ └── ui/
└── pages/


---

## 🧪 Local Setup

### 1️⃣ Clone repository


git clone https://github.com/taweep47/expense-tracker.git

cd expense-tracker


### 2️⃣ Install dependencies


npm install


### 3️⃣ Run json-server


npx json-server --watch db.json --port 3001


### 4️⃣ Run frontend


npm run dev


---

## 📌 Soft Delete Implementation

Instead of permanently deleting data, expenses are marked with:


deletedAt: timestamp


Frontend filters out deleted items to simulate production-level data lifecycle management.

---

## 📈 Future Improvements

- Undo delete feature
- Trash page
- Sorting & pagination
- Backend migration (Node + Express + Database)
- JWT authentication

---

## 👨‍💻 Author

Developed by **Nam_ WaNZZ**

---

## ⭐ Why This Project?

This project was built to demonstrate:
- Clean architecture
- Custom hooks
- Multi-user logic
- Real-world CRUD patterns
- Production-like soft delete handling
