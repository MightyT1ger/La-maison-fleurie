import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, pdfUrl }) => {
  // Prevent scrolling when the overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-wine/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-wine/5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/5 flex items-center justify-center">
                  <span className="font-heading text-wine text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-wine">Onze Menukaart</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">La Maison Fleurie</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-wine hover:bg-wine/5"
                  onClick={() => window.open(pdfUrl, '_blank')}
                  title="Volledig scherm"
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <a 
                  href={pdfUrl} 
                  download="menukaart-la-maison-fleurie.pdf"
                  className="hidden sm:inline-flex"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-wine hover:bg-wine/5"
                    title="Downloaden"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-wine hover:bg-wine/5 h-10 w-10"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden bg-petal/20">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-none"
                title="Menukaart PDF"
              />
            </div>

            {/* Footer / Mobile close */}
            <div className="p-4 bg-wine text-center sm:hidden">
              <button 
                onClick={onClose}
                className="text-white font-medium uppercase tracking-widest text-sm py-2 px-8"
              >
                Sluiten
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
