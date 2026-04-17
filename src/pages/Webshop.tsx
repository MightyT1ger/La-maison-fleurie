import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star,
  ChevronRight,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const categories = ["Alle", "Thee", "Bloemen", "Accessoires", "Home Decor", "Patisserie"];

export default function Webshop() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const filteredProducts = products.filter(p => 
    (selectedCategory === "Alle" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <section className="relative py-20 bg-wine overflow-hidden">
        <div className="absolute inset-0 bg-floral opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-gold font-medium tracking-widest uppercase text-sm">Online Boutique</span>
            <h1 className="text-5xl md:text-7xl font-heading text-white">De Webshop</h1>
            <p className="text-xl text-petal/80 max-w-2xl mx-auto font-light leading-relaxed">
              Breng de verfijning van La Maison Fleurie naar uw eigen huis. Ontdek onze met zorg geselecteerde collectie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 bg-white border-b border-wine/5 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    selectedCategory === cat 
                      ? "bg-wine text-white shadow-lg shadow-wine/20" 
                      : "bg-petal/50 text-wine hover:bg-petal"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Zoek producten..." 
                className="pl-12 rounded-full bg-petal/30 border-none h-12 focus-visible:ring-wine/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-petal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine mx-auto mb-4"></div>
              <p className="text-muted-foreground">Producten laden...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="border-none bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-wine/5 hover:shadow-2xl hover:shadow-wine/10 transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    {product.tag && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-wine text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                        {product.tag}
                      </div>
                    )}
                    <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md text-wine rounded-full shadow-sm hover:bg-wine hover:text-white transition-all duration-300">
                      <Heart className="h-5 w-5" />
                    </button>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Button className="bg-white text-wine rounded-full px-8 py-6 hover:bg-gold hover:text-white transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        Snel Bekijken
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-gold font-bold uppercase tracking-widest mb-1">{product.category}</p>
                        <h3 className="text-2xl font-heading group-hover:text-wine transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-xl font-heading text-wine">€{product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted/30"
                          )} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">({product.rating})</span>
                    </div>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-petal text-wine hover:bg-wine hover:text-white rounded-full py-6 transition-all duration-500 group/btn"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      In Winkelwagen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="text-center py-40 space-y-6">
              <div className="w-20 h-20 bg-petal rounded-full flex items-center justify-center mx-auto">
                <Search className="h-10 w-10 text-wine/30" />
              </div>
              <h3 className="text-3xl font-heading">Geen producten gevonden</h3>
              <p className="text-muted-foreground">Probeer een andere zoekterm of categorie.</p>
              <Button 
                variant="outline" 
                className="rounded-full border-wine text-wine hover:bg-wine hover:text-white"
                onClick={() => { setSelectedCategory("Alle"); setSearchQuery(""); }}
              >
                Wis alle filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-wine rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center space-y-8">
            <div className="absolute inset-0 bg-floral opacity-5"></div>
            <h2 className="text-4xl md:text-5xl font-heading text-white relative z-10">Mis nooit een nieuwe collectie</h2>
            <p className="text-petal/70 text-lg max-w-xl mx-auto relative z-10">
              Schrijf u in voor onze nieuwsbrief en ontvang als eerste bericht over nieuwe bloemen, theeën en exclusieve aanbiedingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
              <Input placeholder="Uw email adres" className="rounded-full h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 px-8" />
              <Button className="bg-white text-wine hover:bg-gold hover:text-white rounded-full h-14 px-10 transition-all">
                Inschrijven
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
