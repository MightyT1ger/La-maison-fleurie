import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Leaf, 
  Coffee, 
  MapPin, 
  Clock, 
  Instagram, 
  Phone, 
  Mail,
  ChevronRight,
  Menu,
  X,
  ShoppingBag,
  Search,
  Filter,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trash2, Plus, Minus } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'High Tea', href: isHome ? '#tea-room' : '/#tea-room' },
    { name: 'Boutique', href: isHome ? '#boutique' : '/#boutique' },
    { name: 'Over Ons', href: isHome ? '#about' : '/#about' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
    { name: 'Webshop', href: '/webshop' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled || !isHome
        ? "bg-white/90 backdrop-blur-md border-b border-wine/5 py-2 shadow-sm" 
        : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className={cn(
                "p-1 rounded-full transition-colors duration-500",
                scrolled || !isHome ? "bg-wine text-white" : "bg-white/10 text-white backdrop-blur-sm"
              )}>
                <Leaf className="h-4 w-4" />
              </div>
              <span className={cn(
                "font-heading text-xl md:text-2xl tracking-tight transition-colors duration-500",
                scrolled || !isHome ? "text-wine" : "text-white"
              )}>
                La Maison Fleurie
              </span>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href} 
                className={cn(
                  "text-xs font-medium tracking-widest uppercase transition-colors hover:text-gold",
                  scrolled || !isHome ? "text-foreground/70" : "text-white/80"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 border-l border-wine/10 pl-8">
              <Sheet>
                <SheetTrigger className={cn(
                  "relative p-2 transition-colors hover:text-gold",
                  scrolled || !isHome ? "text-wine" : "text-white"
                )}>
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md bg-petal border-wine/10">
                  <SheetHeader className="border-b border-wine/10 pb-6">
                    <SheetTitle className="font-heading text-3xl text-wine">Winkelwagen</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full py-6">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-16 h-16 bg-wine/5 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-wine/20" />
                        </div>
                        <p className="text-muted-foreground">Je winkelwagen is nog leeg.</p>
                        <Link to="/webshop">
                          <Button className="bg-wine hover:bg-wine-dark text-white rounded-full">
                            Ga naar de Webshop
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                              <div className="flex-1 space-y-1">
                                <h4 className="font-heading text-lg leading-tight">{item.name}</h4>
                                <p className="text-gold font-bold">€{item.price.toFixed(2)}</p>
                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center border border-wine/10 rounded-full bg-petal/30">
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="p-1 hover:text-wine transition-colors"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 hover:text-wine transition-colors"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-muted-foreground hover:text-wine transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-wine/10 pt-6 space-y-4 mt-auto">
                          <div className="flex justify-between text-xl font-heading">
                            <span>Totaal</span>
                            <span className="text-wine">€{totalPrice.toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-wine hover:bg-wine-dark text-white rounded-full py-6 text-lg">
                            Afrekenen
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Link to="/#booking">
                <Button className={cn(
                  "rounded-full px-6 py-2 h-9 text-xs font-bold uppercase tracking-widest transition-all",
                  scrolled || !isHome 
                    ? "bg-wine hover:bg-wine-dark text-white" 
                    : "bg-white text-wine hover:bg-gold"
                )}>
                  Reserveer
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger className={cn(
                "relative p-2",
                scrolled || !isHome ? "text-wine" : "text-white"
              )}>
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent className="w-full bg-petal border-wine/10">
                {/* Same cart content as desktop */}
                <SheetHeader className="border-b border-wine/10 pb-6">
                  <SheetTitle className="font-heading text-3xl text-wine">Winkelwagen</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full py-6">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
                      <p className="text-muted-foreground">Je winkelwagen is nog leeg.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm">
                            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-heading text-sm">{item.name}</h4>
                              <p className="text-gold font-bold text-sm">€{item.price.toFixed(2)}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs">Aantal: {item.quantity}</span>
                                <button onClick={() => removeFromCart(item.id)} className="text-wine"><Trash2 className="h-3 w-3" /></button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-wine/10 pt-4 mt-auto">
                        <div className="flex justify-between font-heading text-lg mb-4">
                          <span>Totaal</span>
                          <span>€{totalPrice.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-wine text-white rounded-full">Afrekenen</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <button onClick={() => setIsOpen(!isOpen)} className={cn(scrolled || !isHome ? "text-foreground" : "text-white")}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-petal border-b border-wine/20 px-4 pt-2 pb-6 space-y-4"
        >
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href} 
              className="block text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/#booking" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-wine hover:bg-wine-dark text-white rounded-full">
              Reserveer Nu
            </Button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export const Footer = () => {
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-floral opacity-[0.02]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-heading text-wine">Contact</h3>
            <div className="space-y-6">
              <a href="tel:+31612345678" className="flex items-center gap-4 text-muted-foreground hover:text-wine transition-all group">
                <div className="p-3 bg-petal rounded-xl group-hover:bg-wine group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-lg">+31 6 1234 5678</span>
              </a>
              <a href="mailto:info@lamaisonfleurie.nl" className="flex items-center gap-4 text-muted-foreground hover:text-wine transition-all group">
                <div className="p-3 bg-petal rounded-xl group-hover:bg-wine group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-lg">info@lamaisonfleurie.nl</span>
              </a>
              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="p-3 bg-petal rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-lg">Bloemendaalseweg 12, Bloemendaal</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-heading text-wine">Volg Ons</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">Blijf op de hoogte van onze nieuwste theeën, boutique vondsten en bloemrijke evenementen.</p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 border-wine/20 text-wine hover:bg-wine hover:text-white transition-all duration-500">
                <Instagram className="h-6 w-6" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 border-wine/20 text-wine hover:bg-wine hover:text-white transition-all duration-500">
                <Leaf className="h-6 w-6" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-heading text-wine">Nieuwsbrief</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">Ontvang exclusieve uitnodigingen en bloemrijke inspiratie.</p>
            <div className="flex gap-2">
              <Input placeholder="Je email" className="rounded-2xl h-14 bg-petal/30 border-none focus-visible:ring-wine/20 px-6" />
              <Button className="bg-wine hover:bg-wine-dark text-white rounded-2xl h-14 px-8">Inschrijven</Button>
            </div>
          </motion.div>
        </div>
        
        <Separator className="my-20 bg-wine/5" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground tracking-wider uppercase">
          <p>© {new Date().getFullYear()} La Maison Fleurie. Alle rechten voorbehouden.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-wine transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-wine transition-colors">Algemene Voorwaarden</a>
          </div>
        </div>
      </div>
    </section>
  );
};
