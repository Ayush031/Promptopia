import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptompia",
  description:
    "Promptompia is a collection of prompts for writing and drawing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider >
          <div className="main"></div>
          <div className="gradient"></div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
