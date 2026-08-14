# VYORA ✦ Reel Vibe Movie Recommendation & Discovery Engine

> *"What are we feeling today? Let VYORA figure it out. A movie culture magazine that learned how to read your vibe."*

[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/AI--Engine-Python-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

---

## 🎬 Overview

**VYORA** is a next-generation film discovery platform and cultural recommendation engine built for cinephiles. Moving beyond generic genre grids and mechanical algorithms, VYORA decodes film DNA using emotional mood vectors, sensory dimensions, and collaborative taste networks.

---

## 🌟 Key Features

### 1. 🎬 3D Opening Animation (5s Intro)
- **60fps GPU-Accelerated Entrance**: Features 3D metallic typography for `VYORA ✦`, cosmic light sweeps, and the signature white mascot bouncing in perspective before fading into the application.

### 2. 🔮 Curated Mood Engine
- Select from distinct emotional states (*Cerebral Mind-Benders*, *Cozy Melancholy*, *High-Octane Adrenaline*, *Surreal Fever Dreams*) to instantly generate tailored film recommendations with vector similarity scores.

### 3. 🎛️ Vibe Mixer Sliders
- Fine-tune multi-dimensional sensory sliders (*Pacing*, *Visual Atmosphere*, *Emotional Intensity*, *Intellectual Depth*) to create custom recommendation mixes.

### 4. 📚 Archival Vibe Library
- Explore an extensive film taxonomy categorized by major genres and sub-vibe micro-categories with search and sorting controls.

### 5. 👥 Vibe Circle Taste Network
- Connect with friends and cinephiles to trade film recommendations, compare taste vectors, and see collaborative matches.

### 6. 🌌 My Profile / Personal Cosmos
- Track your cinema journey with watched history, watchlist, total hours explored, average critical benchmarks, and dynamic genre affinity charts.

### 7. 🌗 Dual Theme Support (Obsidian Plum & Warm Moon)
- Switch seamlessly between a rich dark Obsidian Plum multiverse theme and an editorial Warm Moon day mode.

---

## 🛠️ Architecture & Tech Stack

### **Frontend**
- **Framework**: React 19 + React Router 7
- **Build Tool**: Vite 8
- **Styling**: Modern Vanilla CSS Design System with GPU Hardware Acceleration (`transform: translate3d`)
- **Icons**: Lucide React Icons

### **Backend & AI Engine**
- **Framework**: FastAPI (Python)
- **ASGI Server**: Uvicorn
- **Database**: SQLite (`vyora.db`)
- **Machine Learning**: Cosine Vector Similarity Matching & Multi-Dimensional Mood Embeddings

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.9 or higher

### 1. Repository Setup
```bash
git clone https://github.com/diya-1720/Recommendation-System.git
cd Recommendation-System
```

### 2. Backend Setup & Launch
```bash
# Activate Virtual Environment (Windows)
.\venv\Scripts\activate

# Launch FastAPI Server on port 8000
python -m uvicorn backend.app.main:app --reload --port 8000
```
> Backend API docs will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Frontend Setup & Launch
```bash
# Install NPM dependencies
npm install

# Start Vite Development Server
npm run dev
```
> Frontend application will be live at [http://localhost:5173/](http://localhost:5173/)

---

## 👥 VYORA Studio Creators & Credits

Meet the team behind the code, caffeine, and cinematic discovery engine:

| Creator | Role & Contribution |
| :--- | :--- |
| **Diya Singh** | **Lead Frontend Designer & Product Specialist**<br>✦ Architectural UI/UX design, responsive layouts, 2D mascot sprite system, and collaborative contributor to the **AI/ML Recommendation Engine**. |
| **Yatharth Raut** | **Lead Backend Engineer & AI Developer**<br>✦ FastAPI backend architecture, database models, API endpoint design, and collaborative contributor to the **AI/ML Recommendation Engine**. |

*Both Diya Singh and Yatharth Raut jointly architected and contributed to building the **AI/ML Vector Recommendation Core**.*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p center align="center">
  <b>VYORA ✦ Find Your Vibe. Built with code, curiosity, caffeine, and cinephile passion.</b>
</p>
