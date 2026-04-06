import { Inter } from 'next/font/google';
import Layout from '@/src/components/Layout/Layout';
import HomePage from '@/src/components/HomePage/HomePage';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}
