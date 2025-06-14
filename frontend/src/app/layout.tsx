"use client";
import { Outfit } from 'next/font/google';
import './globals.css';
import store from '@/lib/store';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/graphql/apolloClient';
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
