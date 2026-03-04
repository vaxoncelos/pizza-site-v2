import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Star, ExternalLink, ShoppingBag, Utensils, Instagram } from 'lucide-react';
import { SmoothCursor } from './components/SmoothCursor';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults for better scroll behavior
ScrollTrigger.config({
  ignoreMobileResize: true,
});

// Location data
const locations = [
  {
    name: 'Marina District',
    address: 'Avenida do Mar Azul 18',
    postal: '9000-001 Funchal, Madeira',
    phone: '+351 291 000 101',
    hours: 'Tue - Sun: 12:00 pm - 10:30 pm',
    mapLink: 'https://maps.google.com/?q=Avenida+do+Mar+Azul+18+Funchal',
    bookLink: 'https://example.com/brasa-da-baia/marina/book',
    menuLink: 'https://example.com/brasa-da-baia/marina/menu',
    orderLink: 'https://example.com/brasa-da-baia/marina/order'
  },
  {
    name: 'Clifftop Patio',
    address: 'Rua das Flores Atlanticas 7',
    postal: '9370-120 Calheta, Madeira',
    phone: '+351 291 000 202',
    hours: 'Wed - Mon: 12:00 pm - 11:00 pm',
    mapLink: 'https://maps.google.com/?q=Rua+das+Flores+Atlanticas+7+Calheta',
    bookLink: 'https://example.com/brasa-da-baia/clifftop/book',
    menuLink: 'https://example.com/brasa-da-baia/clifftop/menu',
    orderLink: 'https://example.com/brasa-da-baia/clifftop/order'
  }
];

// Testimonials
const testimonials = [
  {
    text: 'The black garlic mushroom pizza was excellent and the service felt warm from the first minute.',
    author: 'Lena P.',
    rating: 5
  },
  {
    text: 'Great sunset tables and creative starters. This is exactly the kind of cozy fictional spot we wanted for our demo.',
    author: 'Marco T.',
    rating: 5
  },
  {
    text: 'Loved the mock menu options, especially the poncha glaze pizza. Perfect sample content for a restaurant concept site.',
    author: 'Aisha R.',
    rating: 5
  }
];

const mockMenuItems = {
  funchal: [
    {
      name: 'Atlantic Margherita',
      description: 'Tomato sauce, fior di latte, basil oil',
      price: 'EUR 12'
    },
    {
      name: 'Poncha Pepperoni',
      description: 'Spicy salami, caramelized onions, citrus honey',
      price: 'EUR 15'
    },
    {
      name: 'Lava Veggie',
      description: 'Roasted peppers, mushrooms, black olives, arugula',
      price: 'EUR 14'
    },
    {
      name: 'Garlic Tide Knots',
      description: 'Baked dough knots with herb butter dip',
      price: 'EUR 7'
    }
  ],
  machico: [
    {
      name: 'Clifftop Burrata',
      description: 'Cherry tomatoes, burrata, basil pesto',
      price: 'EUR 16'
    },
    {
      name: 'Smoked Tuna Bianca',
      description: 'Olive oil base, smoked tuna, red onion, capers',
      price: 'EUR 17'
    },
    {
      name: 'Madeira Mushroom Cream',
      description: 'Cremini mushrooms, garlic cream, parmesan',
      price: 'EUR 15'
    },
    {
      name: 'Sea Salt Tiramisu',
      description: 'Espresso cream with sea-salt cocoa dust',
      price: 'EUR 8'
    }
  ]
};

