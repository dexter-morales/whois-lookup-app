# 🧠 WHOIS Lookup App

A full-stack WHOIS domain lookup tool built with:

- **Backend**: Python (Flask)
- **Frontend**: React + Vite + Tailwind CSS
- **API**: WHOIS JSON or similar service

Users can search domain WHOIS information and view either **domain details** or **contact information** in a modern, responsive UI.

## 🧩 Features

- Domain & contact WHOIS lookup
- UI switch between "Domain" and "Contact" info
- Skeletal loading
- Date formatting and hostname truncation
- Toaster notification for success and error feedback

---

## 📁 Project Structure

whois-lookup-app/

├── backend/ # Python Flask backend

│ ├── app.py

│ └── requirements.txt

├── frontend/ # React + Vite + Tailwind frontend

│ ├── src/

│ ├── index.html

│ └── package.json

└── README.md # Setup, run, and deploy instructions

---

## ⚙️ Requirements

### Backend

- Python 3.10+
- pip

### Frontend

- Node.js 18+
- pnpm (or npm/yarn)

---

## 🧪 Setup Instructions

### ✅ 1. Clone the Repository

```bash
git https://github.com/dexter-morales/whois-lookup-app.git
cd whois-lookup-app
```

## 🐍 Backend Setup (Python)

### 📦 Install Dependencies

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 🌐 Set Environment Variables (Backend)

```bash
echo WHOIS_API_KEY=your_api_key_here > .env
```

📌 Note: Set the `WHOIS_API_KEY` in your `.env` file. You can [get it for free here](https://user.whoisxmlapi.com/products).

### 🚀 Run Backend Server

```bash
python app.py
```

## 💻 Frontend Setup (React + Vite + Tailwind)

```bash
cd frontend
pnpm install
```

### 🌐 Set Environment Variables (Frontend)

```bash
echo VITE_API_URL=http://localhost:5000 > .env
```

### 🚀 Start Dev Server

```bash
pnpm run dev
```
