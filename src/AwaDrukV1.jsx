import { useState, useEffect, useRef } from "react";

const COLORS = {
  purple: "#5c2d91",
  purpleLight: "#7b45b8",
  purpleDark: "#3a1a60",
  purpleBg: "#f4f0fa",
  accent: "#f0c040",
  text: "#1a1a2e",
  textMuted: "#6b6b8a",
  white: "#ffffff",
  light: "#f9f8fc",
  border: "#ece6f5",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Lato', sans-serif; color: #1a1a2e; background: #fff; overflow-x: hidden; }
  a { text-decoration: none; }
  button { cursor: pointer; border: none; background: none; font-family: inherit; }

  .rainbow-bar {
    height: 5px;
    background: linear-gradient(90deg,
      #e53935 0%,#e53935 7.14%,
      #fb8c00 7.14%,#fb8c00 14.28%,
      #fdd835 14.28%,#fdd835 21.42%,
      #43a047 21.42%,#43a047 28.56%,
      #00acc1 28.56%,#00acc1 35.7%,
      #1e88e5 35.7%,#1e88e5 42.84%,
      #8e24aa 42.84%,#8e24aa 50%,
      #e53935 50%,#e53935 57.14%,
      #fb8c00 57.14%,#fb8c00 64.28%,
      #fdd835 64.28%,#fdd835 71.42%,
      #43a047 71.42%,#43a047 78.56%,
      #00acc1 78.56%,#00acc1 85.7%,
      #1e88e5 85.7%,#1e88e5 92.84%,
      #8e24aa 92.84%,#8e24aa 100%
    );
  }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid #ece6f5;
    padding: 0 6%;
    display: flex; align-items: center; justify-content: space-between;
    height: 70px;
    box-shadow: 0 1px 20px rgba(90,45,130,0.06);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px;
  }
  .nav-logo-box {
    width: 42px; height: 42px;
    background: #5c2d91;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-weight: 900; font-size: 14px; color: #fff; letter-spacing: -0.5px;
  }
  .nav-logo-text { font-family: 'Outfit', sans-serif; }
  .nav-logo-name { font-weight: 800; font-size: 16px; color: #3a1a60; display: block; }
  .nav-logo-sub { font-weight: 300; font-size: 10px; color: #6b6b8a; letter-spacing: 2px; text-transform: uppercase; display: block; }
  .nav-links { display: flex; gap: 2px; list-style: none; }
  .nav-links a {
    padding: 8px 16px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: #6b6b8a;
    transition: all 0.2s; display: block;
  }
  .nav-links a:hover { color: #5c2d91; background: #f4f0fa; }
  .nav-links a.active { background: #5c2d91; color: #fff; font-weight: 600; }

  /* HERO */
  .hero {
    background: linear-gradient(140deg, #3a1a60 0%, #5c2d91 55%, #7b45b8 100%);
    padding: 90px 6% 80px;
    position: relative; overflow: hidden;
  }
  .hero-blob1 {
    position: absolute; top: -120px; right: -80px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
  }
  .hero-blob2 {
    position: absolute; bottom: -160px; left: 5%;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
  }
  .hero-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    position: relative; z-index: 1;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.22);
    color: rgba(255,255,255,0.88);
    padding: 5px 15px; border-radius: 40px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase;
    margin-bottom: 22px;
  }
  .hero h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(34px, 4vw, 52px); font-weight: 900;
    color: #fff; line-height: 1.12; margin-bottom: 20px;
  }
  .hero h1 em { font-style: normal; color: #f0c040; }
  .hero-desc {
    font-size: 16px; color: rgba(255,255,255,0.72); line-height: 1.75;
    margin-bottom: 36px; max-width: 450px;
  }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-white {
    background: #fff; color: #5c2d91;
    padding: 13px 26px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 14px;
    transition: all 0.25s; box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    display: inline-block;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.22); }
  .btn-ghost {
    background: transparent; color: #fff;
    padding: 13px 26px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 14px;
    border: 2px solid rgba(255,255,255,0.32); transition: all 0.25s;
    display: inline-block;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.55); }

  /* HERO CARDS */
  .hero-cards {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  .hero-card {
    background: rgba(255,255,255,0.09);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 16px; padding: 22px 18px;
    backdrop-filter: blur(8px);
    transition: transform 0.3s, background 0.3s;
  }
  .hero-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.14); }
  .hero-card.wide { grid-column: span 2; }
  .hero-card-emoji { font-size: 30px; margin-bottom: 10px; display: block; }
  .hero-card h3 {
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
    color: #fff; margin-bottom: 6px;
  }
  .hero-card p { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.5; }

  /* STATS */
  .stats { background: #f4f0fa; padding: 48px 6%; border-bottom: 1px solid #ece6f5; }
  .stats-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
  }
  .stat {
    background: #fff; border: 1px solid #ece6f5;
    border-radius: 16px; padding: 28px 20px; text-align: center;
    box-shadow: 0 2px 16px rgba(90,45,130,0.05);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .stat:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(90,45,130,0.1); }
  .stat-num {
    font-family: 'Outfit', sans-serif; font-size: 38px; font-weight: 900;
    color: #5c2d91; line-height: 1; margin-bottom: 6px;
  }
  .stat-label { font-size: 13px; color: #6b6b8a; font-weight: 500; }

  /* SECTIONS */
  .section { padding: 90px 6%; }
  .section-light { background: #f9f8fc; }
  .section-dark { background: #3a1a60; position: relative; overflow: hidden; }
  .section-center { text-align: center; }

  .section-tag {
    display: inline-block;
    background: #f4f0fa; color: #5c2d91;
    padding: 5px 14px; border-radius: 40px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 14px;
  }
  .section-tag-light {
    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8);
  }
  .section-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(28px, 3vw, 42px); font-weight: 800;
    color: #1a1a2e; line-height: 1.18; margin-bottom: 14px;
  }
  .section-title em { font-style: normal; color: #5c2d91; }
  .section-title-light { color: #fff; }
  .section-title-light em { color: #f0c040; }
  .section-sub {
    font-size: 16px; color: #6b6b8a; line-height: 1.72; max-width: 540px;
  }
  .section-sub-center { margin: 0 auto; }
  .section-sub-light { color: rgba(255,255,255,0.6); }
  .section-header { margin-bottom: 60px; }

  /* OFFER GRID */
  .offer-grid {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 22px;
  }
  .offer-card {
    background: #fff; border: 1px solid #ece6f5;
    border-radius: 18px; padding: 0 0 24px;
    transition: all 0.3s; overflow: hidden; position: relative;
  }
  .offer-card:hover {
    border-color: #7b45b8;
    box-shadow: 0 12px 40px rgba(90,45,130,0.13);
    transform: translateY(-5px);
  }
  .offer-card-top-bar {
    height: 3px; background: #5c2d91;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .offer-card:hover .offer-card-top-bar { transform: scaleX(1); }

  /* IMAGE PLACEHOLDER */
  .img-slot {
    width: 100%; aspect-ratio: 4/3;
    background: #f4f0fa;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    border-bottom: 1px dashed #d8cef0;
    margin-bottom: 18px;
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .offer-card:hover .img-slot { background: #ede6f8; }
  .img-slot-emoji { font-size: 46px; pointer-events: none; }
  .img-slot-label {
    font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
    color: #b0a0cc; margin-top: 8px; font-weight: 600;
  }
  /* For easy image replacement: just put <img src="..." /> inside .img-slot and remove emoji */

  .offer-card-body { padding: 0 20px; }
  .offer-card h3 {
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    color: #1a1a2e; margin-bottom: 8px;
  }
  .offer-card p { font-size: 13px; color: #6b6b8a; line-height: 1.65; }

  /* HOW TO ORDER */
  .dark-blob {
    position: absolute; top: -180px; right: -150px;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .steps-wrapper { max-width: 1140px; margin: 0 auto; position: relative; z-index: 1; }
  .steps-connector {
    position: absolute; top: 40px; left: calc(12.5% + 28px); right: calc(12.5% + 28px);
    height: 1px; background: rgba(255,255,255,0.15);
  }
  .steps-grid {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 24px;
  }
  .step { text-align: center; }
  .step-icon {
    width: 66px; height: 66px; margin: 0 auto 20px;
    background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; transition: all 0.3s;
  }
  .step:hover .step-icon { background: #f0c040; border-color: #f0c040; }
  .step h3 {
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    color: #fff; margin-bottom: 10px; line-height: 1.3;
  }
  .step p { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.65; }
  .step p a { color: #f0c040; }
  .file-note {
    max-width: 1140px; margin: 40px auto 0;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 16px 24px;
    font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.75;
    position: relative; z-index: 1;
  }

  /* ABOUT */
  .about-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .about-features {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px;
  }
  .about-feat {
    background: #f4f0fa; border: 1px solid #ece6f5;
    border-radius: 14px; padding: 20px 16px;
    transition: box-shadow 0.2s;
  }
  .about-feat:hover { box-shadow: 0 4px 18px rgba(90,45,130,0.1); }
  .about-feat-icon { font-size: 22px; margin-bottom: 8px; display: block; }
  .about-feat h4 {
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
    color: #1a1a2e; margin-bottom: 4px;
  }
  .about-feat p { font-size: 12px; color: #6b6b8a; line-height: 1.55; }

  /* ABOUT IMAGE */
  .about-img-wrap { position: relative; }
  .about-img-slot {
    background: #f4f0fa; border-radius: 20px;
    aspect-ratio: 4/3; border: 2px dashed #d8cef0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 70px;
  }
  .about-img-slot-label { font-size: 11px; color: #b0a0cc; margin-top: 10px; letter-spacing: 0.5px; }
  .about-badge {
    position: absolute; bottom: -20px; right: -20px;
    background: #5c2d91; color: #fff;
    border-radius: 14px; padding: 14px 20px;
    font-family: 'Outfit', sans-serif; text-align: center;
    box-shadow: 0 8px 28px rgba(92,45,145,0.35);
  }
  .about-badge-num { font-size: 30px; font-weight: 900; line-height: 1; display: block; }
  .about-badge-text { font-size: 12px; font-weight: 600; opacity: 0.85; }

  /* CONTACT */
  .contact-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px;
  }
  .contact-block { margin-bottom: 28px; }
  .contact-block-title {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #5c2d91; margin-bottom: 12px;
    display: block;
  }
  .contact-item {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 9px; font-size: 14px; color: #1a1a2e;
  }
  .contact-item-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .contact-item a { color: #5c2d91; }
  .contact-item a:hover { text-decoration: underline; }
  .contact-divider { border: none; border-top: 1px solid #ece6f5; margin: 20px 0; }
  .map-slot {
    background: #f4f0fa; border-radius: 14px; height: 180px;
    border: 2px dashed #d8cef0; margin-top: 22px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 30px; color: #9970cc;
  }
  .map-slot p { font-size: 11px; color: #b0a0cc; margin-top: 6px; letter-spacing: 0.5px; }

  /* FORM */
  .contact-form {
    background: #fff; border: 1px solid #ece6f5;
    border-radius: 20px; padding: 40px;
    box-shadow: 0 4px 32px rgba(90,45,130,0.07);
  }
  .contact-form h3 {
    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800;
    color: #1a1a2e; margin-bottom: 28px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .form-field label {
    font-size: 11px; font-weight: 700; color: #6b6b8a;
    letter-spacing: 0.8px; text-transform: uppercase;
  }
  .form-field input, .form-field textarea {
    border: 1.5px solid #ece6f5; border-radius: 10px;
    padding: 12px 16px; font-family: 'Lato', sans-serif;
    font-size: 14px; color: #1a1a2e; background: #f9f8fc;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
  }
  .form-field input:focus, .form-field textarea:focus {
    border-color: #7b45b8; box-shadow: 0 0 0 3px rgba(92,45,145,0.08); background: #fff;
  }
  .form-field textarea { min-height: 110px; }
  .btn-send {
    width: 100%; background: #5c2d91; color: #fff;
    padding: 15px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.25s; letter-spacing: 0.3px;
    box-shadow: 0 4px 16px rgba(92,45,145,0.2);
  }
  .btn-send:hover {
    background: #7b45b8; transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(92,45,145,0.28);
  }

  /* FOOTER */
  .footer {
    background: #2d1250; color: rgba(255,255,255,0.65);
    padding: 28px 6%;
  }
  .footer-inner {
    max-width: 1140px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap;
  }
  .footer-inner p { font-size: 13px; }
  .footer-inner a { color: rgba(255,255,255,0.45); font-size: 13px; }
  .footer-inner a:hover { color: #fff; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .anim { animation: fadeUp 0.55s ease both; }
  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.18s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.38s; }

  /* RESPONSIVE */
  @media (max-width: 1000px) {
    .offer-grid { grid-template-columns: repeat(2,1fr); }
    .stats-inner { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 860px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-cards { display: none; }
    .about-inner, .contact-inner { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: repeat(2,1fr); }
    .steps-connector { display: none; }
  }
  @media (max-width: 600px) {
    .offer-grid, .steps-grid { grid-template-columns: 1fr; }
    .stats-inner { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .nav-links a { padding: 6px 10px; font-size: 13px; }
    .contact-form { padding: 24px; }
  }
`;

const offerItems = [
  { emoji: "✏️", title: "Gadzety reklamowe", desc: "Grawer laserowa na długopisach, nadruki na kubkach, smyczach i wielu innych. Obdaruj klientów gadżetem z Twoim logo!" },
  { emoji: "📋", title: "Materiały reklamowe", desc: "Wizytówki, ulotki, plakaty, koperty, kalendarze, naklejki, notesy, broszury — w różnych formatach." },
  { emoji: "🖨️", title: "Druk cyfrowy", desc: "Możliwość wydrukowania wielu rzeczy w wysokiej jakości przy małym nakładzie." },
  { emoji: "🚗", title: "Nadruki na samochody", desc: "Oklejanie samochodów firmowych — doskonały sposób na reklamę. Oprócz wydruku oferujemy też montaż." },
  { emoji: "📚", title: "Publikacje", desc: "Gazety, czasopisma, tygodniki, książki i albumy. Zadbamy o wysoką jakość wydruku." },
  { emoji: "🗺️", title: "Druk wielkoformatowy", desc: "Banery, roll-upy, billboardy, nadruki na foliach, fototapety, mapy, kalendarze w wielkich formatach. Możliwość nacinania." },
  { emoji: "📄", title: "Ksero", desc: "W biurze naszej firmy możliwość szybkiego kserowania ważnych dokumentów, notatek itp." },
  { emoji: "🗞️", title: "Druk offsetowy", desc: "Offsetowa metoda drukowania — wysoka jakość wydruków w dużych nakładach. Im więcej drukujesz, tym mniej płacisz." },
  { emoji: "📝", title: "Druki", desc: "Wydruk wszystkich niezbędnych druków do prowadzenia firmy na papierze samokopiującym." },
  { emoji: "🔖", title: "Pieczątki", desc: "Pieczątki w różnych wielkościach i kształtach — z mechanizmem automatycznym i tradycyjne." },
  { emoji: "📗", title: "Usługi introligatorskie", desc: "Oprawy: zeszyty miękkie i twarde, oprawy czasopism, dokumentów itp." },
  { emoji: "📅", title: "Kalendarze", desc: "Różne typy kalendarzy: wiszące, trójdzielne, na biurko, planszowe i w sprężynie — w wybranej tematyce." },
  { emoji: "📦", title: "Opakowania", desc: "Chcesz zadbać o estetyczny wygląd Twoich produktów? Wydrukujemy i wytniemy dla nich opakowania." },
  { emoji: "💌", title: "Zaproszenia", desc: "Zaproszenia o dowolnej tematyce — ślubne, komunijne, konferencyjne i zjazdy." },
  { emoji: "🪧", title: "Tabliczki informacyjne", desc: "Różnego rodzaju tabliczki informacyjne czy znamionowe metodą grawerowania laserowego." },
  { emoji: "👕", title: "Koszulki", desc: "Dowolne nadruki na dobrej jakości koszulkach." },
];

export default function AWADruk() {
  const [activeNav, setActiveNav] = useState("start");

  return (
    <>
      <style>{css}</style>
      <div className="rainbow-bar" />

      {/* NAV */}
      <nav className="nav">
        <a href="#start" className="nav-logo" onClick={() => setActiveNav("start")}>
          <div className="nav-logo-box">AWA</div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">AWA-DRUK</span>
            <span className="nav-logo-sub">Drukarnia</span>
          </div>
        </a>
        <ul className="nav-links">
          {[
            { id: "start", label: "Start" },
            { id: "oferta", label: "Oferta" },
            { id: "o-nas", label: "O nas" },
            { id: "jak-zamowic", label: "Jak zamówić" },
            { id: "kontakt", label: "Kontakt" },
          ].map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeNav === id ? "active" : ""}
                onClick={() => setActiveNav(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div id="start">
        <section className="hero">
          <div className="hero-blob1" />
          <div className="hero-blob2" />
          <div className="hero-inner">
            <div>
              <span className="hero-badge anim">Ponad 20 lat doświadczenia</span>
              <h1 className="anim d1">Twoja drukarnia<br />w <em>Radzyniu Podlaskim</em></h1>
              <p className="hero-desc anim d2">
                Oferujemy szeroki zakres usług drukarskich — od wizytówek po wielkoformatowe banery.
                Stale inwestujemy w nowe technologie i sprzęt najwyższej jakości.
              </p>
              <div className="hero-btns anim d3">
                <a href="#oferta" className="btn-white" onClick={() => setActiveNav("oferta")}>
                  Zobacz ofertę →
                </a>
                <a href="#kontakt" className="btn-ghost" onClick={() => setActiveNav("kontakt")}>
                  Skontaktuj się
                </a>
              </div>
            </div>
            <div className="hero-cards anim d4">
              <div className="hero-card wide">
                <span className="hero-card-emoji">🖨️</span>
                <h3>Druk offsetowy i cyfrowy</h3>
                <p>Wysoka jakość zarówno w małym, jak i dużym nakładzie. CMYK oraz PANTONE.</p>
              </div>
              <div className="hero-card">
                <span className="hero-card-emoji">🎁</span>
                <h3>Gadżety reklamowe</h3>
                <p>Nadruki na kubkach, długopisach i więcej.</p>
              </div>
              <div className="hero-card">
                <span className="hero-card-emoji">🚗</span>
                <h3>Nadruki na pojazdy</h3>
                <p>Oklejanie i wydruk na samochodach firmowych.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stats-inner">
          {[
            { num: "20+", label: "lat doświadczenia" },
            { num: "675×480", label: "mm format arkusza" },
            { num: "400", label: "linii/sek naświetlarka" },
            { num: "300 dpi", label: "rozdzielczość min." },
          ].map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFER */}
      <section id="oferta" className="section section-light">
        <div className="section-header section-center">
          <span className="section-tag">Nasza oferta</span>
          <h2 className="section-title">Co możemy dla Ciebie <em>wydrukować?</em></h2>
          <p className="section-sub section-sub-center">
            Kompleksowa obsługa poligraficzna — od projektu, przez druk, aż po wykończenie introligatorskie.
          </p>
        </div>
        <div className="offer-grid">
          {offerItems.map((item, i) => (
            <div className="offer-card" key={i}>
              <div className="offer-card-top-bar" />
              {/* IMAGE SLOT — replace emoji with <img src="..." alt="..." style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
              <div className="img-slot">
                <span className="img-slot-emoji">{item.emoji}</span>
                <span className="img-slot-label">zdjęcie</span>
              </div>
              <div className="offer-card-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="jak-zamowic" className="section section-dark">
        <div className="dark-blob" />
        <div className="section-header section-center">
          <span className="section-tag section-tag-light">Zamówienie</span>
          <h2 className="section-title section-title-light">Jak <em>zamówić?</em></h2>
          <p className="section-sub section-sub-center section-sub-light">
            Proces zamówienia w czterech prostych krokach.
          </p>
        </div>
        <div className="steps-wrapper">
          <div className="steps-connector" />
          <div className="steps-grid">
            {[
              {
                emoji: "📞",
                title: "Zadzwoń lub napisz",
                text: "Porozmawiajmy o projekcie i ustalmy szczegóły zamówienia oraz cenę.",
              },
              {
                emoji: "📤",
                title: "Wyślij projekt",
                text: (
                  <>
                    <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a>
                    <br />
                    Serwer FTP: host: ftp.strefa.pl
                    <br />
                    użytkownik: serwer@awadruk.pl
                    <br />
                    hasło: proszę dzwonić 83 3522591
                  </>
                ),
              },
              {
                emoji: "⏳",
                title: "Poczekaj na wydruk",
                text: "Czas realizacji to 5 dni roboczych. Powiadomimy Cię o zakończeniu prac.",
              },
              {
                emoji: "📦",
                title: "Odbierz projekt",
                text: "Dowóz do klienta lub w siedzibie firmy: ul. Dąbrowskiego 4a lub ul. Zielona 22a.",
              },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-icon">{s.emoji}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="file-note">
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>Wymagania plików:</strong>{" "}
            PDF, PS, TIFF — rozdzielczość 300 dpi, spady minimum 3 mm, barwy CMYK lub PANTONE, czcionki zamienione na krzywe lub dołączone do pliku postscript, zgodność PDF od wersji 4.0.
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="o-nas" className="section">
        <div className="about-inner">
          <div>
            <span className="section-tag">Kim jesteśmy</span>
            <h2 className="section-title">Nowoczesna drukarnia<br /><em>z tradycją</em></h2>
            <p className="section-sub">
              Jesteśmy nowoczesną drukarnią z ponad 20-letnim doświadczeniem. Wykonujemy coraz poważniejsze zlecenia, podejmujemy wyzwania. Stale unowocześniamy park maszyn i inwestujemy w doświadczonych fachowców.
            </p>
            <div className="about-features">
              {[
                { icon: "🔬", title: "Najwyższy sprzęt", text: "Maszyny CTP Cobalt 4, naświetlarka 400 linii/sek, format do 675×480 mm." },
                { icon: "🎨", title: "CMYK & PANTONE", text: "Specjalizujemy się w druku jednokolorowym i wielokolorowym." },
                { icon: "📐", title: "Kompleksowa obsługa", text: "Od projektu, przez druk, aż po wykończenie introligatorskie." },
                { icon: "⚡", title: "Ekspresowe terminy", text: "Realizacja od 5 dni roboczych. Informujemy na bieżąco." },
              ].map((f, i) => (
                <div className="about-feat" key={i}>
                  <span className="about-feat-icon">{f.icon}</span>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img-wrap">
            {/* IMAGE SLOT — replace with <img src="..." style={{width:'100%',borderRadius:'20px',display:'block'}} /> */}
            <div className="about-img-slot">
              🏭
              <span className="about-img-slot-label">zdjęcie drukarni</span>
            </div>
            <div className="about-badge">
              <span className="about-badge-num">20+</span>
              <span className="about-badge-text">lat w branży</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="section section-light">
        <div className="section-header section-center">
          <span className="section-tag">Kontakt</span>
          <h2 className="section-title">Napisz <em>do nas</em></h2>
          <p className="section-sub section-sub-center">
            Masz pytanie? Chcesz wycenić zlecenie? Skontaktuj się z nami!
          </p>
        </div>
        <div className="contact-inner">
          <div>
            {/* BIURO */}
            <div className="contact-block">
              <span className="contact-block-title">📍 Biuro — ul. Dąbrowskiego 4a</span>
              <div className="contact-item">
                <span className="contact-item-icon">🏢</span>
                <span>ul. Dąbrowskiego 4a, 21-300 Radzyń Podlaski</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">ℹ️</span>
                <span>Obsługa klienta, doradztwo projektowe, kolorowe wydruki do A3.</span>
              </div>
            </div>
            <hr className="contact-divider" />
            {/* DRUKARNIA */}
            <div className="contact-block">
              <span className="contact-block-title">🏭 Drukarnia — ul. Zielona 22a</span>
              <div className="contact-item">
                <span className="contact-item-icon">📌</span>
                <span>ul. Zielona 22a, 21-300 Radzyń Podlaski</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">⚙️</span>
                <span>Naświetlarka CTP, druk offsetowy, maszyna arkuszowa 675×480 mm.</span>
              </div>
            </div>
            <hr className="contact-divider" />
            {/* KONTAKT */}
            <div className="contact-block">
              <span className="contact-block-title">📬 Dane kontaktowe</span>
              {[
                { icon: "✉️", content: <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a> },
                { icon: "✉️", content: <a href="mailto:reklama@awadruk.pl">reklama@awadruk.pl</a> },
                { icon: "✉️", content: <a href="mailto:agwd@poczta.onet.pl">agwd@poczta.onet.pl</a> },
                { icon: "📞", content: "508 097 499" },
                { icon: "📞", content: "83 352 25 91" },
                { icon: "📞", content: "83 352 02 63" },
              ].map((c, i) => (
                <div className="contact-item" key={i}>
                  <span className="contact-item-icon">{c.icon}</span>
                  <span>{c.content}</span>
                </div>
              ))}
            </div>
            {/* MAP SLOT — replace with Google Maps embed <iframe> */}
            <div className="map-slot">
              🗺️
              <p>mapa Google Maps</p>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form">
            <h3>Wyślij wiadomość</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Imię i nazwisko</label>
                <input type="text" placeholder="Jan Kowalski" />
              </div>
              <div className="form-field">
                <label>Adres e-mail</label>
                <input type="email" placeholder="jan@firma.pl" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Temat</label>
                <input type="text" placeholder="Wycena ulotki A5" />
              </div>
              <div className="form-field">
                <label>Telefon</label>
                <input type="tel" placeholder="+48 000 000 000" />
              </div>
            </div>
            <div className="form-field">
              <label>Treść wiadomości</label>
              <textarea placeholder="Opisz swoje zamówienie lub zapytanie..." />
            </div>
            <button className="btn-send">Wyślij wiadomość →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <p>© 2025 Drukarnia AWA-Druk, Radzyń Podlaski. Wszelkie prawa zastrzeżone.</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </footer>
    </>
  );
}