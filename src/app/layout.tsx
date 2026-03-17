import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Obi James Leadership Scorecard | How Inclusive Is Your Leadership Really?',
  description: 'Measure your leadership impact with the Obi James Leadership Scorecard. A diagnostic built to help senior leaders identify hidden habits and foster inclusive, high-performing teams.',
  keywords: ['leadership', 'inclusive leadership', 'scorecard', 'professional development', 'Obi James', 'team performance', 'leadership diagnostic'],
  authors: [{ name: 'Obi James', url: 'https://obijames.com' }],
  creator: 'Obi James',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://scorecard.obijames.com',
    title: 'Obi James Leadership Scorecard',
    description: 'How Inclusive Is Your Leadership Really? Take the 5-minute diagnostic.',
    siteName: 'Obi James Leadership',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Obi James Leadership Scorecard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obi James Leadership Scorecard',
    description: 'Measure your leadership impact across 5 core dimensions.',
    images: ['/hero.png'],
    creator: '@obijames',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
