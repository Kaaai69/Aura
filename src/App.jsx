import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, ChevronDown, MapPin, Calendar, 
  DollarSign, Layers, Check, Calculator, Sliders, Eye, 
  Phone, Mail, Compass, HelpCircle, HardHat
} from 'lucide-react';
import './App.css';

// Project Database
const PROJECTS = [
  {
    id: 1,
    title: 'Aura Modernus',
    style: 'modern',
    styleLabel: 'Модерн',
    area: '450 м²',
    floors: 2,
    bedrooms: 4,
    materials: 'Монолит, Стекло, Керамогранит',
    price: 'от 1 200 000 ₽',
    image: '/project_modern.jpg',
  },
  {
    id: 2,
    title: 'Aura Silva',
    style: 'barnhouse',
    styleLabel: 'Барнхаус',
    area: '280 м²',
    floors: 2,
    bedrooms: 3,
    materials: 'Клееный брус, Фальц, Планкен',
    price: 'от 850 000 ₽',
    image: '/project_barnhouse.jpg',
  },
  {
    id: 3,
    title: 'Aura Classica',
    style: 'classic',
    styleLabel: 'Классика',
    area: '620 м²',
    floors: 2,
    bedrooms: 5,
    materials: 'Травертин, Кирпич ручной формовки',
    price: 'от 1 800 000 ₽',
    image: '/project_classic.jpg',
  },
  {
    id: 4,
    title: 'Aura Futura',
    style: 'modern',
    styleLabel: 'Модерн',
    area: '510 м²',
    floors: 2,
    bedrooms: 4,
    materials: 'Монолит, Фасадный алюминий, Термодерево',
    price: 'от 1 450 000 ₽',
    image: '/project_modern_2.jpg',
  },
  {
    id: 5,
    title: 'Aura Foresta',
    style: 'barnhouse',
    styleLabel: 'Барнхаус',
    area: '340 м²',
    floors: 2,
    bedrooms: 3,
    materials: 'Клееный брус, Натуральный сланец, Стекло',
    price: 'от 980 000 ₽',
    image: '/project_barnhouse_2.jpg',
  },
  {
    id: 6,
    title: 'Aura Domus',
    style: 'classic',
    styleLabel: 'Классика',
    area: '780 м²',
    floors: 2,
    bedrooms: 6,
    materials: 'Мрамор, Доломит, Кованая медь',
    price: 'от 2 400 000 ₽',
    image: '/project_classic_2.jpg',
  }
];

// Timeline Steps
const TIMELINE_STEPS = [
  {
    number: '01',
    title: 'Концептуальный анализ',
    desc: 'Исследование геодезии участка, инсоляции и ландшафтных особенностей. Разработка 3D-эскизов фасадов и посадка дома на генеральный план.',
    badge: 'Срок: 15–20 дней'
  },
  {
    number: '02',
    title: 'Архитектурные решения (АР)',
    desc: 'Детальные планировки всех этажей с расстановкой мебели, чертежи фасадов со спецификацией отделки, разрезы, узлы примыканий и ведомость окон.',
    badge: 'Срок: 25–30 дней'
  },
  {
    number: '03',
    title: 'Конструктивные решения (КР)',
    desc: 'Инженерные расчеты прочности: проект фундамента, схемы армирования, раскладка перекрытий, расчет стропильной системы крыши и спецификации бетона.',
    badge: 'Срок: 20–25 дней'
  },
  {
    number: '04',
    title: 'Авторский надзор и подбор',
    desc: 'Регулярные выезды архитектора на стройплощадку, контроль выполнения строительно-монтажных работ в строгом соответствии с чертежами и подбор отделочных материалов.',
    badge: 'Сопровождение до сдачи'
  }
];

