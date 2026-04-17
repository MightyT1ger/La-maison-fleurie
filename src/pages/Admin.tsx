import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { db, storage, loginWithGoogle, logout } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import { Plus, Trash2, LogIn, LogOut, Package, Euro, Image as ImageIcon, Tag, FileText, Upload, ExternalLink, Loader2, ShieldCheck, Lock } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const [isHashed, setIsHashed] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [menuConfig, setMenuConfig] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    img: '',
    category: 'Thee',
    tag: '',
    rating: 5
  });

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    const unsubscribeMenu = onSnapshot(doc(db, 'settings', 'menu'), (doc) => {
      if (doc.exists()) {
        setMenuConfig(doc.data());
      }
    });

    return () => {
      unsubscribe();
      unsubscribeMenu();
    };
  }, [isAdmin]);

  const handleMenuUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    if (file.type !== 'application/pdf') {
      alert("Alleen PDF bestanden zijn toegestaan.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `menus/menukaart_${Date.now()}.pdf`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      await setDoc(doc(db, 'settings', 'menu'), {
        pdfUrl: url,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error uploading menu:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: parseFloat(newProduct.price),
        createdAt: serverTimestamp()
      });
      setNewProduct({ name: '', price: '', img: '', category: 'Thee', tag: '', rating: 5 });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-petal">Laden...</div>;

  // Step 1: Secret Access Code
  if (!isHashed && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-mono">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-wine/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-wine/30">
              <Lock className="h-8 w-8 text-wine" />
            </div>
            <h1 className="text-2xl text-white tracking-widest uppercase font-bold">Encrypted Access</h1>
            <p className="text-zinc-500 text-sm">Enter the terminal authorization code to proceed.</p>
          </div>
          
          <div className="space-y-4">
            <Input 
              type="password"
              placeholder="••••••••"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && accessCode === 'Fleurie2024') {
                  setIsHashed(true);
                }
              }}
              className="bg-zinc-900 border-zinc-800 text-gold text-center py-6 rounded-xl focus-visible:ring-wine/40"
            />
            <Button 
              onClick={() => {
                if (accessCode === 'Fleurie2024') {
                  setIsHashed(true);
                } else {
                  alert("Ongeldige code.");
                }
              }}
              className="w-full bg-wine hover:bg-wine-dark text-white rounded-xl py-6 tracking-[0.2em] font-bold uppercase text-xs"
            >
              Verify Identity
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Step 2: Google Authentication (Only if code is correct)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-petal px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-10 text-center space-y-8 border-wine/10 shadow-2xl rounded-[2.5rem] bg-white">
            <div className="space-y-3">
              <div className="w-20 h-20 bg-wine/5 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="h-10 w-10 text-wine" />
              </div>
              <h1 className="text-4xl font-heading text-wine">Beveiligde Toegang</h1>
              <p className="text-muted-foreground text-balance">Stap 2: Bevestig je identiteit via Google om het beheerpaneel te openen.</p>
            </div>
            
            <Button 
              onClick={loginWithGoogle} 
              className="w-full bg-wine text-white rounded-full py-8 text-lg font-medium shadow-xl shadow-wine/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <LogIn className="mr-3 h-6 w-6" /> Inloggen met Google
            </Button>
            
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-50">Authorized Personnel Only</p>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-petal px-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6 border-wine/10">
          <h1 className="text-3xl font-heading text-wine">Geen Toegang</h1>
          <p className="text-muted-foreground">Je hebt geen beheerdersrechten voor deze site.</p>
          <Button onClick={logout} variant="outline" className="w-full rounded-full">Uitloggen</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-petal pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-4xl font-heading text-wine">Webshop Beheer</h1>
            <p className="text-muted-foreground">Voeg nieuwe producten toe of verwijder bestaande items.</p>
          </div>
          <Button onClick={logout} variant="ghost" className="text-wine hover:bg-wine/5 rounded-full">
            <LogOut className="mr-2 h-4 w-4" /> Uitloggen
          </Button>
        </div>

        {/* Menu Section */}
        <Card className="p-8 border-wine/10 bg-white shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading text-wine flex items-center gap-3">
                <FileText className="h-6 w-6" /> Menukaart Beheer
              </h2>
              <p className="text-muted-foreground">Upload een PDF die klanten op de site kunnen inzien.</p>
            </div>
            
            <div className="flex items-center gap-4">
              {menuConfig?.pdfUrl && (
                <a 
                  href={menuConfig.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-wine font-medium hover:underline px-4 py-2"
                >
                  <ExternalLink className="h-4 w-4" /> Bekijk huidige PDF
                </a>
              )}
              
              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleMenuUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={uploading}
                />
                <Button 
                  disabled={uploading}
                  className="bg-wine text-white rounded-full px-8 py-6 h-auto transition-transform active:scale-95"
                >
                  {uploading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-5 w-5" />
                  )}
                  {uploading ? 'Verwerken...' : 'PDF Uploaden'}
                </Button>
              </div>
            </div>
          </div>
          
          {menuConfig?.updatedAt && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-6 opacity-60">
              Laatst bijgewerkt: {new Date(menuConfig.updatedAt.toDate()).toLocaleString('nl-NL')}
            </p>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Product Form */}
          <Card className="lg:col-span-1 p-6 border-wine/10 h-fit sticky top-24">
            <h2 className="text-xl font-heading text-wine mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" /> Nieuw Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Naam</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wine/40" />
                  <Input 
                    required 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Bijv. Earl Grey Luxe" 
                    className="pl-10 rounded-xl bg-petal/30 border-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prijs (€)</label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wine/40" />
                  <Input 
                    required 
                    type="number" 
                    step="0.01"
                    value={newProduct.price} 
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="12.50" 
                    className="pl-10 rounded-xl bg-petal/30 border-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Afbeelding URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wine/40" />
                  <Input 
                    required 
                    value={newProduct.img} 
                    onChange={e => setNewProduct({...newProduct, img: e.target.value})}
                    placeholder="https://..." 
                    className="pl-10 rounded-xl bg-petal/30 border-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categorie</label>
                <select 
                  value={newProduct.category} 
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full h-10 px-3 rounded-xl bg-petal/30 border-none text-sm focus:ring-2 focus:ring-wine/20 outline-none"
                >
                  <option>Thee</option>
                  <option>Bloemen</option>
                  <option>Accessoires</option>
                  <option>Cadeaus</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tag (Optioneel)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wine/40" />
                  <Input 
                    value={newProduct.tag} 
                    onChange={e => setNewProduct({...newProduct, tag: e.target.value})}
                    placeholder="Bijv. Bestseller" 
                    className="pl-10 rounded-xl bg-petal/30 border-none"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-wine text-white rounded-full py-6 mt-4">
                Product Toevoegen
              </Button>
            </form>
          </Card>

          {/* Product List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-heading text-wine flex items-center gap-2">
              <Package className="h-5 w-5" /> Huidige Producten ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(product => (
                <Card key={product.id} className="p-4 border-wine/10 bg-white overflow-hidden group">
                  <div className="flex gap-4">
                    <img src={product.img} alt={product.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg truncate">{product.name}</h3>
                      <p className="text-gold font-bold">€{product.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{product.category}</p>
                    </div>
                    <Button 
                      onClick={() => handleDeleteProduct(product.id)}
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-wine hover:bg-wine/5 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/50 rounded-3xl border-2 border-dashed border-wine/10">
                  <Package className="h-12 w-12 text-wine/10 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nog geen producten toegevoegd.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
