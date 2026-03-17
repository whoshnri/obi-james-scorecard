import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Take the Leadership Scorecard | Obi James',
  description: 'Begin your 5-minute leadership diagnostic to uncover your impact across 5 core dimensions.',
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
