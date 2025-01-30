import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata = {
  title: "Your Name - Creative Portfolio",
  description: "Portfolio showcasing creative work and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}