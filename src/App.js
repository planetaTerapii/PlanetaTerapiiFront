import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaInstagram } from "react-icons/fa";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/bgset/ls.bgset";
import { TbMapSearch } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import "./css/App.css";
import logoDesktop from "./images/logo-desktop.webp"; // Desktop logo
import logoMobile from "./images/logo-mobile.webp"; // Mobile logo
import ownerPhoto from "./images/profile.webp";
import backgroundDesktop from "./images/Background.webp";
import backgroundMobile from "./images/Background2.webp";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const sectionsRef = useRef([]);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleOutsideClick = (e) => {
    if (
      menuOpen &&
      !e.target.closest("nav") &&
      !e.target.closest(".hamburger") &&
      !e.target.closest("a")
    ) {
      setMenuOpen(false);
    } else if (menuOpen && e.target.closest("ul") && !e.target.closest("a")) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const offset = window.innerWidth <= 768 ? 80 : 140; // Adjusted offset to account for new padding/margin
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://twój-netlify-url/.netlify/functions/sendToTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await response.json();
      console.log(data.message);
      setFormSubmitted(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  

  return (
    <div className="App">
      <header id="header">
        <img
          data-srcset={`${backgroundMobile} 768w, ${backgroundDesktop} 1200w`}
          sizes="(max-width: 768px) 768px, 1200px"
          alt="Background"
          className="header-background lazyload"
        />
        <nav>
          <div className="nav-container">
            <img
              data-src={logoDesktop}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Logo"
              className="logo desktop-logo lazyload"
            />
            <img
              data-src={logoMobile}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Logo"
              className="logo mobile-logo lazyload"
            />
            <div className="hamburger" onClick={handleMenuToggle}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={menuOpen ? "active" : ""}>
              <li>
                <a href="#review" onClick={(e) => handleScroll(e, "review")}>
                  Хто ми
                </a>
              </li>
              <li>
                <a href="#service" onClick={(e) => handleScroll(e, "service")}>
                  Наші послуги
                </a>
              </li>
              <li>
                <a
                  href="#franchise"
                  onClick={(e) => handleScroll(e, "franchise")}
                >
                  Переваги франшизи
                </a>
              </li>
              <li>
                <a href="#points" onClick={(e) => handleScroll(e, "points")}>
                  Вимоги до франчайзі
                </a>
              </li>
              <li>
                <a href="#finance" onClick={(e) => handleScroll(e, "finance")}>
                  Фінансові умови
                </a>
              </li>
              <li>
                <a href="#stage" onClick={(e) => handleScroll(e, "stage")}>
                  Етапи відкриття
                </a>
              </li>
              <li>
                <a href="#support" onClick={(e) => handleScroll(e, "support")}>
                  Підтримка франчайзі
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
                  Контакти
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <section className="join-us-text">
          Приєднуйтесь до нашої родини та допоможіть дітям розкрити свій
          потенціал разом з Планета Терапії <br />
          <b>Де кожне слово має значення</b>
        </section>
        <section
          id="review"
          className="fade-up section-bg-blue"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <h2>Хто ми</h2>
          <div className="owner-section">
            <img
              data-src={ownerPhoto}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Owner"
              className="owner-photo lazyload"
            />
            <div className="owner-text">
              <p>
                Ми - центр корекції та розвитку мовлення для дітей, що сприяє
                мовленнєвому розвитку та соціальній інтеграції дітей з різними
                мовленнєвими порушеннями. Наша команда професіоналів, включаючи
                логопедів, психологів, педагогів та медичних працівників,
                допомагає дітям знайти свій голос і виразити себе.
              </p>
            </div>
          </div>
          <p className="owner-name">Ірина Волкова</p>
        </section>
        <section
          id="service"
          className="fade-up section-bg-yellow"
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <h2>Наші послуги</h2>
          <h3>Індивідуальні заняття:</h3>
          <ul>
            <li>
              <i className="fas fa-puzzle-piece list-icon"></i> Первинна
              діагностика (логопед)
            </li>
            <li>
              <i className="fas fa-child list-icon"></i> Психолог
            </li>
            <li>
              <i className="fas fa-brain list-icon"></i> Сенсорна інтеграція
            </li>
            <li>
              <i className="fas fa-comments list-icon"></i> Логопед
            </li>
            <li>
              <i className="fas fa-chalkboard-teacher list-icon"></i> Дефектолог
            </li>
            <li>
              <i className="fas fa-microscope list-icon"></i> Діагностика
              звуковимови
            </li>
            <li>
              <i className="fas fa-user-md list-icon"></i> Первинна діагностика
              (нейропсихолог)
            </li>
            <li>
              <i className="fas fa-user-nurse list-icon"></i> Нейропсихолог
            </li>
            <li>
              <i className="fas fa-hand-holding-heart list-icon"></i>{" "}
              Логопедичний масаж
            </li>
            <li>
              <i className="fas fa-basketball-ball list-icon"></i> Мозочкова
              стимуляція
            </li>
            <li>
              <i className="fas fa-dog list-icon"></i> Доготерапія
            </li>
            <li>
              <i className="fas fa-user-friends list-icon"></i> Консультація
              поведінкового терапевта
            </li>
            <li>
              <i className="fas fa-users list-icon"></i> Поведінковий терапевт
            </li>
            <li>
              <i className="fas fa-language list-icon"></i> Польська мова
            </li>
          </ul>

          <h3>Групові заняття:</h3>
          <ul>
            <li>
              <i className="fas fa-users list-icon"></i> Розвиток побутових та
              соціальних навичок
            </li>
            <li>
              <i className="fas fa-comments list-icon"></i> Розвиток мовлення
            </li>
            <li>
              <i className="fas fa-school list-icon"></i> Підготовка до школи
            </li>
            <li>
              <i className="fas fa-dog list-icon"></i> Доготерапія
            </li>
            <li>
              <i className="fas fa-language list-icon"></i> Польська мова
            </li>
          </ul>
        </section>
        <section
          id="franchise"
          className="fade-up section-bg-green"
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <h2>Переваги франшизи</h2>
          <ul>
            <li>
              <i className="fas fa-check-circle list-icon"></i> Перевірена
              модель бізнесу: Ви отримуєте доступ до перевіреної та успішної
              моделі ведення бізнесу.
            </li>
            <li>
              <i className="fas fa-graduation-cap list-icon"></i> Навчання та
              підтримка: Франчайзі отримують комплексне навчання та постійну
              підтримку на всіх етапах розвитку бізнесу.
            </li>
            <li>
              <i className="fas fa-map-marker-alt list-icon"></i> Ексклюзивність
              території: Захист від конкуренції всередині франчайзингової мережі
              на визначеній території.
            </li>
            <li>
              <i className="fas fa-bullhorn list-icon"></i> Маркетингова
              підтримка: Доступ до централізованих маркетингових кампаній та
              матеріалів.
            </li>
            <li>
              <i className="fas fa-cogs list-icon"></i> Розроблені програми:
              Готові програми розвитку, корекції та навчання для дітей різного
              віку.
            </li>
            <li>
              <i className="fas fa-building list-icon"></i> Бренд: Центр
              розвитку та корекції є брендом, що надає послуги з розвитку та
              корекції.
            </li>
            <li>
              <i className="fas fa-briefcase list-icon"></i> Тип франшизи:
              Бізнес-франшиза дозволяє вести бізнес під відомим брендом з
              підтримкою та інструкціями.
            </li>
            <li>
              <i className="fas fa-city list-icon"></i> Розташування: Франшиза
              може бути відкрита в будь-якому місті Польщі, що забезпечує
              гнучкість у виборі локації.
            </li>
          </ul>
        </section>
        <section
          id="points"
          className="fade-up section-bg-orange"
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <h2>Вимоги до франчайзі</h2>
          <ul>
            <li>
              <i className="fas fa-wallet list-icon"></i> Фінансові ресурси:
              Наявність необхідного капіталу для інвестицій.
            </li>
            <li>
              <i className="fas fa-user-graduate list-icon"></i> Досвід роботи з
              дітьми: Бажано мати досвід роботи з дітьми або в освіті.
            </li>
            <li>
              <i className="fas fa-heart list-icon"></i> Відданість справі:
              Готовність працювати для покращення життя дітей.
            </li>
          </ul>
        </section>
        <section
          id="finance"
          className="fade-up section-bg-purple"
          ref={(el) => (sectionsRef.current[5] = el)}
        >
          <h2>Фінансові умови</h2>
          <div className="finance-container">
            <div className="finance-item">
              <div className="finance-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="finance-text">
                <h3>Первинний внесок</h3>
                <p>$10,000</p>
              </div>
            </div>
            <div className="finance-item">
              <div className="finance-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="finance-text">
                <h3>Роялті</h3>
                <p>2% від щомісячного доходу</p>
              </div>
            </div>
            <div className="finance-item">
              <div className="finance-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="finance-text">
                <h3>Інвестиції</h3>
                <p>від $10,000 (в залежності від міста)</p>
              </div>
            </div>
            <div className="finance-item">
              <div className="finance-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="finance-text">
                <h3>Дохідність</h3>
                <p>$5000 чистого прибутку щомісяця</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="stage"
          className="fade-up section-bg-pink"
          ref={(el) => (sectionsRef.current[6] = el)}
        >
          <h2>Етапи відкриття</h2>
          <ol>
            <li>
              <i className="fas fa-file-signature list-icon"></i> Заявка:
              Подання заявки на франшизу.
            </li>
            <li>
              <i className="fas fa-comments list-icon"></i> Співбесіда: Інтерв'ю
              з потенційним франчайзі.
            </li>
            <li>
              <i className="fas fa-handshake list-icon"></i> Підписання
              договору: Погодження умов та підписання франчайзингового договору.
            </li>
            <li>
              <i className="fas fa-chalkboard-teacher list-icon"></i> Навчання:
              Проходження обов'язкового навчання.
            </li>
            <li>
              <i className="fas fa-tools list-icon"></i> Підготовка приміщення:
              Вибір та облаштування приміщення згідно стандартів.
            </li>
            <li>
              <i className="fas fa-ribbon list-icon"></i> Відкриття: Офіційне
              відкриття центру з участю представників франчайзера.
            </li>
          </ol>
        </section>
        <section
          id="support"
          className="fade-up section-bg-cyan"
          ref={(el) => (sectionsRef.current[7] = el)}
        >
          <h2>Підтримка франчайзі</h2>
          <ul>
            <li>
              <i className="fas fa-chalkboard-teacher list-icon"></i> Навчання
              персоналу: Проведення тренінгів та семінарів для працівників.
            </li>
            <li>
              <i className="fas fa-book list-icon"></i> Методична підтримка:
              Надання методичних матеріалів та програм.
            </li>
            <li>
              <i className="fas fa-headset list-icon"></i> Консультації:
              Постійні консультації з питань ведення бізнесу.
            </li>
            <li>
              <i className="fas fa-check-circle list-icon"></i> Контроль якості:
              Регулярний моніторинг та оцінка роботи центру.
            </li>
          </ul>
        </section>
        <section
          id="contact"
          className="fade-up section-bg-lightblue"
          ref={(el) => (sectionsRef.current[8] = el)}
        >
          <h2>Контакти</h2>
          {formSubmitted ? (
            <div
              className={`success-message ${
                showSuccessMessage ? "visible" : ""
              }`}
            >
              Ваше повідомлення було успішно надіслано!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Ім'я:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Адрес e-mail:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Номер телефону:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div style={{ flexBasis: "100%" }}>
                <label htmlFor="message">Повідомлення:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit">Відправити</button>
            </form>
          )}
          {responseMessage && <p>{responseMessage}</p>}
          <div className="contact-icons">
            <a
              href="https://www.instagram.com/planetaterapii_wro?igsh=MWFtejEyM3pmajZjZA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://maps.app.goo.gl/N9vg83jSJXqW2MYs8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TbMapSearch"
            >
              <TbMapSearch />
            </a>
            <a
              href="https://booksy.com/pl-pl/232531_planeta-terapii_zdrowie_13750_wroclaw#ba_s=seo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FaRegCalendarCheck"
            >
              <FaRegCalendarCheck />
            </a>
            <a
                href="https://www.facebook.com/planeta.terapii.wro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FaFacebook"
              >
                <FaFacebook />
              </a>
          </div>
        </section>
      </main>
      <footer>
        <p>© 2024 Планета Терапії</p>
      </footer>
    </div>
  );
}

export default App;
