import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaInstagram } from "react-icons/fa";
import { TbMapSearch } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa6";
import "./App.css";
import logoDesktop from "./images/logo-desktop.png"; // Desktop logo
import logoMobile from "./images/logo-mobile.png"; // Mobile logo

import teamImage1 from "./team/team1.webp";
import teamImage2 from "./team/team2.webp";
import teamImage3 from "./team/team3.webp";
import teamImage4 from "./team/team4.webp";
import teamImage5 from "./team/team5.webp";
import teamImage6 from "./team/team6.webp";
import teamImage7 from "./team/team7.webp";
import teamImage8 from "./team/team8.webp";
import teamImage9 from "./team/team9.webp";
import teamImage10 from "./team/team10.webp";

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
    const offset = window.innerWidth <= 768 ? 60 : 100;
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
    const response = await fetch(
      "https://planetaterapiibackend.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      }
    );
    const data = await response.json();
    console.log(data.message);
    setFormSubmitted(true);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <div className="App">
      <header id="header">
        <nav>
          <div className="nav-container">
            <img
              src={logoDesktop}
              alt="Logo"
              className="logo desktop-logo"
              onClick={(e) => handleScroll(e, "header")}
            />
            <img
              src={logoMobile}
              alt="Logo"
              className="logo mobile-logo"
              onClick={(e) => handleScroll(e, "header")}
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
                <a href="#price" onClick={(e) => handleScroll(e, "price")}>
                  Вартість
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => handleScroll(e, "team")}>
                  Наша команда
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
        <div className="join-us-text">
          Приєднуйтесь до нашої родини та допоможіть дітям розкрити свій
          потенціал разом з Планета Терапії <br />
          <b>Де кожне слово має значення</b>
        </div>
      </header>
      <main>
        <section
          id="review"
          className="fade-up"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <h2>Хто ми</h2>
          <p>
            Ми - центр корекції та розвитку мовлення для дітей, організація, яка
            стоїть на передовій боротьби за мовленнєве розвиток і соціальну
            інтеграцію дітей з різними формами мовленнєвих порушень. <br />
            Наша місія - забезпечити кожній дитині можливість знайти власний
            голос і виразити себе у повній мірі, відкриваючи нові горизонти для
            їхнього майбутнього. Ми віримо в силу спілкування як основу для
            розуміння, навчання та взаємодії з навколишнім світом. Наша робота
            заснована на глибокій емпатії до кожної дитини та її сім'ї, і ми
            прагнемо створити середовище, де кожен може відчувати себе безпечно,
            підтримано і здатним до росту. <br />
            Наша команда - це згуртована група професіоналів, включаючи
            логопедів, психологів, педагогів та медичних працівників, які
            присвятили себе цій важливій справі. Ми об'єднані спільною метою -
            розширювати можливості дітей через індивідуально адаптовані програми
            розвитку мовлення, інтегруючи найновіші наукові дослідження та
            інноваційні методики в нашу роботу. <br />В нашому центрі ми не
            просто працюємо над поліпшенням мовленнєвих навичок; ми створюємо
            майбутнє, де кожна дитина може впевнено стати на шлях самовираження
            та самореалізації. Ми пишаємося можливістю впливати на життя,
            змінювати їх на краще, надаючи дітям інструменти та віру в себе, щоб
            розвивати свої таланти і здібності в повній мірі.
          </p>
        </section>
        <section
          id="price"
          className="fade-up"
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <h2>Вартість</h2>
          <h3>Індивідуальні заняття:</h3>
          <ul>
            <li>Первинна діагностика (логопед) — 250 zł</li>
            <li>Психолог — 180 zł</li>
            <li>Сенсорна інтеграція — 160 zł</li>
            <li>Логопед — 120 zł - 45 хв | 100 zł - 30 хв</li>
            <li>Дефектолог — 120 zł - 45 хв | 100 zł - 30 хв</li>
            <li>Діагностика звуковимови — 160 zł - 45 хв</li>
            <li>Первинна діагностика (нейропсихолог) — 250 zł</li>
            <li>Нейропсихолог — 120 zł</li>
            <li>Логопедичний масаж — 70 zł - 20 хв</li>
            <li>Мозочкова стимуляція — 140 zł</li>
            <li>Доготерапія — 120 zł - 45 хв | 100 zł - 30 хв</li>
            <li>Консультація поведінкового терапевта — 160 zł</li>
            <li>Поведінковий терапевт — 120 zł</li>
            <li>Польська мова — 120 zł - 45 хв</li>
          </ul>

          <h3>Групові заняття:</h3>
          <ul>
            <li>Розвиток побутових та соціальних навичок — 120 zł - 2 год</li>
            <li>Розвиток мовлення — 120 zł - 2 год</li>
            <li>Підготовка до школи — 140 zł - 2 год</li>
            <li>Доготерапія — 80 zł - 1 год</li>
            <li>Польська мова — 100 zł - 1 год</li>
          </ul>
        </section>
        <section
          id="team"
          className="fade-up"
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <h2>Наша команда</h2>
          <div className="team-images">
            <img src={teamImage1} alt="Team Member 1" />
            <img src={teamImage2} alt="Team Member 2" />
            <img src={teamImage3} alt="Team Member 3" />
            <img src={teamImage4} alt="Team Member 4" />
            <img src={teamImage5} alt="Team Member 5" />
            <img src={teamImage6} alt="Team Member 6" />
            <img src={teamImage7} alt="Team Member 7" />
            <img src={teamImage8} alt="Team Member 8" />
            <img src={teamImage9} alt="Team Member 9" />
            <img src={teamImage10} alt="Team Member 10" />
          </div>
        </section>
        <section
          id="franchise"
          className="fade-up"
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <h2>Переваги франшизи</h2>
          <ul>
            <li>
              Перевірена модель бізнесу: Ви отримуєте доступ до перевіреної та
              успішної моделі ведення бізнесу.
            </li>
            <li>
              Навчання та підтримка: Франчайзі отримують комплексне навчання та
              постійну підтримку на всіх етапах розвитку бізнесу.
            </li>
            <li>
              Ексклюзивність території: Захист від конкуренції всередині
              франчайзингової мережі на визначеній території.
            </li>
            <li>
              Маркетингова підтримка: Доступ до централізованих маркетингових
              кампаній та матеріалів.
            </li>
            <li>
              Розроблені програми: Готові програми розвитку, корекції та
              навчання для дітей різного віку.
            </li>
            <li>
              Бренд: Центр розвитку та корекції є брендом, що надає послуги з
              розвитку та корекції.
            </li>
            <li>
              Тип франшизи: Бізнес-франшиза дозволяє вести бізнес під відомим
              брендом з підтримкою та інструкціями.
            </li>
            <li>
              Розташування: Франшиза може бути відкрита в будь-якому місті
              Польщі, що забезпечує гнучкість у виборі локації.
            </li>
          </ul>
        </section>
        <section
          id="points"
          className="fade-up"
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <h2>Вимоги до франчайзі</h2>
          <ul>
            <li>
              Фінансові ресурси: Наявність необхідного капіталу для інвестицій.
            </li>
            <li>
              Досвід роботи з дітьми: Бажано мати досвід роботи з дітьми або в
              освіті.
            </li>
            <li>
              Відданість справі: Готовність працювати для покращення життя
              дітей.
            </li>
          </ul>
        </section>
        <section
          id="finance"
          className="fade-up"
          ref={(el) => (sectionsRef.current[5] = el)}
        >
          <h2>Фінансові умови</h2>
          <ul>
            <li>Первинний внесок:** $10,000</li>
            <li>Роялті: 2%від щомісячного доходу</li>
            <li>Інвестиції від 10 000$( в залежності від міста)</li>
            <li>Дохідність: 5000$чистого прибутку щомісяця</li>
          </ul>
        </section>
        <section
          id="stage"
          className="fade-up"
          ref={(el) => (sectionsRef.current[6] = el)}
        >
          <h2>Етапи відкриття</h2>
          <ol>
            <li>Заявка: Подання заявки на франшизу.</li>
            <li>Співбесіда: Інтерв'ю з потенційним франчайзі.</li>
            <li>
              Підписання договору: Погодження умов та підписання
              франчайзингового договору.
            </li>
            <li>Навчання: Проходження обов'язкового навчання.</li>
            <li>
              Підготовка приміщення: Вибір та облаштування приміщення згідно
              стандартів.
            </li>
            <li>
              Відкриття: Офіційне відкриття центру з участю представників
              франчайзера.
            </li>
          </ol>
        </section>
        <section
          id="support"
          className="fade-up"
          ref={(el) => (sectionsRef.current[7] = el)}
        >
          <h2>Підтримка франчайзі</h2>
          <ul>
            <li>
              Навчання персоналу: Проведення тренінгів та семінарів для
              працівників.
            </li>
            <li>
              Методична підтримка: Надання методичних матеріалів та програм.
            </li>
            <li>
              Консультації: Постійні консультації з питань ведення бізнесу.
            </li>
            <li>
              Контроль якості: Регулярний моніторинг та оцінка роботи центру.
            </li>
          </ul>
        </section>
        <section
          id="contact"
          className="fade-up"
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
