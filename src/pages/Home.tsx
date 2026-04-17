import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Leaf, 
  Coffee, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useMenu } from '@/context/MenuContext';

const Hero = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/maison-store/1920/1080" 
          alt="La Maison Fleurie Storefront" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-xs font-semibold tracking-[0.2em] uppercase text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            Sinds 2024 • Bloemendaal
          </span>
          <h1 className="text-6xl md:text-9xl font-heading text-white mb-8 leading-[0.85] drop-shadow-2xl text-balance">
            La Maison Fleurie
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-light italic leading-relaxed drop-shadow-lg text-balance">
            "Élégance et Fleurs en Harmonie"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-wine hover:bg-wine-dark text-white rounded-full px-10 py-8 text-xl shadow-2xl shadow-wine/20 group border-none transition-all duration-500 hover:scale-105"
              onClick={() => {
                const booking = document.getElementById('booking');
                booking?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reserveer een High Tea
              <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-white backdrop-blur-sm rounded-full px-10 py-8 text-xl border-2 transition-all duration-500 hover:scale-105"
              onClick={onOpenMenu}
            >
              Bekijk het Menu
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

const TeaRoom = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  return (
    <section id="tea-room" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-floral"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">Gastronomie</span>
              <h2 className="text-5xl md:text-6xl font-heading text-foreground leading-tight">De Tea Room</h2>
              <div className="h-1 w-24 bg-wine rounded-full"></div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Stap binnen in een wereld van verfijning. Onze tea room is een harmonie van bloemen, elegantie en Franse flair. Hier geniet u van de fijnste theeën in een ambiance die al uw zintuigen prikkelt.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-petal/50 border-none shadow-sm hover:shadow-md transition-shadow duration-500">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                    <Coffee className="text-wine h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl">Zoete Verleidingen</h3>
                  <p className="text-muted-foreground leading-relaxed">Huisgemaakte patisserie, verfijnde macarons en bloemrijke lekkernijen.</p>
                </CardContent>
              </Card>
              <Card className="bg-petal/50 border-none shadow-sm hover:shadow-md transition-shadow duration-500">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                    <Leaf className="text-wine h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl">Hartige Delicatessen</h3>
                  <p className="text-muted-foreground leading-relaxed">Luxe amuses, verfijnde sandwiches en hartige hapjes met een Franse twist.</p>
                </CardContent>
              </Card>
            </div>
            <Button 
              className="bg-wine hover:bg-wine-dark text-white rounded-full px-10 py-6 text-lg transition-transform hover:scale-105"
              onClick={onOpenMenu}
            >
              Bekijk de Menukaart
            </Button>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <img 
                src="https://picsum.photos/seed/tea-experience/1200/1600" 
                alt="High Tea Experience" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-wine/10 rounded-full -z-0 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gold/5 rounded-full -z-0 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Boutique = () => {
  return (
    <section id="boutique" className="py-32 bg-petal relative overflow-hidden">
      <div className="absolute inset-0 bg-floral opacity-[0.05]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-20 space-y-6">
          <span className="text-wine font-medium tracking-widest uppercase text-sm">Exclusief</span>
          <h2 className="text-5xl md:text-6xl font-heading text-foreground">Onze Boutique</h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed text-balance">
            Breng de elegantie van La Maison Fleurie in uw eigen huis met onze exclusieve collectie bloemen en decoratie.
          </p>
          <div className="h-1 w-24 bg-gold rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Losse Thee & Porselein",
              desc: "Hoogwaardige melanges en verfijnde accessoires voor het perfecte theemoment.",
              img: "https://picsum.photos/seed/boutique-tea/800/1000"
            },
            {
              title: "Home Decor",
              desc: "Sfeervolle items die de Franse elegantie naar uw interieur brengen.",
              img: "https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Cadeausets",
              desc: "Unieke, met zorg samengestelde pakketten voor elk speciaal moment.",
              img: "https://images.unsplash.com/photo-1556680262-9990363a3e6d?q=80&w=600&auto=format&fit=crop"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-[500px] rounded-[2rem] overflow-hidden mb-8 shadow-2xl shadow-wine/5">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-wine/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-10">
                  <Button className="bg-white text-wine rounded-full px-8 py-6 hover:bg-gold hover:text-white transition-colors duration-500 w-full">
                    Ontdek meer
                  </Button>
                </div>
              </div>
              <h3 className="text-3xl font-heading mb-3 group-hover:text-wine transition-colors duration-300">{item.title}</h3>
              <p className="text-lg text-muted-foreground mb-6 font-light leading-relaxed">{item.desc}</p>
              <Button variant="link" className="p-0 text-wine hover:text-gold flex items-center gap-2 text-lg font-medium transition-colors duration-300">
                Bekijk Collectie <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-floral opacity-[0.02]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-6">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src="https://picsum.photos/seed/friends-cafe/800/1000" 
                alt="Our Story - Friends laughing" 
                className="rounded-3xl h-80 w-full object-cover shadow-2xl shadow-wine/10"
                referrerPolicy="no-referrer"
              />
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                src="https://picsum.photos/seed/interior-design/800/1000" 
                alt="Our Story - Interior" 
                className="rounded-3xl h-80 w-full object-cover mt-12 shadow-2xl shadow-wine/10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-wine/5 rounded-full blur-[100px]"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">Onze Passie</span>
              <h2 className="text-5xl md:text-6xl font-heading text-foreground">Ons Verhaal</h2>
              <div className="h-1 w-24 bg-wine rounded-full"></div>
            </div>
            <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                La Maison Fleurie is ontstaan uit een passie voor bloemen en de kunst van het genieten. Wij geloven dat elegantie en harmonie de basis vormen voor een onvergetelijke ervaring.
              </p>
              <p>
                In onze bloemrijke oase in Bloemendaal brengen we het beste van twee werelden samen: verfijnde gastronomie en de natuurlijke schoonheid van bloemen.
              </p>
              <div className="relative pl-8 border-l-2 border-gold py-2">
                <p className="font-heading text-wine italic text-3xl leading-snug">
                  "Élégance et Fleurs en Harmonie"
                </p>
              </div>
            </div>
            <div className="flex items-center gap-10 pt-6">
              <div className="space-y-1">
                <p className="text-4xl font-heading text-wine">150+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Theesoorten</p>
              </div>
              <div className="w-px h-12 bg-wine/10"></div>
              <div className="space-y-1">
                <p className="text-4xl font-heading text-wine">12k</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Gasten p/j</p>
              </div>
              <div className="w-px h-12 bg-wine/10"></div>
              <div className="space-y-1">
                <p className="text-4xl font-heading text-wine">2024</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Opgericht</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section id="booking" className="py-32 bg-petal relative overflow-hidden">
      <div className="absolute inset-0 bg-floral opacity-[0.03]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-wine/5 overflow-hidden grid grid-cols-1 lg:grid-cols-5"
        >
          <div className="lg:col-span-2 bg-wine p-12 md:p-20 text-white space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl md:text-6xl font-heading leading-tight">Reserveer een Tafel</h2>
              <p className="text-petal/80 text-xl font-light leading-relaxed">
                Verzeker jezelf van een plekje in onze verfijnde tea room. We raden aan om minimaal 48 uur van tevoren te reserveren voor de volledige High Tea ervaring.
              </p>
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-lg">Openingstijden</p>
                  <p className="text-petal/70">Wo - Zo: 10:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-lg">Locatie</p>
                  <p className="text-petal/70">Bloemendaalseweg 12, Bloemendaal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 p-12 md:p-20">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm uppercase tracking-widest text-muted-foreground ml-1">Naam</Label>
                  <Input id="name" placeholder="Je volledige naam" className="rounded-2xl h-14 bg-petal/30 border-none focus-visible:ring-wine/20" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                  <Input id="email" type="email" placeholder="je@email.com" className="rounded-2xl h-14 bg-petal/30 border-none focus-visible:ring-wine/20" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-sm uppercase tracking-widest text-muted-foreground ml-1">Datum</Label>
                  <Popover>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full justify-start text-left font-normal rounded-2xl h-14 bg-petal/30 border-none hover:bg-petal/50 transition-colors",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-wine" />
                      {date ? format(date, "PPP") : <span>Kies een datum</span>}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="guests" className="text-sm uppercase tracking-widest text-muted-foreground ml-1">Aantal Personen</Label>
                  <Input id="guests" type="number" min="1" max="10" placeholder="2" className="rounded-2xl h-14 bg-petal/30 border-none focus-visible:ring-wine/20" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm uppercase tracking-widest text-muted-foreground ml-1">Bijzonderheden</Label>
                <Textarea id="notes" placeholder="Laat ons weten of we ergens rekening mee kunnen houden..." className="rounded-2xl min-h-[120px] bg-petal/30 border-none focus-visible:ring-wine/20 p-4" />
              </div>
              
              <Button className="w-full bg-wine hover:bg-wine-dark text-white rounded-full py-8 text-xl shadow-xl shadow-wine/10 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Bevestig Aanvraag
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MenuBanner = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  return (
    <section className="py-24 bg-wine relative overflow-hidden">
      <div className="absolute inset-0 bg-floral opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center md:text-left">
            <span className="text-gold font-medium tracking-[0.3em] uppercase text-xs">Ontdek onze kaart</span>
            <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">Zintuigprikkelende<br />Smaakbeleving</h2>
            <p className="text-petal/70 text-lg max-w-xl font-light">
              Van onze beroemde signature High Tea tot verfijnde patisserie en hartige Franse amuses. Laat u verleiden door ons seizoensgebonden assortiment.
            </p>
          </div>
          <Button 
            onClick={onOpenMenu}
            className="group bg-gold hover:bg-gold-dark text-white rounded-full px-12 py-8 text-xl shadow-2xl shadow-gold/20 transition-all duration-500 hover:scale-105 inline-flex items-center gap-3 border-none"
          >
            Open de Menukaart
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    </section>
  );
};

export default function Home() {
  const { setIsMenuOpen, pdfUrl } = useMenu();

  const handleOpenMenu = () => {
    if (pdfUrl) {
      setIsMenuOpen(true);
    } else {
      alert("De menukaart wordt momenteel bijgewerkt. Probeer het later nog eens!");
    }
  };

  return (
    <>
      <Hero onOpenMenu={handleOpenMenu} />
      <TeaRoom onOpenMenu={handleOpenMenu} />
      <MenuBanner onOpenMenu={handleOpenMenu} />
      <Boutique />
      <AboutUs />
      <BookingSection />
    </>
  );
}
