'use client';

import "./globals.css";
import { AuthProvider } from "../../hooks/useAuth";
import { ToastProvider } from "../../components/ui/toast";
import ErrorBoundary from "../../components/ui/error-boundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">
        <ErrorBoundary>
          <ToastProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}