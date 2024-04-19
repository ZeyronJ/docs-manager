import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/components/SideNav';
import MarginWidthWrapper from '@/components/MarginWidthWrapper';
import PageWrapper from '@/components/PageWrapper';
import Providers from '@/store/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pagina principal gestor de documentos',
  description:
    'Gestor de documentos para la Facultad de Odontología de la Universidad de Chile',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <SideNav />
          <MarginWidthWrapper>
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </Providers>
      </body>
    </html>
  );
}
