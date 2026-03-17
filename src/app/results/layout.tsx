import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Leadership Results | Obi James',
  description: 'View your personalized leadership profile and recommended growth actions.',
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
