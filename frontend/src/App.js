import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// ==========================================
// HEADER COMPONENT
// ==========================================
const Header = ({ scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerHeight = 70;
          const position = element.offsetTop - headerHeight;
          window.scrollTo({ top: position, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = 70;
        const position = element.offsetTop - headerHeight;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className={`header ${headerScrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Printe<span>art</span></div>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="hamburger"></span>
        </button>

        <nav className={`menu ${menuOpen ? 'active' : ''}`}>
          <a href="#productos" onClick={(e) => handleNavClick(e, 'productos')}>Productos</a>
          <a href="#corporativo" onClick={() => { navigate('/corporativo'); setMenuOpen(false); }}>Corporativo</a>
          <a href="#como-funciona" onClick={(e) => handleNavClick(e, 'como-funciona')}>Cómo comprar</a>
        </nav>

        <div className="icons">
          <button className="icon-btn" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

// ==========================================
// FOOTER COMPONENT
// ==========================================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo">Printe<span>art</span></div>
          <p className="footer-desc">Transformamos tus mejores momentos en recuerdos que duran para siempre.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Productos</h4>
          <ul>
            <li><a href="#">Fotolibros</a></li>
            <li><a href="#">Polaroids</a></li>
            <li><a href="#">Fotos Clásicas</a></li>
            <li><a href="#">Fotocuadros</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Cómo comprar</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Contacto</h4>
          <ul className="contact-list">
            <li><i className="fas fa-map-marker-alt"></i> Martinez, Buenos Aires</li>
            <li><i className="fab fa-whatsapp"></i> +54 11 1234-5678</li>
            <li><i className="fas fa-envelope"></i> hola@printeart.com</li>
            <li><i className="fas fa-clock"></i> Lun-Vie 9:00 - 18:00</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Printeart. Todos los derechos reservados.</p>
        <div className="payment-methods">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-amex"></i>
        </div>
      </div>
    </div>
  </footer>
);

// ==========================================
// HOME PAGE
// ==========================================
const HomePage = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const navigate = useNavigate();

  const reviews = [
    { text: "Increíble la calidad del fotolibro. Lo pedí para el primer año de mi bebé y quedó hermoso. El papel es de primera y los colores muy vivos. 100% recomendado!", author: "María Cecilia R.", location: "Buenos Aires", initials: "MC" },
    { text: "Hice polaroids para mi casamiento y fueron un éxito total. Todos los invitados se llevaron una de recuerdo. El envío llegó rapidísimo y todo perfecto.", author: "Luciana G.", location: "Córdoba", initials: "LG" },
    { text: "Trabajo con ellos para regalos corporativos de mi empresa. Siempre cumplen con los plazos y la calidad es excelente. El equipo de atención es muy profesional.", author: "Juan Pablo M.", location: "Rosario", initials: "JP" },
    { text: "Le regalé un fotocuadro a mi mamá con fotos de toda la familia y lloró de la emoción. La impresión es espectacular y el marco muy elegante.", author: "Sofía F.", location: "Mendoza", initials: "SF" },
    { text: "Armé un álbum con las fotos de mi viaje a Europa y quedó espectacular. La calidad del papel y la impresión superaron mis expectativas.", author: "Martín D.", location: "La Plata", initials: "MD" },
    { text: "Pedí polaroids para el cumple de 15 de mi hija. Llegaron perfectas y fueron el hit de la fiesta. Todas las amigas se llevaron una de recuerdo!", author: "Carolina S.", location: "San Isidro", initials: "CS" },
    { text: "Como fotógrafo profesional, necesitaba un proveedor confiable para mis clientes. Printeart superó todas mis expectativas. Calidad premium.", author: "Diego L.", location: "Palermo", initials: "DL" },
    { text: "El fotolibro de mi boda quedó increíble. Cada página es una obra de arte. Mi esposa lloró cuando lo vio. Gracias por hacer esto posible!", author: "Federico M.", location: "Belgrano", initials: "FM" },
    { text: "Excelente atención al cliente. Tuve un problema con mi pedido y lo resolvieron en minutos. Eso habla muy bien de la empresa.", author: "Valentina P.", location: "Recoleta", initials: "VP" },
    { text: "Los cuadros para mi living quedaron espectaculares. La calidad de impresión es de galería de arte. Todos preguntan dónde los compré.", author: "Andrés K.", location: "Nordelta", initials: "AK" },
    { text: "Pedí un álbum para los 50 años de casados de mis padres. Fue el regalo más emotivo que pudimos darles. Calidad impecable.", author: "Romina T.", location: "Vicente López", initials: "RT" },
    { text: "Ya hice 5 pedidos y todos llegaron perfectos. La consistencia en la calidad es lo que más valoro. Son mi opción número uno.", author: "Gonzalo B.", location: "Pilar", initials: "GB" },
    { text: "Las fotos de mi embarazo en formato polaroid quedaron hermosas. Un recuerdo único que voy a guardar para siempre.", author: "Agustina V.", location: "Tigre", initials: "AV" },
    { text: "Usamos Printeart para los regalos de fin de año de nuestra empresa. Todos los empleados quedaron encantados.", author: "Patricia H.", location: "Puerto Madero", initials: "PH" },
    { text: "El packaging es tan lindo como el producto. Llegó todo perfectamente empaquetado. Se nota el cuidado en cada detalle.", author: "Nicolás R.", location: "Olivos", initials: "NR" },
    { text: "Hice un fotolibro de los primeros años de mi hijo y quedé fascinada. La calidad del papel, los colores, todo impecable.", author: "Florencia A.", location: "Caballito", initials: "FA" },
    { text: "Regalé polaroids personalizadas a mis amigas para navidad. Fue el regalo más original y todas quedaron encantadas.", author: "Camila E.", location: "Núñez", initials: "CE" },
    { text: "La interfaz para diseñar el álbum es súper intuitiva. En menos de una hora tenía todo listo. Y el resultado final, impresionante.", author: "Sebastián O.", location: "Almagro", initials: "SO" },
    { text: "Pedí fotos en todos los tamaños y formatos para probar. Todas llegaron perfectas. Ahora sé que puedo confiar en ellos.", author: "Laura C.", location: "Villa Urquiza", initials: "LC" },
    { text: "El cuadro canvas que pedí para mi oficina es espectacular. La calidad de impresión y los colores son exactamente como se ven en pantalla.", author: "Maximiliano J.", location: "Microcentro", initials: "MJ" },
    { text: "Mi abuela cumplió 90 años y le armamos un álbum con fotos de toda su vida. Fue el regalo más especial.", author: "Julieta N.", location: "San Telmo", initials: "JN" },
    { text: "Como diseñadora gráfica, soy muy exigente con la calidad de impresión. Printeart cumple con creces.", author: "Marina W.", location: "Palermo Soho", initials: "MW" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div className="hero-text animate-fade-in">
            <h1>Tus recuerdos, impresos <br /> con <span>calidad editorial.</span></h1>
            <p>Fotolibros, fotos y regalos personalizados. Envíos a todo el país.</p>
            <div className="badges">
              <span className="badge"><i className="fas fa-map-marker-alt"></i> Retiro en Martinez</span>
              <span className="badge"><i className="fab fa-whatsapp"></i> Soporte por WhatsApp</span>
              <span className="badge"><i className="fas fa-lock"></i> Pagos seguros</span>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL CARDS */}
      <section className="dual" id="categorias">
        <div className="container dual-grid">
          <div className="rec-card" id="fotolibros">
            <div className="rec-card__content">
              <h2>Para tus recuerdos</h2>
              <p className="card-desc">Fotolibros, polaroids y más para guardar tus mejores momentos</p>
              <button className="btn-rec" data-testid="btn-ver-productos">
                <i className="fas fa-heart"></i> Ver productos
              </button>
            </div>
          </div>

          <div className="corp-card" id="corporativo">
            <div className="corp-card__content">
              <h2>Para tu empresa</h2>
              <p className="card-desc">Merchandising, regalos corporativos y más para tu marca</p>
              <button className="btn-corp" onClick={() => navigate('/corporativo')} data-testid="btn-soluciones-corp">
                <i className="fas fa-building"></i> Soluciones Corporativas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="products" id="productos">
        <div className="container">
          <h2 className="section-title">Nuestros Productos destacados</h2>
          <div className="products-grid">
            <div className="product-card" data-testid="product-fotolibros">
              <img src="/assets/productos/caja_fotolibro.png" alt="Fotolibros" className="product-card__img" loading="lazy" />
              <div className="product-card__title">Fotolibros</div>
              <button className="btn-product">Ver opciones</button>
            </div>
            <div className="product-card" data-testid="product-polaroids">
              <img src="/assets/productos/caja_polaroid.png" alt="Polaroids" className="product-card__img" loading="lazy" />
              <div className="product-card__title">Polaroids</div>
              <button className="btn-product">Ver opciones</button>
            </div>
            <div className="product-card" data-testid="product-fotos-clasicas">
              <img src="https://images.pexels.com/photos/2780553/pexels-photo-2780553.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Fotos Clásicas" className="product-card__img" loading="lazy" />
              <div className="product-card__title">Fotos Clásicas</div>
              <button className="btn-product">Ver opciones</button>
            </div>
            <div className="product-card" data-testid="product-fotocuadros">
              <img src="https://images.pexels.com/photos/2232117/pexels-photo-2232117.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Fotocuadros" className="product-card__img" loading="lazy" />
              <div className="product-card__title">Fotocuadros</div>
              <button className="btn-product">Ver opciones</button>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="how" id="como-funciona">
        <div className="container">
          <h2 className="section-title">Cómo Funciona</h2>
          <div className="how-grid">
            <div className="step">
              <div className="step-icon"><i className="fas fa-hand-pointer"></i></div>
              <div className="step-number">1</div>
              <h3>Elegí tu producto</h3>
              <p>Explorá nuestro catálogo y elegí lo que más te guste</p>
            </div>
            <div className="step">
              <div className="step-icon"><i className="fas fa-cloud-upload-alt"></i></div>
              <div className="step-number">2</div>
              <h3>Subí tus fotos</h3>
              <p>Cargá tus imágenes y personalizá tu diseño fácilmente</p>
            </div>
            <div className="step">
              <div className="step-icon"><i className="fas fa-truck"></i></div>
              <div className="step-number">3</div>
              <h3>Imprimimos y enviamos</h3>
              <p>Recibí tu pedido en la puerta de tu casa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="clients" id="clientes">
        <div className="container">
          <h2 className="section-title">Nuestros Clientes Felices</h2>
          <div className="clients-grid">
            <div className="client">
              <img src="https://images.unsplash.com/photo-1563696629810-8f510c46ecf9?auto=format&fit=crop&w=400&q=80" alt="Cliente con fotolibro" loading="lazy" />
            </div>
            <div className="client">
              <img src="https://images.pexels.com/photos/11986518/pexels-photo-11986518.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Fotos polaroid" loading="lazy" />
            </div>
            <div className="client">
              <img src="https://images.unsplash.com/photo-1569100922032-b9702915dd02?auto=format&fit=crop&w=400&q=80" alt="Cámara polaroid" loading="lazy" />
            </div>
            <div className="client">
              <img src="https://images.pexels.com/photos/2983401/pexels-photo-2983401.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Álbum de fotos" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="reviews" id="testimonios">
        <div className="container">
          <h2 className="section-title">Lo que dicen de nosotros</h2>
          <div className="reviews-carousel">
            <button className="carousel-btn prev" onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)} aria-label="Anterior">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="reviews-track">
              {reviews.map((review, index) => (
                <div key={index} className={`review ${index === currentReview ? 'active' : ''}`}>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="review-author">
                    <div className="author-avatar">{review.initials}</div>
                    <div className="author-info">
                      <span className="author-name">{review.author}</span>
                      <span className="author-location">{review.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-btn next" onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)} aria-label="Siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="carousel-dots">
            {reviews.map((_, index) => (
              <div key={index} className={`carousel-dot ${index === currentReview ? 'active' : ''}`} onClick={() => setCurrentReview(index)}></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <i className="fas fa-camera-retro"></i>
              <span>+5000 clientes felices</span>
            </div>
            <h2>Transformá tus fotos en <span className="cta-highlight">arte impreso</span></h2>
            <p>Cada imagen cuenta una historia. Dejanos ayudarte a preservarla con la mejor calidad de impresión.</p>
            <div className="cta-buttons">
              <button className="btn cta-primary" data-testid="btn-empezar-ahora">
                <i className="fas fa-magic"></i> Crear mi proyecto
              </button>
              <button className="btn cta-secondary" data-testid="btn-ver-catalogo">
                <i className="fas fa-images"></i> Ver catálogo
              </button>
            </div>
            <div className="cta-trust">
              <div className="trust-item">
                <i className="fas fa-truck"></i>
                <span>Envío a todo el país</span>
              </div>
              <div className="trust-item">
                <i className="fas fa-shield-alt"></i>
                <span>Garantía de calidad</span>
              </div>
              <div className="trust-item">
                <i className="fas fa-headset"></i>
                <span>Soporte personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// CORPORATIVO PAGE
// ==========================================
const CorporativoPage = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const corpReviews = [
    { text: "Atención excelente; todo en tiempo y forma. Imprimo con Printeart hace años.", author: "Claudia F.", company: "Marketing & Ae Consulting", initials: "CF" },
    { text: "La calidad de las tarjetas personales superó nuestras expectativas. Nuestros ejecutivos quedaron encantados.", author: "Roberto M.", company: "Estudio Contable RM", initials: "RM" },
    { text: "Los folletos para nuestra feria quedaron impecables. Recibimos muchos elogios de clientes potenciales.", author: "Mariana L.", company: "Tech Solutions SA", initials: "ML" },
    { text: "Trabajamos con Printeart para todo nuestro material institucional. Siempre cumplen con los plazos.", author: "Carlos P.", company: "Inmobiliaria del Sur", initials: "CP" },
    { text: "Las carpetas corporativas son de una calidad increíble. Reflejan perfectamente nuestra imagen de marca.", author: "Ana G.", company: "Consultora Financiera AG", initials: "AG" },
  ];

  const corpProducts = [
    { title: "Tarjetas Personales", desc: "Imprimí tarjetas de presentación con calidad profesional.", img: "https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-id-card" },
    { title: "Folletos y Catálogos", desc: "Diseños atractivos ideales para promocionar tus productos y servicios.", img: "https://images.pexels.com/photos/5686476/pexels-photo-5686476.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-book" },
    { title: "Banners y Roll-Ups", desc: "Destacá tu marca en ferias, eventos y puntos de venta.", img: "https://images.pexels.com/photos/7683899/pexels-photo-7683899.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-scroll" },
    { title: "Carpetas Institucionales", desc: "Carpetas personalizadas y elegantes para tu empresa.", img: "https://images.pexels.com/photos/5717421/pexels-photo-5717421.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-folder" },
    { title: "Afiches y Posters", desc: "Atrae la atención a tus campañas con afiches de alta calidad.", img: "https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-image" },
    { title: "Merchandising", desc: "Llaveros, imanes, blocs de notas y más artículos personalizados.", img: "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-gift" },
    { title: "Packaging Personalizado", desc: "Cajas y empaques con tu marca para una presentación única.", img: "https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-box" },
    { title: "Calendarios Corporativos", desc: "Calendarios de escritorio y pared con tu branding.", img: "https://images.pexels.com/photos/1420709/pexels-photo-1420709.jpeg?auto=compress&cs=tinysrgb&w=400", icon: "fas fa-calendar-alt" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % corpReviews.length);
    }, 5000);
    window.scrollTo(0, 0);
    return () => clearInterval(interval);
  }, [corpReviews.length]);

  return (
    <div className="corp-page">
      {/* CORP HERO */}
      <section className="corp-hero">
        <div className="container">
          <div className="corp-hero-grid">
            <div className="corp-hero-text">
              <h1>Soluciones de impresión <br/>para <span>empresas.</span></h1>
              <p>Tarjetas, folletos, banners, carpetas y merchandising personalizado. Todo lo que tu empresa necesita, impreso con calidad y a tiempo.</p>
              <a href="mailto:hola@printeart.com?subject=Solicitud de Presupuesto Corporativo" className="btn-corp-cta">
                <i className="fas fa-file-invoice"></i> Pedir Presupuesto
              </a>
            </div>
            <div className="corp-hero-img">
              <img src="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Productos corporativos" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="corp-info">
        <div className="container">
          <div className="corp-info-single">
            <div className="corp-info-card contact full-width">
              <div className="corp-info-content">
                <h3>¿Tenés una consulta?</h3>
                <p>Asesoramiento personalizado en todo momento.</p>
                <div className="contact-methods">
                  <span><i className="fab fa-whatsapp"></i> WhatsApp las 24 hs.</span>
                  <span><i className="fas fa-phone"></i> +54 9 11 1234 5678</span>
                </div>
                <button className="btn-corp-outline">
                  Enviar Mensaje <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="corp-info-img contact-img">
                <img src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Contacto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS Y SERVICIOS */}
      <section className="corp-products">
        <div className="container">
          <h2 className="section-title">Productos y Servicios</h2>
          <div className="corp-products-grid">
            {corpProducts.map((product, index) => (
              <div key={index} className="corp-product-card">
                <div className="corp-product-img">
                  <img src={product.img} alt={product.title} loading="lazy" />
                </div>
                <h4>{product.title}</h4>
                <p>{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTES CORPORATIVOS */}
      <section className="corp-clients">
        <div className="container">
          <div className="corp-testimonials">
            <h3>Lo que dicen nuestros clientes</h3>
            <div className="corp-testimonial-card">
              <div className="corp-testimonial-img">
                <div className="testimonial-avatar">{corpReviews[currentReview].initials}</div>
              </div>
              <div className="corp-testimonial-content">
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p>"{corpReviews[currentReview].text}"</p>
                <div className="testimonial-author">
                  <strong>{corpReviews[currentReview].author}</strong>
                  <span>{corpReviews[currentReview].company}</span>
                </div>
              </div>
              <button className="testimonial-nav" onClick={() => setCurrentReview((prev) => (prev + 1) % corpReviews.length)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <div className="testimonial-dots">
              {corpReviews.map((_, index) => (
                <span key={index} className={`dot ${index === currentReview ? 'active' : ''}`} onClick={() => setCurrentReview(index)}></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORP CTA */}
      <section className="corp-cta">
        <div className="container">
          <div className="corp-cta-content">
            <h2>¿Tenés alguna duda extra?</h2>
            <p>¿Pensás que podemos hacer algo que no ves en el catálogo? Contactanos y lo charlamos.</p>
            <div className="corp-cta-buttons">
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="btn-corp-primary">
                <i className="fab fa-whatsapp"></i> Hablemos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <div className="pixel-app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/corporativo" element={<CorporativoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
