import { SocketProvider } from '@/context/SocketContext';
import '@/app/globals.css';

export const metadata = {
  title: 'Worknoon Chat Interface',
  description: 'Enterprise structural chat platform workflows',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-50 dark:bg-zinc-950 min-h-screen">
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
