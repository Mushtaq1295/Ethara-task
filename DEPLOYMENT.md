# Deployment Guide

This guide provides step-by-step instructions to deploy the TaskFlow application to production.

## 1. Database Deployment (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a new Cluster (the free tier `M0` is perfect for this).
3. Under **Database Access**, create a new database user with a secure password.
4. Under **Network Access**, add `0.0.0.0/0` to allow access from anywhere (or specify your backend server's IP later).
5. Click **Connect**, choose "Connect your application", and copy the connection string.
   * *Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority`*

## 2. Backend Deployment (Render / Railway)

We recommend using [Render](https://render.com) for deploying the Node.js backend.

1. Push your code to a GitHub repository.
2. Log in to Render and create a new **Web Service**.
3. Connect your GitHub repository and select the `backend` folder as the root directory (if Render supports monorepos, otherwise configure the Build Command).
4. **Configuration:**
   * **Build Command:** `npm install`
   * **Start Command:** `npm start` (Make sure your `package.json` has `"start": "node server.js"`)
5. **Environment Variables:** Add the following to Render's Environment section:
   * `NODE_ENV`: `production`
   * `MONGO_URI`: *(Your MongoDB Atlas connection string)*
   * `JWT_SECRET`: *(A random, secure string)*
6. Deploy the service and copy the generated backend URL (e.g., `https://taskflow-api.onrender.com`).

## 3. Frontend Deployment (Vercel / Netlify)

We recommend using [Vercel](https://vercel.com) for deploying the React Vite frontend.

1. **Before deploying**, update the `baseURL` in your frontend's Axios configuration.
   * Open `frontend/src/api/axios.js`
   * Change `baseURL: 'http://localhost:5000/api'` to use an environment variable or hardcode the production URL:
   * `baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`
2. Log in to Vercel and **Add New Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. **Environment Variables:**
   * Add `VITE_API_URL` and set its value to your deployed backend URL + `/api` (e.g., `https://taskflow-api.onrender.com/api`).
7. Click **Deploy**.

## 4. Final Testing

1. Once the frontend is deployed, visit the live URL provided by Vercel.
2. Sign up to create an Admin account (select "Admin" in the dropdown).
3. Test creating a project, assigning tasks, and checking the dashboard.
4. The deployment is complete! 🎉
