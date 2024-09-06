import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/components/SideNav';
import MarginWidthWrapper from '@/components/MarginWidthWrapper';
import PageWrapper from '@/components/PageWrapper';
import Providers from '@/store/providers';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Docs Manager',
  description:
    'Gestor de documentos para la Facultad de Odontología de la Universidad de Chile',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} h-screen`}>
        <Providers>
          <Toaster />
          <SideNav />
          <MarginWidthWrapper>
            <Header />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </Providers>
      </body>
    </html>
  );
}
