# Animal Identifier

Animal Identifier is a web application that allows users to upload images of animals and receive identification results using AI technology.

## Features

1. **Image Upload**: Users can upload images of animals in JPEG or PNG format.

2. **Animal Recognition**: The application uses AI to identify the animal in the uploaded image.

3. **Result Display**: After processing, the app shows:
   - The identified animal's name
   - A description of the animal
   - A warning if the animal is considered dangerous

4. **User-Friendly Interface**: The application provides a simple and intuitive interface for easy use.

5. **Real-time Feedback**: A loading animation is displayed during the recognition process to keep users informed.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

Make sure you have run the backend server first. Please refer to the [backend README](../backend/README.md) for more details.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
