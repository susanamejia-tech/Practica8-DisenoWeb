import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  Phone,
  MapPin,
  Clock,
  Tag,
  Coffee,
  Bike,
  Smartphone,
  Star,
  StarHalf,
  ChevronRight,
  Facebook,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 text-secondary">
      {[1, 2, 3, 4].map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
      <StarHalf className="w-4 h-4 fill-current" />
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      {/* 1. STICKY HEADER / NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Pastelerías Esperanza
            </h1>
            <div className="hidden lg:flex items-center gap-2 bg-card/50 backdrop-blur px-3 py-1 rounded-full border border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Panadería</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <StarRating rating={4.5} />
              <span className="text-xs font-medium">4.5 (2,243 reseñas)</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5 font-serif italic text-primary" onClick={() => document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' })}>
              <MapPin className="w-4 h-4 mr-2" /> Cómo llegar
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif italic px-6">
              Pedir en línea
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Panadería</span>
              <div className="flex items-center gap-2">
                <StarRating rating={4.5} />
                <span className="text-xs font-medium">4.5 (2,243)</span>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={() => { document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}>
              <MapPin className="w-4 h-4 mr-2" /> Cómo llegar
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-2" /> Llamar
            </Button>
            <Button className="w-full justify-start">
              Pedir en línea
            </Button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90 z-10" />
          <img
            src="/hero.png"
            alt="Interior of Pastelerías Esperanza"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="container relative z-20 px-4 text-center mt-20">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-white backdrop-blur border border-white/20 text-sm font-medium mb-6 uppercase tracking-widest">
              Desde 1982
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Pan recién horneado <br />
              <span className="text-secondary italic font-light">todos los días</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
              Calidad y tradición en cada bocado. Disfruta del sabor de casa.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto font-serif italic rounded-full shadow-xl" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver nuestro menú
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* 3. INFO BAR */}
      <section className="py-8 bg-card border-y border-border/50 relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm md:text-base">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <span>Av Río Nilo 1963, Lomas del Paradero, GDL</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <span>Abierto · Cierra a las 9 p.m.</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <span>55 6285 0400 ext. 9311</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm text-primary">
                <Tag className="w-5 h-5" />
              </div>
              <span>$1–100 por persona</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h3>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow duration-300 text-center h-full group">
                <CardContent className="pt-10 pb-8 px-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Coffee className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3">Consumo en el lugar</h4>
                  <p className="text-muted-foreground">Disfruta de tu pan dulce acompañado de un buen café en nuestro acogedor espacio.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow duration-300 text-center h-full group">
                <CardContent className="pt-10 pb-8 px-6">
                  <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Bike className="w-10 h-10 text-secondary" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3">Entrega a domicilio</h4>
                  <p className="text-muted-foreground">Llevamos el sabor de nuestra panadería directamente hasta la puerta de tu casa.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow duration-300 text-center h-full group">
                <CardContent className="pt-10 pb-8 px-6">
                  <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3">Pedido en línea</h4>
                  <p className="text-muted-foreground">Ordena con anticipación y pasa a recoger sin hacer filas.</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. MENU SECTION */}
      <section id="menu" className="py-24 bg-card">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Nuestro Menú</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">Recetas tradicionales preparadas cada mañana con los mejores ingredientes.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Tabs defaultValue="pan" className="w-full">
              <TabsList className="w-full flex flex-wrap h-auto bg-transparent mb-12 justify-center gap-2">
                <TabsTrigger value="pan" className="text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-3 border border-border">Pan Dulce</TabsTrigger>
                <TabsTrigger value="pasteles" className="text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-3 border border-border">Pasteles</TabsTrigger>
                <TabsTrigger value="reposteria" className="text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-3 border border-border">Repostería</TabsTrigger>
                <TabsTrigger value="bebidas" className="text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-3 border border-border">Bebidas</TabsTrigger>
              </TabsList>

              <TabsContent value="pan" className="mt-0">
                <div className="grid gap-6">
                  <MenuCard title="Concha de Vainilla" desc="Suave pan esponjoso con cobertura de azúcar crujiente" price="$18" img="/menu-concha.png" />
                  <MenuCard title="Cuerno de Mantequilla" desc="Delicado y hojaldrado, perfecto para el desayuno" price="$22" img="/menu-cuerno.png" />
                  <MenuCard title="Empanada de Cajeta" desc="Rellena de cajeta artesanal, horneada a la perfección" price="$25" img="/menu-empanada.png" />
                </div>
              </TabsContent>
              
              <TabsContent value="pasteles" className="mt-0">
                <div className="grid gap-6">
                  <MenuCard title="Pastel de Tres Leches" desc="Nuestro clásico irresistible, esponjoso y cremoso" price="$85 rebanada" img="/menu-tresleches.png" />
                  <MenuCard title="Pastel de Chocolate Belga" desc="Capas de bizcocho con ganache de cacao 70%" price="$95 rebanada" img="/menu-chocolate.png" />
                  <MenuCard title="Pastel de Fresas con Crema" desc="Fresas frescas de temporada con crema chantilly" price="$90 rebanada" img="/menu-fresas.png" />
                </div>
              </TabsContent>

              <TabsContent value="reposteria" className="mt-0">
                <div className="grid gap-6">
                  <MenuCard title="Éclair de Café" desc="Pasta choux rellena de crema de café, glaseado brillante" price="$35" img="/menu-eclair.png" />
                  <MenuCard title="Macaron de Frambuesa" desc="Delicado y crujiente, relleno de ganache de frambuesa" price="$28" img="/menu-macaron.png" />
                  <MenuCard title="Mil Hojas de Vainilla" desc="Capas de hojaldre y crema pastelera" price="$40" img="/menu-milhojas.png" />
                </div>
              </TabsContent>

              <TabsContent value="bebidas" className="mt-0">
                <div className="grid gap-6">
                  <MenuCard title="Café de Olla" desc="Café artesanal con canela y piloncillo" price="$30" img="/menu-cafeolla.png" />
                  <MenuCard title="Chocolate Caliente" desc="Espeso y aromático, receta tradicional mexicana" price="$35" imgFallbackColor="linear-gradient(135deg,#3d2214,#7a4a2e)" />
                  <MenuCard title="Agua de Jamaica" desc="Refrescante infusión de flor de Jamaica" price="$20" imgFallbackColor="linear-gradient(135deg,#8b1a4a,#c94070)" />
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>

      {/* 6. GALLERY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 h-64 md:h-[500px] overflow-hidden rounded-2xl">
                <img src="/gallery1.png" alt="Pan dulce" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="h-64 md:h-[240px] overflow-hidden rounded-2xl">
                  <img src="/gallery2.png" alt="Bread display" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="h-64 md:h-[240px] overflow-hidden rounded-2xl">
                  <img src="/gallery3.png" alt="Cake slices" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <FadeIn>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Lo que dicen de nosotros</h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-4xl font-bold text-foreground">4.5</span>
                  <div className="flex flex-col">
                    <StarRating rating={4.5} />
                    <span className="text-sm text-muted-foreground">de 5 estrellas</span>
                  </div>
                </div>
                <span className="text-sm font-medium">Basado en 2,243 opiniones</span>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard 
              name="María G." 
              date="Hace 2 días" 
              rating={5} 
              initials="MG" 
              color="bg-primary/20 text-primary"
              text="El mejor pan dulce de Guadalajara. Las conchas son esponjosas y la cajeta de las empanadas es simplemente exquisita. Mi familia viene aquí cada domingo." 
              delay={0.1}
            />
            <ReviewCard 
              name="Carlos R." 
              date="Hace 1 semana" 
              rating={5} 
              initials="CR" 
              color="bg-secondary/20 text-secondary-foreground"
              text="El pastel de tres leches es increíble. Lo pedí para el cumpleaños de mi mamá y todos quedaron encantados. El servicio fue puntual y muy amable." 
              delay={0.2}
            />
            <ReviewCard 
              name="Ana L." 
              date="Hace 2 semanas" 
              rating={4} 
              initials="AL" 
              color="bg-accent/30 text-foreground"
              text="Me encanta que siempre hay variedad. Los macarons son delicados y los éclairs de café son irresistibles. Un lugar que nunca defrauda." 
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* 8. MAP */}
      <section id="mapa" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h3 className="font-serif text-3xl font-bold mb-4">Visítanos</h3>
              <p className="text-muted-foreground">Te esperamos con el horno caliente.</p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-card p-4 rounded-3xl shadow-xl border border-border">
              <div className="w-full h-[400px] rounded-2xl overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.4!2d-103.3693!3d20.6597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzM1LjEiTiAxMDPCsDIyJzA5LjUiVw!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Pastelerías Esperanza"
                ></iframe>
              </div>
              <div className="flex items-center gap-4 mt-6 px-4 pb-2 text-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Pastelerías Esperanza Lomas</h4>
                  <p className="text-muted-foreground text-sm">Av Río Nilo 1963, Lomas del Paradero, 44840 Guadalajara, Jalisco</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-foreground text-background pt-16 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <img src="https://res.cloudinary.com/dml7j4luq/image/upload/v1776997314/cucei-logo_1_eps2sv.png" alt="Logo CUCEI" className="h-30 mb-6" />
              <p className="text-white/70 text-sm mb-4">
                Centro Universitario de Ciencias Exactas e Ingenierías
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-white uppercase tracking-wider text-sm">Práctica 8</h5>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <span>Nombre: Susana Rubí Manzo Mejía</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>Materia: Desarrollo de aplicaciones web en la nube y móviles</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>Profesor: Zeus Emanuel Gutierrez Cobian</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>Ciclo: 2026A</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© 2026 Susana y Replit — Todos los derechos reservados</p>
            <p>Diseñado con pasión.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuCard({ title, desc, price, img, imgFallbackColor }: { title: string, desc: string, price: string, img?: string, imgFallbackColor?: string }) {
  return (
    <div className="bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-row gap-0 items-stretch overflow-hidden">
      <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden">
        {img ? (
          <img src={img} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: imgFallbackColor || '#f5efe6' }} />
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center flex-1 px-5 py-4">
        <div>
          <h4 className="font-serif text-lg font-bold mb-1">{title}</h4>
          <p className="text-muted-foreground text-sm">{desc}</p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <span className="font-bold text-lg text-primary">{price}</span>
          <Button variant="ghost" size="icon" className="rounded-full shrink-0">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ name, date, rating, initials, color, text, delay }: any) {
  return (
    <FadeIn delay={delay}>
      <Card className="h-full bg-background border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className={`font-bold ${color}`}>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-secondary text-secondary' : 'fill-muted text-muted'}`} />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic font-serif leading-relaxed">
            "{text}"
          </p>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
