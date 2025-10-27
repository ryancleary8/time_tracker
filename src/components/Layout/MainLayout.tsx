import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1">
        <div className="border-b border-slate-200 bg-white p-4 md:hidden dark:border-slate-700 dark:bg-slate-900">
          <Navigation />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