// Interactive Pins database for layout
const FIRST_FLOOR_PINS = [
  {
    id: 1,
    top: '30%',
    left: '12%',
    title: 'Зона отдыха (BBQ)',
    text: 'Крытая просторная терраса с печью-барбекю и прямым выходом к бассейну. Продумана ветрозащита и естественная инсоляция.'
  },
  {
    id: 2,
    top: '45%',
    left: '35%',
    title: 'Двусветная гостиная',
    text: 'Центральная зона дома с высотой потолков 6.8 метров, каминной зоной и панорамным остеклением, выходящим в приватный сад.'
  },
  {
    id: 3,
    top: '25%',
    left: '52%',
    title: 'Кухня-остров & Столовая',
    text: 'Профессиональная технологическая кухня со скрытой кладовой для продуктов и обеденным столом на 10 персон.'
  },
  {
    id: 4,
    top: '23%',
    left: '64%',
    title: 'Мастер-спальня (Level 1)',
    text: 'Выделенный мастер-блок с собственной гардеробной комнатой, будуаром и выходом на отдельную террасу.'
  },
  {
    id: 5,
    top: '68%',
    left: '71%',
    title: 'Автомобильный гараж',
    text: 'Теплый гараж на 2 внедорожника с системой водоотведения, зарядкой для электромобилей и входом в технический блок.'
  }
];

const SECOND_FLOOR_PINS = [
  {
    id: 1,
    top: '30%',
    left: '25%',
    title: 'Второй свет',
    text: 'Галерея второго этажа с видом на гостиную первого уровня. Защищена закаленным стеклянным ограждением.'
  },
  {
    id: 2,
    top: '25%',
    left: '60%',
    title: 'Две гостевые спальни',
    text: 'Уютные спальни для гостей или детей, каждая из которых оборудована гардеробным шкафом и собственным рабочим местом.'
  },
  {
    id: 3,
    top: '55%',
    left: '48%',
    title: 'Домашний кинотеатр',
    text: 'Шумоизолированное помещение со специальной акустической подготовкой для семейного просмотра фильмов.'
  },
  {
    id: 4,
    top: '70%',
    left: '28%',
    title: 'Мастер-кабинет',
    text: 'Рабочий кабинет владельца дома с выходом на балкон и панорамным видом на лесной массив.'
  }
];

