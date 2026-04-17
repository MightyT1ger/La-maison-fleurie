import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  pdfUrl: string | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Listen for real-time updates as well
    const unsubscribe = onSnapshot(doc(db, 'settings', 'menu'), (doc) => {
      if (doc.exists()) {
        setPdfUrl(doc.data().pdfUrl);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, pdfUrl }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
