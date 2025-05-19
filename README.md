# CodeLeap Network - Fullstack Challenge

A simple fullstack CRUD application built with Django (backend) and React + Vite (frontend).

## Requirements

- Python 3.10+ and pip
- Node.js (18+) and npm

## Setup

1. Clone the repository

```bash
git clone https://github.com/lucaslomeu/codeleap.git
cd codeleap
```

2. Backend (Django)

```bash
cd backend
python -m venv venv
# Activate venv:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
# Or, if requirements.txt is missing:
pip install django djangorestframework django-cors-headers

python manage.py migrate
python manage.py runserver
```

> The backend runs at http://localhost:8000/careers/

2. Frontend (React + Vite)
   > Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> The frontend runs at http://localhost:5173 (or as shown in your terminal).

3. Environment
   In `/frontend`, create a `.env` file:

```bash
VITE_API_URL=http://localhost:8000/careers/
```

## Usage

- Open http://localhost:5173
- Sign in with any username to access the feed.
- Create, edit, and delete posts. Only your posts can be edited/deleted.

## Project Structure

```bash
backend/    # Django REST API
frontend/   # React (Vite) client
```
