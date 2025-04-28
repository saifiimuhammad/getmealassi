# GetMeALassi 🥤

<p align="center">
  <img src="https://raw.githubusercontent.com/saifiimuhammad/getmealassi/master/public/logo.png" alt="GetMeALassi Logo" width="250"/>
</p>

**A Crowdfunding Platform (Patreon Clone)**  
Built with Next.js, Stripe, TypeScript — empowering creators to earn from their supporters.

---

## ✨ Features

- **Creator Accounts**:  
  Users can create and update their profiles, including uploading an **avatar** and **banner**.

- **Authentication**:  
  Login or register seamlessly using **GitHub OAuth**.

- **Crowdfunding Payments**:  
  Supporters can make payments directly to creators via **Stripe** integration.

- **Discover Creators**:  
  Search and explore talented creators across the platform.

---

## 🛠️ Tech Stack

- **Next.js** (Frontend & Backend)
- **TypeScript**
- **Stripe API** (Payments)
- **GitHub OAuth** (Authentication)
- **Cloudinary** (for avatars and banners)

---

## 🚀 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/saifiimuhammad/getmealassi.git
   ```

2. **Install dependencies**

   ```bash
   cd getmealassi
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file and add:

   ```bash
   NEXTAUTH_URL=http://localhost:3000
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   MONGODB_URI=your_database_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📸 Demo

https://github.com/user-attachments/assets/e005f4cd-6865-4b66-964b-90965ded7232



---

## 🧠 Future Plans

- Add **subscription models** (monthly donations)
- Creator **tiers** and **exclusive content**
- **Admin dashboard** for reporting and analytics
- **SEO optimization** for creator pages

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by **Muhammad Saif**  
> Let's empower creators together!

---