// Translations
const translations = {
  en: {
    tagline: 'Fictional Restaurant • Madeira',
    subtitle: 'Mock wood-fired pizza and island dishes in two fictional Madeira locations',
    viewMenu: 'View Our Menu',
    findUs: 'Find Us',
    orderFunchal: 'Order Marina',
    orderMachico: 'Order Clifftop',
    links: 'Links',
    ourMenu: 'Our Menu',
    orderOnline: 'Mock Ordering',
    menuDescription: 'Sample menu data for design and functionality testing',
    funchalMenu: 'Marina Menu',
    machicoMenu: 'Clifftop Menu',
    onlineOrdering: 'Mock Menu',
    openNewTab: 'Open in new tab',
    bookTable: 'Book a Table',
    callToOrder: 'Call to Order',
    findUsTitle: 'Find Us',
    ourLocations: 'Fictional Locations',
    locationsDescription: 'Two fictional Madeira locations for mock restaurant content.',
    order: 'Order',
    contact: 'Contact',
    getDirections: 'Get Directions',
    reviews: 'Sample Reviews',
    whatGuestsSay: 'Mock Guest Feedback',
    readyToOrder: 'Ready to order?',
    deliveryText: 'Demo ordering links for prototype use',
    woodFiredOven: 'Wood-Fired Oven',
    woodFiredOvenDesc: 'High-heat stone baking for crisp crusts',
    freshDailyDough: 'Fresh Daily Dough',
    freshDailyDoughDesc: 'Prepared each morning for consistent texture',
    premiumIngredients: 'Premium Ingredients',
    premiumIngredientsDesc: 'Island produce, artisan cheeses, seasonal toppings',
    twoLocations: 'Mock Concept',
    twoLocationsDesc: 'All names, links, and details are fictional demo data',
    footerDescription: 'Fictional wood-fired kitchen concept in Madeira. Built with mock data for preview and testing.',
    bookFunchal: 'Book Marina',
    bookMachico: 'Book Clifftop',
    copyright: '© 2026 Brasa da Baia (fictional concept). All rights reserved.'
  },
  pt: {
    tagline: 'Restaurante Ficticio • Madeira',
    subtitle: 'Pizza em forno a lenha e pratos da ilha em duas localizacoes ficticias da Madeira',
    viewMenu: 'Ver Menu',
    findUs: 'Encontre-nos',
    orderFunchal: 'Pedir Marina',
    orderMachico: 'Pedir Miradouro',
    links: 'Links',
    ourMenu: 'Nosso Menu',
    orderOnline: 'Pedidos de Demonstracao',
    menuDescription: 'Dados de menu de exemplo para testes de design e funcionalidade',
    funchalMenu: 'Menu Marina',
    machicoMenu: 'Menu Miradouro',
    onlineOrdering: 'Menu de Demonstracao',
    openNewTab: 'Abrir em nova aba',
    bookTable: 'Reservar Mesa',
    callToOrder: 'Ligar para Pedir',
    findUsTitle: 'Encontre-nos',
    ourLocations: 'Localizacoes Ficticias',
    locationsDescription: 'Duas localizacoes ficticias na Madeira para conteudo de demonstracao.',
    order: 'Pedir',
    contact: 'Contato',
    getDirections: 'Obter Direções',
    reviews: 'Avaliacoes de Exemplo',
    whatGuestsSay: 'Feedback Ficticio',
    readyToOrder: 'Pronto para pedir?',
    deliveryText: 'Links de pedido de demonstracao para prototipo',
    woodFiredOven: 'Forno a Lenha',
    woodFiredOvenDesc: 'Alta temperatura para massa crocante',
    freshDailyDough: 'Massa Fresca Diária',
    freshDailyDoughDesc: 'Preparada todas as manhas para consistencia',
    premiumIngredients: 'Ingredientes Premium',
    premiumIngredientsDesc: 'Produtos da ilha, queijos artesanais e coberturas sazonais',
    twoLocations: 'Conceito Ficticio',
    twoLocationsDesc: 'Marina e Miradouro - locais ficticios do conceito',
    footerDescription: 'Conceito ficticio de cozinha em forno a lenha na Madeira. Construido com dados de exemplo para testes.',
    bookFunchal: 'Reservar Marina',
    bookMachico: 'Reservar Miradouro',
    copyright: '© 2026 Brasa da Baia (conceito ficticio). Todos os direitos reservados.'
  }
};

type Language = keyof typeof translations;
type TranslationCopy = typeof translations.en;

