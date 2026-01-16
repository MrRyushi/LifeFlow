import { ModeToggle } from "@/components/ModeToggle";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={``}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
