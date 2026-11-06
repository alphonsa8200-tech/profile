import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { ToastContainer } from '../components/ToastContainer';

export const metadata: Metadata = {
  title: 'AURA STUDIO — Minimalist Design Essentials',
  description:
    'Curated audio, desk accessories, and living objects engineered with pure geometries, quiet aesthetics, and enduring tactile performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafafa] text-zinc-900 antialiased font-sans selection:bg-zinc-900 selection:text-white">
        <CartProvider>
          {children}
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