function App() {
  // Navigation active scroll highlight & shrinking header
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Projects Filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Calculator States
  const [calcArea, setCalcArea] = useState(350);
  const [calcStyle, setCalcStyle] = useState('modern');
  const [calcFloors, setCalcFloors] = useState(2);
  const [calcOptions, setCalcOptions] = useState({
    garage: false,
    terrace: true,
    pool: false,
    smartHouse: false
  });
  
  // Blueprint Floor plan tab state
  const [activeFloor, setActiveFloor] = useState('floor1');
  const [activePin, setActivePin] = useState(null);
  
  // Documentation accordion state
  const [activeDocSection, setActiveDocSection] = useState('ar');
  
  // Consultation Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formArea, setFormArea] = useState('350');
  const [formMsg, setFormMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll handler for header & reveal items
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Intersection observer logic in simplified form for scroll reveals
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial trigger
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter project logic
  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.style === activeFilter);

  // Calculator price calculations
  const calculateCosts = () => {
    let baseRate = 3000; // Modern
    if (calcStyle === 'barnhouse') baseRate = 2500;
    if (calcStyle === 'classic') baseRate = 3800;

    // Multipliers
    const floorMultiplier = 1 + (calcFloors - 1) * 0.08;

    // Design cost (₽)
    let designCost = calcArea * baseRate * floorMultiplier;
    
    // Add design options
    if (calcOptions.garage) designCost += 150000;
    if (calcOptions.terrace) designCost += 80000;
    if (calcOptions.pool) designCost += 220000;
    if (calcOptions.smartHouse) designCost += 180000;

    // Construction cost estimate (₽) - average premium construction rate
    const buildRate = 110000;
    let buildCost = calcArea * buildRate * floorMultiplier;
    
    if (calcOptions.garage) buildCost += 1400000;
    if (calcOptions.terrace) buildCost += 800000;
    if (calcOptions.pool) buildCost += 3800000;
    if (calcOptions.smartHouse) buildCost += 2200000;

    // Preparation timeline in days
    let timelineDays = 35 + Math.ceil(calcArea * 0.06);
    if (calcOptions.pool) timelineDays += 10;
    if (calcOptions.smartHouse) timelineDays += 5;

    return {
      designPrice: Math.round(designCost).toLocaleString('ru-RU') + ' ₽',
      buildPrice: Math.round(buildCost).toLocaleString('ru-RU') + ' ₽',
      timeline: `${timelineDays} рабочих дней`
    };
  };

  const costs = calculateCosts();

  // Toggle documentation accordion
  const handleDocSectionClick = (section) => {
    setActiveDocSection(prev => prev === section ? null : section);
  };

  // Consultation submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formName && formPhone) {
      setFormSubmitted(true);
    }
  };

  const handleOptionToggle = (key) => {
    setCalcOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Auto-fill calculator settings to consultation form
  const handleConsultationClick = () => {
    setFormArea(calcArea.toString());
    setFormMsg(`Интересует проектирование дома в стиле ${
      calcStyle === 'modern' ? 'Модерн' : calcStyle === 'barnhouse' ? 'Барнхаус' : 'Классика'
    }, площадью около ${calcArea} кв.м. Выбранные опции: ${
      [
        calcOptions.garage ? 'теплый гараж' : '',
        calcOptions.terrace ? 'крытая терраса' : '',
        calcOptions.pool ? 'бассейн' : '',
        calcOptions.smartHouse ? 'умный дом' : ''
      ].filter(Boolean).join(', ')
    }.`);
    
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floor selection helper
  const pins = activeFloor === 'floor1' ? FIRST_FLOOR_PINS : SECOND_FLOOR_PINS;

  return (
    <>
      {/* Header Navigation */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container header-container">
          <a href="#" className="logo">
            AURA <span className="logo-dot"></span>
          </a>
          
          <nav className="nav-links">
            <a href="#about">О бюро</a>
            <a href="#projects">Проекты</a>
            <a href="#calculator">Калькулятор</a>
            <a href="#plans">Планировки</a>
            <a href="#documentation">Документация</a>
            <a href="#consultation">Консультация</a>
          </nav>

          <a href="tel:+74950000000" className="header-contact">
            +7 (495) 000-00-00
          </a>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Side Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '80%',
          height: '100vh',
          backgroundColor: '#07080a',
          zIndex: 99,
          padding: '6rem 2rem 2rem',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          boxShadow: 'var(--shadow-premium)'
        }}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>О бюро</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Проекты</a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Калькулятор</a>
          <a href="#plans" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Планировки</a>
          <a href="#documentation" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Документация</a>
          <a href="#consultation" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Консультация</a>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Связаться с нами:</span>
            <a href="tel:+74950000000" style={{ fontSize: '1.1rem', color: 'var(--primary-gold)' }}>+7 (495) 000-00-00</a>
            <a href="mailto:info@auradesign.ru" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>info@auradesign.ru</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('/hero_villa.jpg')` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-tag reveal">Architectural Design Bureau</span>
          <h1 className="reveal" style={{ animationDelay: '0.2s' }}>Архитектура как<br /><span className="text-gold">искусство жизни</span></h1>
          <p className="hero-desc reveal" style={{ animationDelay: '0.4s' }}>
            Мы проектируем и реализуем уникальные загородные резиденции премиум-класса. Каждая деталь выражает ваш стиль, а конструктивные решения гарантируют абсолютную долговечность.
          </p>
          <div className="reveal" style={{ animationDelay: '0.6s' }}>
            <a href="#calculator" className="btn-premium">
              Рассчитать проект <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-stats reveal" style={{ animationDelay: '0.8s' }}>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Лет опыта</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Проектов резиденций</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">30+</div>
              <div className="stat-label">Архитектурных наград</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding container reveal">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">О философии AURA</span>
            <h2 className="serif-font">Индивидуальный подход к созданию вашего родового имения</h2>
            <p style={{ marginBottom: '1.5rem', fontWeight: 300, lineHeight: 1.8 }}>
              Мы не верим в компромиссы. Премиальный дом — это не просто квадратные метры, а продолжение характера владельца. Каждая резиденция создается под индивидуальный жизненный сценарий семьи.
            </p>
            <p style={{ color: 'var(--text-muted)', fontWeight: 300, marginBottom: '2rem' }}>
              Мы объединяем передовой европейский минимализм, функциональность планировочных решений и высокую инженерию, чтобы создать дом, который будет восхищать поколения.
            </p>
            <a href="#consultation" className="btn-premium-solid">Получить презентацию</a>
          </div>
          <div className="about-features-grid">
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '3px solid var(--primary-gold)' }}>
              <Compass size={32} className="text-gold" />
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>Умная инсоляция</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Дом ориентирован по сторонам света так, чтобы в гостиной всегда было солнце, а спальни оставались прохладными.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '3px solid var(--primary-gold)' }}>
              <Layers size={32} className="text-gold" />
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>Натуральные материалы</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>В отделке фасадов используются только долговечные премиальные материалы: сланец, лиственница, травертин.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '3px solid var(--primary-gold)' }}>
              <HardHat size={32} className="text-gold" />
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>Инженерная надежность</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Расчеты конструктивных элементов проводятся с тройным запасом прочности по евростандартам.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '3px solid var(--primary-gold)' }}>
              <HelpCircle size={32} className="text-gold" />
              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>Авторский контроль</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Личный контроль главного архитектора гарантирует 100% совпадение чертежей и реального дома.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section id="projects" className="section-padding blueprint-line-top reveal" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">Наши шедевры</span>
            <h2>Curated Typical Projects</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
              Архитектурные концепции, проработанные до мельчайших деталей и готовые к адаптации под особенности вашего участка.
            </p>
          </div>

          <div className="projects-filter">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Все коллекции
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'modern' ? 'active' : ''}`}
              onClick={() => setActiveFilter('modern')}
            >
              Модерн
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'barnhouse' ? 'active' : ''}`}
              onClick={() => setActiveFilter('barnhouse')}
            >
              Барнхаус
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'classic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('classic')}
            >
              Классика
            </button>
          </div>

          <div className="projects-grid" key={activeFilter}>
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="project-card glass-panel"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <span className="project-style">{project.styleLabel}</span>
                  <h3>{project.title}</h3>
                  
                  <div className="project-details">
                    <div className="detail-spec">
                      <Layers size={14} /> <span>{project.area}</span>
                    </div>
                    <div className="detail-spec">
                      <MapPin size={14} /> <span>{project.floors} этажа</span>
                    </div>
                    <div className="detail-spec">
                      <Calendar size={14} /> <span>{project.bedrooms} спален</span>
                    </div>
                  </div>

                  <div className="project-materials">
                    Материалы: {project.materials}
                  </div>

                  <div className="project-price-row">
                    <span className="project-price">{project.price}</span>
                    <a href="#consultation" className="project-link">
                      Обсудить проект <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Designing Steps Section */}
      <section id="stages" className="section-padding container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Процесс создания</span>
          <h2>Индивидуальное проектирование</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
            Каждый шаг создания премиального проекта — это симбиоз вашего видения и нашего многолетнего архитектурного опыта.
          </p>
        </div>

        <div className="design-timeline">
          {TIMELINE_STEPS.map((step, idx) => (
            <div key={idx} className="timeline-step">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel" style={{ padding: '2.5rem' }}>
                <div className="timeline-number">{step.number}</div>
                <h3 className="timeline-title serif-font">{step.title}</h3>
                <p className="timeline-desc" style={{ fontWeight: 300 }}>{step.desc}</p>
                <span className="timeline-badge">{step.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Calculator Section */}
      <section id="calculator" className="section-padding blueprint-line-top reveal" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">Калькулятор m²</span>
            <h2>Интерактивный расчет стоимости</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
              Выберите параметры вашего будущего особняка и мгновенно получите предварительный расчет стоимости эскизного проекта и строительства.
            </p>
          </div>

          <div className="calc-card glass-panel">
            <div className="calc-grid">
              
              <div className="calc-sliders">
                {/* Area Slider */}
                <div>
                  <div className="calc-field-label">
                    <span>Площадь резиденции</span>
                    <span className="calc-value-highlight">{calcArea} м²</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    value={calcArea} 
                    onChange={(e) => setCalcArea(parseInt(e.target.value))}
                    className="slider-input"
                    style={{
                      background: `linear-gradient(to right, var(--primary-gold) 0%, var(--primary-gold) ${((calcArea - 100) / 900) * 100}%, rgba(255, 255, 255, 0.1) ${((calcArea - 100) / 900) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    <span>100 м²</span>
                    <span>550 м²</span>
                    <span>1000 м²</span>
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="calc-field-label" style={{ marginBottom: '1rem' }}>Архитектурный стиль</label>
                  <div className="calc-group-buttons">
                    <button 
                      className={`calc-btn-option ${calcStyle === 'modern' ? 'active' : ''}`}
                      onClick={() => setCalcStyle('modern')}
                    >
                      Модерн / Хай-тек
                    </button>
                    <button 
                      className={`calc-btn-option ${calcStyle === 'barnhouse' ? 'active' : ''}`}
                      onClick={() => setCalcStyle('barnhouse')}
                    >
                      Эко-Барнхаус
                    </button>
                    <button 
                      className={`calc-btn-option ${calcStyle === 'classic' ? 'active' : ''}`}
                      onClick={() => setCalcStyle('classic')}
                    >
                      Современная классика
                    </button>
                  </div>
                </div>

                {/* Floor Selection */}
                <div>
                  <label className="calc-field-label" style={{ marginBottom: '1rem' }}>Количество этажей</label>
                  <div className="calc-group-buttons">
                    <button 
                      className={`calc-btn-option ${calcFloors === 1 ? 'active' : ''}`}
                      onClick={() => setCalcFloors(1)}
                    >
                      1 этаж
                    </button>
                    <button 
                      className={`calc-btn-option ${calcFloors === 2 ? 'active' : ''}`}
                      onClick={() => setCalcFloors(2)}
                    >
                      2 этажа
                    </button>
                    <button 
                      className={`calc-btn-option ${calcFloors === 3 ? 'active' : ''}`}
                      onClick={() => setCalcFloors(3)}
                    >
                      3 этажа
                    </button>
                  </div>
                </div>

                {/* Additional Options */}
                <div>
                  <label className="calc-field-label" style={{ marginBottom: '1rem' }}>Премиальные опции и постройки</label>
                  <div className="calc-checkboxes">
                    <label className="calc-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={calcOptions.garage}
                        onChange={() => handleOptionToggle('garage')}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Гараж на 2 авто (+ теплый хозблок)</span>
                    </label>
                    <label className="calc-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={calcOptions.terrace}
                        onChange={() => handleOptionToggle('terrace')}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Панорамная крытая терраса с BBQ</span>
                    </label>
                    <label className="calc-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={calcOptions.pool}
                        onChange={() => handleOptionToggle('pool')}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Инфинити-бассейн на улице</span>
                    </label>
                    <label className="calc-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={calcOptions.smartHouse}
                        onChange={() => handleOptionToggle('smartHouse')}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Интеграция системы «Умный Дом»</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Calculator Results */}
              <div className="calc-results">
                <div>
                  <div className="calc-result-item">
                    <div className="calc-result-label">Стоимость полного проекта (АР+КР)</div>
                    <div className="calc-result-value">{costs.designPrice}</div>
                    <div className="calc-result-value-sub">Включает всю документацию для строительства</div>
                  </div>

                  <div className="calc-result-item">
                    <div className="calc-result-label">Оценка строительства (Premium)</div>
                    <div className="calc-result-value" style={{ color: 'var(--text-primary)', fontSize: '1.8rem' }}>
                      {costs.buildPrice}
                    </div>
                    <div className="calc-result-value-sub">Включает коробку, фасад, окна и черновую отделку</div>
                  </div>

                  <div className="calc-result-item">
                    <div className="calc-result-label">Срок разработки документации</div>
                    <div className="calc-result-value" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      {costs.timeline}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button onClick={handleConsultationClick} className="btn-premium-solid" style={{ width: '100%' }}>
                    Отправить параметры архитектору
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Examples Section */}
      <section id="plans" className="section-padding container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Детали зонирования</span>
          <h2>Примеры планировочных решений</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
            Интерактивный чертеж первого этажа концептуальной резиденции. Наведите или кликните на маркеры, чтобы изучить наши стандарты проектирования.
          </p>
        </div>

        <div className="blueprint-wrapper glass-panel">
          <div className="blueprint-tabs">
            <button 
              className={`blueprint-tab-btn ${activeFloor === 'floor1' ? 'active' : ''}`}
              onClick={() => { setActiveFloor('floor1'); setActivePin(null); }}
            >
              Первый этаж — Дневная и техническая зоны
            </button>
            <button 
              className={`blueprint-tab-btn ${activeFloor === 'floor2' ? 'active' : ''}`}
              onClick={() => { setActiveFloor('floor2'); setActivePin(null); }}
            >
              Второй этаж — Приватная спальная зона
            </button>
          </div>

          <div className="blueprint-interactive-area">
            {/* The Blueprint image itself */}
            <img src="/layout_first_floor.jpg" alt="Architectural Plan Layout" />

            {/* Pins Mapping */}
            {pins.map((pin) => (
              <div 
                key={pin.id} 
                className="blueprint-pin" 
                style={{ top: pin.top, left: pin.left }}
                onMouseEnter={() => setActivePin(pin)}
                onClick={() => setActivePin(pin)}
              >
                <div className="pin-pulse"></div>
                <div className="pin-dot">{pin.id}</div>
              </div>
            ))}

            {/* Pin Info Box */}
            <div className={`pin-tooltip-panel glass-panel ${activePin ? 'active' : ''}`}>
              {activePin && (
                <>
                  <div className="pin-tooltip-title">{activePin.title}</div>
                  <div className="pin-tooltip-text">{activePin.text}</div>
                </>
              )}
              {!activePin && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Наведите на числовой маркер на чертеже
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Package Content Section */}
      <section id="documentation" className="section-padding blueprint-line-top reveal" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-subtitle">Что вы получаете</span>
            <h2>Состав проектной документации</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
              Наш проект — это исчерпывающий пакет технических данных, по которому строители сдадут дом без ошибок.
            </p>
          </div>

          <div className="doc-accordion-container">
            
            <div className="doc-accordion">
              {/* AR Section */}
              <div className={`doc-accordion-item ${activeDocSection === 'ar' ? 'active' : ''}`}>
                <div className="doc-accordion-header" onClick={() => handleDocSectionClick('ar')}>
                  <div className="doc-accordion-title">
                    <Layers size={18} className="doc-accordion-icon" />
                    <span>Раздел АР (Архитектурный)</span>
                  </div>
                  <ChevronDown size={16} className="doc-accordion-arrow" />
                </div>
                <div className="doc-accordion-content-wrapper">
                  <div className="doc-accordion-content">
                    <p style={{ marginBottom: '1rem', fontWeight: 300 }}>
                      Определяет внешний вид дома, планировки, теплотехнические параметры стен и светопрозрачные конструкции.
                    </p>
                    <ul className="doc-list">
                      <li>3D Фотореалистичные визуализации с разных ракурсов</li>
                      <li>Кладочные планы этажей с размерами перегородок</li>
                      <li>Чертежи фасадов с указанием высотных отметок и материалов</li>
                      <li>Разрезы дома по основным несущим конструкциям</li>
                      <li>План кровли с разуклонкой и водосточными воронками</li>
                      <li>Спецификация заполнения оконных и дверных проемов</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* KR Section */}
              <div className={`doc-accordion-item ${activeDocSection === 'kr' ? 'active' : ''}`}>
                <div className="doc-accordion-header" onClick={() => handleDocSectionClick('kr')}>
                  <div className="doc-accordion-title">
                    <HardHat size={18} className="doc-accordion-icon" />
                    <span>Раздел КР (Конструктивный)</span>
                  </div>
                  <ChevronDown size={16} className="doc-accordion-arrow" />
                </div>
                <div className="doc-accordion-content-wrapper">
                  <div className="doc-accordion-content">
                    <p style={{ marginBottom: '1rem', fontWeight: 300 }}>
                      Содержит расчеты нагрузок, детали несущего каркаса, узлы сопряжений и ведомость расхода материалов.
                    </p>
                    <ul className="doc-list">
                      <li>Проект фундамента (плитный, свайный, ленточный с расчетом)</li>
                      <li>Схемы армирования и опалубки бетонных конструкций</li>
                      <li>Детали перекрытий и монолитных железобетонных поясов</li>
                      <li>Конструкция стропильной системы крыши и спецификация бруса</li>
                      <li>Чертежи несущих металлических и деревянных балок</li>
                      <li>Сводные таблицы расхода стали, арматуры и бетона</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* IS Section */}
              <div className={`doc-accordion-item ${activeDocSection === 'is' ? 'active' : ''}`}>
                <div className="doc-accordion-header" onClick={() => handleDocSectionClick('is')}>
                  <div className="doc-accordion-title">
                    <Compass size={18} className="doc-accordion-icon" />
                    <span>Раздел ИС (Инженерные сети)</span>
                  </div>
                  <ChevronDown size={16} className="doc-accordion-arrow" />
                </div>
                <div className="doc-accordion-content-wrapper">
                  <div className="doc-accordion-content">
                    <p style={{ marginBottom: '1rem', fontWeight: 300 }}>
                      Проектирование внутренних коммуникаций для обеспечения жизнедеятельности дома и микроклимата.
                    </p>
                    <ul className="doc-list">
                      <li>Отопление: теплые полы, котельная, расстановка радиаторов</li>
                      <li>Водоснабжение и водоотведение (ГВС/ХВС/Канализация)</li>
                      <li>Вентиляция и кондиционирование воздуха</li>
                      <li>Электроснабжение, заземление, расстановка розеток и выключателей</li>
                      <li>Слаботочные системы (интернет, домофония, видеонаблюдение)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="doc-image-preview glass-panel">
              <img src="/documentation_preview.jpg" alt="Documentation folders blueprints" />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(to top, rgba(7, 8, 10, 0.95) 0%, rgba(7, 8, 10, 0) 100%)',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <span className="text-gold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Формат выдачи</span>
                <h4 style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}>Печатный том А3 в кожаном переплете + PDF-проект</h4>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation Booking Form Section */}
      <section id="consultation" className="section-padding container reveal">
        <div className="consultation-wrapper glass-panel">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-subtitle">Связаться со студией</span>
            <h2>Заказать консультацию архитектора</h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem', fontWeight: 300, color: 'var(--text-secondary)' }}>
              Оставьте контакты. Главный архитектор бюро свяжется с вами, чтобы обсудить параметры участка и идеи будущего дома.
            </p>
          </div>

          {!formSubmitted ? (
            <form className="consultation-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    required 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <label htmlFor="name">Ваше имя</label>
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder=" " 
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                  <label htmlFor="phone">Номер телефона</label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="number" 
                    id="area" 
                    placeholder=" "
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                  />
                  <label htmlFor="area">Планируемая площадь дома (м²)</label>
                </div>
                <div className="form-group">
                  <input type="text" id="time" placeholder=" " />
                  <label htmlFor="time">Удобное время для звонка</label>
                </div>
              </div>

              <div className="form-group">
                <textarea 
                  id="message" 
                  rows="3" 
                  placeholder=" "
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                ></textarea>
                <label htmlFor="message">Расскажите вкратце о ваших пожеланиях</label>
              </div>

              <div className="form-submit-container">
                <button type="submit" className="btn-premium">
                  Отправить заявку <ArrowRight size={16} />
                </button>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </span>
              </div>
            </form>
          ) : (
            <div className="form-success-message">
              <div className="form-success-icon">
                <Check size={24} />
              </div>
              <h3 className="serif-font" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Благодарим вас, {formName}!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                Ваша заявка на проектирование дома площадью {formArea} м² принята. <br />
                Главный архитектор бюро AURA свяжется с вами в течение часа.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)} 
                className="btn-premium" 
                style={{ marginTop: '2rem' }}
              >
                Вернуться назад
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-logo-desc">
            <h3>AURA <span className="logo-dot" style={{ display: 'inline-block' }}></span></h3>
            <p className="footer-desc">
              Проектирование и авторский контроль загородной недвижимости премиум-класса на территории всей России и СНГ.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Разделы</h4>
            <ul className="footer-links">
              <li><a href="#about">О бюро</a></li>
              <li><a href="#projects"> Curated Projects</a></li>
              <li><a href="#calculator">Калькулятор площади</a></li>
              <li><a href="#plans">Планировочные решения</a></li>
              <li><a href="#documentation">Состав проекта</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Контакты</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Москва, Пресненская наб. 12, Башня Федерация</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <a href="tel:+74950000000">+7 (495) 000-00-00</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:info@auradesign.ru">info@auradesign.ru</a>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} AURA Architecture Bureau. Все права защищены.</span>
          <span>Разработка премиального фронтенда</span>
        </div>
      </footer>
    </>
  );
}

export default App;
