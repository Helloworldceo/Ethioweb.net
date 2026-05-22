import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI for Beginners | Let's Learn AI Together",
  description: "A complete AI course for the Ethiopian community. AIን አብረን እንማር",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-ethiopia-dark">
        {children}
      </body>
    </html>
  )
}
