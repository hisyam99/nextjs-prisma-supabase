import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Wrapper, WrapperWithQuery } from "@/components/wrapper";
import { createMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: {
    template: "%s | Better Auth",
    default: "Better Auth",
  },
  description: "The most comprehensive authentication library for typescript",
  metadataBase: new URL("https://demo.better-auth.com"),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Wrapper>
            <WrapperWithQuery>{children}</WrapperWithQuery>
          </Wrapper>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
