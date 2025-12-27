import { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body style={{ background: "#0b0b0b", color: "#fff", padding: 24 }}>
        <div style={{ padding: 20, borderRadius: 8, background: "#111" }}>
          TEST LAYOUT — UI SHOULD SHOW
        </div>
        {children}
      </body>
    </html>
  );
}