// Hero Section - Strong CTAs
function HeroSection({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      scrollTl.fromTo(contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    // Refresh ScrollTrigger after initial render
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-wood-primary relative">
      {/* Top navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 py-4 flex justify-between items-center">
        <span className="font-display text-4xl text-cream uppercase tracking-[-0.03em]">
          Brasa da Baia
        </span>
        <div className="flex items-center gap-6">
          {/* Language Toggle */}
          <div className="flex items-center bg-wood-secondary/50 rounded-full p-1 border border-cream/20">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                language === 'en' ? 'bg-gold text-wood-primary' : 'text-cream/60 hover:text-cream'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('pt')}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                language === 'pt' ? 'bg-gold text-wood-primary' : 'text-cream/60 hover:text-cream'
              }`}
            >
              PT
            </button>
          </div>
          <a
            href="https://example.com/brasa-da-baia/links"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-cream transition-colors font-mono text-sm uppercase tracking-widest"
          >
            {t.links}
          </a>
        </div>
      </div>

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/reserve_oven_action.jpg"
          alt="Wood-fired oven"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wood-primary via-wood-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      >
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#34E0A1' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm5 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <circle cx="9.5" cy="13" r="1" fill="#1A120B"/>
            <circle cx="14.5" cy="13" r="1" fill="#1A120B"/>
          </svg>
          <span className="font-mono text-gold text-xs uppercase tracking-[0.15em]">
            Demo concept site - fictional restaurant data
          </span>
        </div>
        <span className="font-mono text-gold text-sm uppercase tracking-[0.2em] mb-4">
          {t.tagline}
        </span>
        <h1 className="font-display text-[clamp(48px,12vw,140px)] text-cream uppercase tracking-[-0.04em] text-center leading-none">
          Brasa da Baia
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-wheat text-center max-w-2xl">
          {t.subtitle}
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="#menu"
            className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
          >
            <Utensils className="w-5 h-5" />
            {t.viewMenu}
          </a>
          <a
            href="#locations"
            className="btn-outline flex items-center gap-2 text-lg px-8 py-4"
          >
            <MapPin className="w-5 h-5" />
            {t.findUs}
          </a>
        </div>

        {/* Quick order buttons */}
        <div className="flex gap-6 mt-8">
          <a
            href={locations[0].orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-widest">{t.orderFunchal}</span>
          </a>
          <a
            href={locations[1].orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold hover:text-cream transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-widest">{t.orderMachico}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Embedded Menu Section
function MenuEmbedSection({ t }: { t: TranslationCopy }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<'funchal' | 'machico'>('funchal');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const activeLocationData = activeLocation === 'funchal' ? locations[0] : locations[1];

  return (
    <section 
      id="menu"
      ref={sectionRef}
      className="relative bg-wood-primary py-16 px-[6vw]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-mono text-gold text-sm uppercase tracking-[0.2em]">
            {t.ourMenu}
          </span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] text-cream uppercase tracking-[-0.03em] mt-4">
            {t.orderOnline}
          </h2>
          <p className="text-wheat mt-4 max-w-xl mx-auto">
            {t.menuDescription}
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveLocation('funchal')}
            className={`px-8 py-3 font-mono text-sm uppercase tracking-widest transition-all ${
              activeLocation === 'funchal'
                ? 'bg-gold text-wood-primary'
                : 'border border-cream/30 text-cream hover:border-gold hover:text-gold'
            }`}
          >
            {t.funchalMenu}
          </button>
          <button
            onClick={() => setActiveLocation('machico')}
            className={`px-8 py-3 font-mono text-sm uppercase tracking-widest transition-all ${
              activeLocation === 'machico'
                ? 'bg-gold text-wood-primary'
                : 'border border-cream/30 text-cream hover:border-gold hover:text-gold'
            }`}
          >
            {t.machicoMenu}
          </button>
        </div>

        {/* Local Mock Menu Data */}
        <div className="bg-wood-secondary rounded-lg overflow-hidden border border-cream/10">
          <div className="p-4 bg-wood-primary border-b border-cream/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <span className="text-cream font-mono text-sm uppercase tracking-widest">
                {activeLocationData.name} - {t.onlineOrdering}
              </span>
            </div>
            <a 
              href={activeLocationData.menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:text-cream transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              {t.openNewTab}
            </a>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockMenuItems[activeLocation].map((item) => (
              <article key={item.name} className="border border-cream/10 rounded-lg p-4 bg-wood-primary/40">
                <div className="flex justify-between gap-3">
                  <h3 className="text-cream font-display text-2xl uppercase tracking-[-0.02em]">{item.name}</h3>
                  <span className="text-gold font-mono text-sm">{item.price}</span>
                </div>
                <p className="text-wheat text-sm mt-2">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Direct Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a 
            href={activeLocationData.bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t.bookTable}
          </a>
          <a 
            href={`tel:${activeLocationData.phone.replace(/\s/g, '')}`}
            className="btn-outline flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {t.callToOrder}
          </a>
        </div>
      </div>
    </section>
  );
}

// Locations Section - Prominent
function LocationsSection({ t }: { t: TranslationCopy }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardsRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="locations"
      ref={sectionRef}
      className="relative bg-wood-secondary py-24 px-[6vw]"
    >
      <div className="text-center mb-16">
        <span className="font-mono text-gold text-sm uppercase tracking-[0.2em]">
          {t.findUs}
        </span>
        <h2 className="font-display text-[clamp(40px,6vw,80px)] text-cream uppercase tracking-[-0.03em] mt-4">
          {t.ourLocations}
        </h2>
        <p className="text-wheat mt-4 max-w-xl mx-auto">
          {t.locationsDescription}
        </p>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {locations.map((location, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            className="bg-wood-primary rounded-lg overflow-hidden border border-cream/10"
          >
            {/* Map placeholder with image */}
            <div className="relative h-48 bg-gradient-to-br from-wood-secondary to-wood-primary flex items-center justify-center">
              <img 
                src={i === 0 ? "/madeira_landscape.jpg" : "/experience_oven.jpg"}
                alt={location.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                <h3 className="font-display text-3xl text-cream uppercase">{location.name}</h3>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream">{location.address}</p>
                    <p className="text-wheat text-sm">{location.postal}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-cream">{location.phone}</p>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-cream">{location.hours}</p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                <a 
                  href={location.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center text-sm py-3"
                >
                  {t.bookTable}
                </a>
                <a 
                  href={location.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center text-sm py-3 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t.order}
                </a>
              </div>
              
              <a 
                href={location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gold mt-4 text-sm hover:text-cream transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t.getDirections}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseSection({ t }: { t: TranslationCopy }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      title: t.woodFiredOven,
      description: t.woodFiredOvenDesc
    },
    {
      title: t.freshDailyDough,
      description: t.freshDailyDoughDesc
    },
    {
      title: t.premiumIngredients,
      description: t.premiumIngredientsDesc
    },
    {
      title: t.twoLocations,
      description: t.twoLocationsDesc
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(itemsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.08 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-wood-primary py-20 px-[6vw]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              ref={el => { if (el) itemsRef.current[i] = el; }}
              className="text-center"
            >
              <h3 className="font-display text-xl text-cream uppercase tracking-[-0.02em]">
                {feature.title}
              </h3>
              <p className="text-wheat text-sm mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection({ t }: { t: TranslationCopy }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.08 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-wood-secondary py-24 px-[6vw]">
      <div className="text-center mb-16">
        <span className="font-mono text-gold text-sm uppercase tracking-[0.2em]">
          {t.reviews}
        </span>
        <h2 className="font-display text-[clamp(32px,5vw,64px)] text-cream uppercase tracking-[-0.03em] mt-4">
          {t.whatGuestsSay}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            className="bg-wood-primary p-8 rounded-lg border border-cream/10"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, j) => (
                <Star key={j} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-wheat leading-relaxed mb-6">
              "{testimonial.text}"
            </p>
            <p className="text-gold font-mono text-sm uppercase tracking-widest">
              — {testimonial.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Sticky CTA Bar
function StickyCTA({ t }: { t: TranslationCopy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-wood-primary/95 backdrop-blur-sm border-t border-cream/10 z-[200] px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-cream font-display text-lg uppercase">{t.readyToOrder}</p>
          <p className="text-wheat text-sm">{t.deliveryText}</p>
        </div>
        <div className="flex gap-3">
          <a 
            href={locations[0].orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4"
          >
            {t.orderFunchal}
          </a>
          <a 
            href={locations[1].orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm py-2 px-4"
          >
            {t.orderMachico}
          </a>
        </div>
      </div>
    </div>
  );
}

// Footer
function Footer({ t }: { t: TranslationCopy }) {
  return (
    <footer className="relative bg-wood-primary py-16 pb-32 px-[6vw]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-cream uppercase tracking-[-0.02em] mb-4">
            Brasa da Baia
          </h3>
          <p className="text-wheat mb-4 max-w-md">
            {t.footerDescription}
          </p>
          <div className="flex gap-4">
            <a 
              href="https://example.com/brasa-da-baia/instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-gold transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://example.com/brasa-da-baia/links"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-gold transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-mono text-gold text-sm uppercase tracking-widest mb-4">{t.order}</h4>
          <div className="flex flex-col gap-2">
            <a 
              href={locations[0].menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat hover:text-cream transition-colors text-sm"
            >
              {t.funchalMenu}
            </a>
            <a 
              href={locations[1].menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat hover:text-cream transition-colors text-sm"
            >
              {t.machicoMenu}
            </a>
            <a 
              href={locations[0].bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat hover:text-cream transition-colors text-sm"
            >
              {t.bookFunchal}
            </a>
            <a 
              href={locations[1].bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat hover:text-cream transition-colors text-sm"
            >
              {t.bookMachico}
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-gold text-sm uppercase tracking-widest mb-4">{t.contact}</h4>
          <div className="space-y-2 text-sm">
            <p className="text-wheat">+351 291 000 101</p>
            <p className="text-wheat">hello@brasadabaia-demo.com</p>
            <p className="text-wheat mt-4">Tue - Sun: 12pm - 10:30pm</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-wheat/60 text-xs">
          {t.copyright}
        </p>
        <p className="text-wheat/60 text-xs font-mono uppercase tracking-widest">
          Made in Madeira
        </p>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Refresh ScrollTrigger after fonts and images load
  useEffect(() => {
    // Refresh after initial paint
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh after fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh after window load (images, etc.)
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative bg-wood-primary min-h-screen cursor-none">
      {/* Smooth Cursor */}
      <SmoothCursor />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Sections */}
      <main className="relative z-10">
        <HeroSection language={language} setLanguage={setLanguage} />
        <div className="relative z-20 bg-wood-primary">
          <MenuEmbedSection t={t} />
          <LocationsSection t={t} />
          <WhyChooseSection t={t} />
          <TestimonialsSection t={t} />
          <Footer t={t} />
        </div>
      </main>

      {/* Sticky CTA */}
      <StickyCTA t={t} />
    </div>
  );
}

export default App;
