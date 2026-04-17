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
  const [pdfUrl, setPdfUrl] = useState<string | null>('/menukaart.pdf');

  useEffect(() => {
    // We no longer need the Firestore listener if we use a static file
    // The user will replace the file in the public folder manually
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
