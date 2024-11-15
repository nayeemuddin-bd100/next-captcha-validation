# Next.js CAPTCHA Validation Demo

A modern, user-friendly CAPTCHA implementation using Next.js 13+, showcasing both text-based and image-based verification methods.

## 🌟 Features

-   **Dual Verification Methods**

    -   Text-based SVG CAPTCHA
    -   Image selection verification using Unsplash images
    -   Easy switching between methods

-   **Modern Tech Stack**

    -   Next.js 13+ with App Router
    -   TypeScript for type safety
    -   Tailwind CSS for styling
    -   Server Actions and API Routes

-   **User Experience**
    -   Responsive design
    -   Clear visual feedback
    -   Accessible interface
    -   Mobile-friendly

## 🚀 Quick Start

1. Clone the repository:

    ```bash
    git clone https://github.com/nayeemuddin-bd100/next-captcha-validation.git
    cd next-captcha-validation
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   Create a `.env.local` file with:

    ```env
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### Unsplash API

1. Create an account at [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your access key to `.env.local`

### CAPTCHA Settings

-   Text CAPTCHA options can be modified in `/src/app/api/captcha/svg/route.ts`
-   Image CAPTCHA categories can be adjusted in `/src/components/ImageCaptcha.tsx`

## 📱 Demo Credentials

-   Email: demo@example.com
-   Password: demo123

## 🛠️ Built With

-   [Next.js](https://nextjs.org/) - React Framework
-   [TypeScript](https://www.typescriptlang.org/) - Type Safety
-   [Tailwind CSS](https://tailwindcss.com/) - Styling
-   [svg-captcha](https://github.com/produck/svg-captcha) - Text CAPTCHA Generation
-   [Unsplash API](https://unsplash.com/developers) - Image CAPTCHA
