import { useState, useRef } from "react";

// ─── EMAILJS — uzupełnij po rejestracji na emailjs.com ───
const EJS_SERVICE  = "TWOJE_SERVICE_ID";
const EJS_TEMPLATE = "TWOJE_TEMPLATE_ID";
const EJS_KEY      = "TWOJ_PUBLIC_KEY";

async function sendViaEmailJS(params) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id:      EJS_SERVICE,
      template_id:     EJS_TEMPLATE,
      user_id:         EJS_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error("send failed");
}

// ─── CSS ───────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; color: #1c1c2e; background: #fff; overflow-x: hidden; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }

  .rb {
    height: 4px;
    background: linear-gradient(90deg,
      #e53935 0%,#e53935 14.28%,
      #fb8c00 14.28%,#fb8c00 28.56%,
      #fdd835 28.56%,#fdd835 42.84%,
      #43a047 42.84%,#43a047 57.12%,
      #1e88e5 57.12%,#1e88e5 71.4%,
      #6c30a8 71.4%,#6c30a8 85.68%,
      #e53935 85.68%,#e53935 100%
    );
  }

  /* NAV */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 7%; height: 64px;
    background: #fff; border-bottom: 1px solid #f0eaf8;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 1px 12px rgba(108,48,168,.05);
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; }
  .nav-brand-box {
    width: 36px; height: 36px; background: #6c30a8;
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 12px; color: #fff;
  }
  .nav-brand-name { font-weight: 800; font-size: 15px; color: #1c1c2e; }
  .nav-links { display: flex; }
  .nav-links a {
    padding: 7px 14px; border-radius: 7px;
    font-size: 14px; font-weight: 500; color: #777;
    transition: color .18s, background .18s;
  }
  .nav-links a:hover { color: #6c30a8; background: #f5f0fc; }
  .nav-links a.active { color: #6c30a8; font-weight: 700; }

  /* HERO */
  .hero {
    padding: 80px 7% 70px;
    background: linear-gradient(160deg, #f9f6ff 0%, #fff 60%);
    display: flex; align-items: center; gap: 60px;
    min-height: 500px;
  }
  .hero-text { flex: 1; }
  .hero-tag {
    display: inline-block; background: #ede7f9; color: #6c30a8;
    padding: 5px 13px; border-radius: 40px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 20px;
  }
  .hero h1 {
    font-size: clamp(32px, 4vw, 52px); font-weight: 800;
    color: #1c1c2e; line-height: 1.14; margin-bottom: 18px;
  }
  .hero h1 span { color: #6c30a8; }
  .hero-desc {
    font-size: 16px; color: #666; line-height: 1.75;
    margin-bottom: 32px; max-width: 440px;
  }
  .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-purple {
    background: #6c30a8; color: #fff;
    padding: 12px 24px; border-radius: 9px;
    font-weight: 700; font-size: 14px; display: inline-block;
    transition: all .2s; box-shadow: 0 4px 16px rgba(108,48,168,.22);
  }
  .btn-purple:hover { background: #7d3dc0; transform: translateY(-2px); }
  .btn-border {
    background: #fff; color: #6c30a8;
    padding: 12px 24px; border-radius: 9px;
    font-weight: 600; font-size: 14px; display: inline-block;
    border: 1.5px solid #d4c2ef; transition: all .2s;
  }
  .btn-border:hover { border-color: #6c30a8; background: #f9f6ff; }

  .hero-visual {
    flex: 1; max-width: 480px;
    background: linear-gradient(135deg, #ede7f9 0%, #d4c2ef 100%);
    border-radius: 20px; aspect-ratio: 4/3;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 64px; border: 2px dashed #c5aee8;
  }
  .hero-visual-label { font-size: 11px; color: #9b7cc2; margin-top: 10px; }

  /* NUMBERS */
  .numbers { display: flex; border-top: 1px solid #f0eaf8; border-bottom: 1px solid #f0eaf8; }
  .number-item {
    flex: 1; padding: 28px 0; text-align: center;
    border-right: 1px solid #f0eaf8;
  }
  .number-item:last-child { border-right: none; }
  .number-val { font-size: 26px; font-weight: 800; color: #6c30a8; line-height: 1; margin-bottom: 4px; }
  .number-label { font-size: 12px; color: #999; font-weight: 500; }

  /* SECTIONS */
  .section { padding: 80px 7%; }
  .section-alt { background: #faf8ff; }
  .section-dark { background: #1c1c2e; }

  .sec-head { text-align: center; margin-bottom: 50px; }
  .sec-tag {
    display: inline-block; background: #ede7f9; color: #6c30a8;
    padding: 4px 12px; border-radius: 40px;
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 12px;
  }
  .sec-tag-dark { background: rgba(255,255,255,.1); color: rgba(255,255,255,.7); }
  .sec-head h2 {
    font-size: clamp(24px, 2.5vw, 36px); font-weight: 800;
    color: #1c1c2e; line-height: 1.2; margin-bottom: 12px;
  }
  .sec-head h2 em { font-style: normal; color: #6c30a8; }
  .sec-head h2 em-light { font-style: normal; color: #b39ddb; }
  .sec-head p { font-size: 15px; color: #666; line-height: 1.7; max-width: 500px; margin: 0 auto; }
  .section-dark .sec-head h2 { color: #fff; }
  .section-dark .sec-head p { color: rgba(255,255,255,.5); }

  /* OFFER */
  .offer-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
    max-width: 1100px; margin: 0 auto;
  }
  .offer-card {
    background: #fff; border: 1px solid #f0eaf8;
    border-radius: 14px; overflow: hidden; transition: all .25s;
  }
  .offer-card:hover {
    border-color: #c5aee8;
    box-shadow: 0 8px 28px rgba(108,48,168,.1);
    transform: translateY(-3px);
  }
  .offer-img-slot {
    background: #f5f0fc; height: 120px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 36px; border-bottom: 1px solid #f0eaf8;
    transition: background .25s;
  }
  .offer-card:hover .offer-img-slot { background: #ede7f9; }
  .offer-img-hint { font-size: 9px; color: #bbaad5; margin-top: 5px; letter-spacing: .5px; text-transform: uppercase; }
  .offer-card-body { padding: 14px 16px 18px; }
  .offer-card h3 { font-size: 14px; font-weight: 700; color: #1c1c2e; margin-bottom: 6px; }
  .offer-card p { font-size: 12px; color: #888; line-height: 1.6; }

  /* STEPS */
  .steps-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
    max-width: 1100px; margin: 0 auto;
  }
  .step-card {
    text-align: center; padding: 32px 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 14px; transition: background .2s;
  }
  .step-card:hover { background: rgba(255,255,255,.09); }
  .step-icon {
    width: 56px; height: 56px; margin: 0 auto 14px;
    background: rgba(108,48,168,.35);
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    font-size: 24px; transition: background .2s;
  }
  .step-card:hover .step-icon { background: #6c30a8; }
  .step-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #9b7cc2; margin-bottom: 10px; display: block; }
  .step-card h3 { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.3; }
  .step-card p { font-size: 12px; color: rgba(255,255,255,.5); line-height: 1.65; }
  .step-card p a { color: #c5aee8; }
  .steps-note {
    max-width: 1100px; margin: 24px auto 0;
    padding: 14px 20px;
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
    border-radius: 10px; font-size: 12px; color: rgba(255,255,255,.38); line-height: 1.75;
  }
  .steps-note strong { color: rgba(255,255,255,.55); }

  /* ABOUT */
  .about-row {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center;
  }
  .about-visual {
    background: linear-gradient(135deg, #ede7f9 0%, #d4c2ef 100%);
    border-radius: 18px; aspect-ratio: 5/4;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 60px; border: 2px dashed #c5aee8;
    position: relative;
  }
  .about-visual-label { font-size: 11px; color: #9b7cc2; margin-top: 8px; }
  .about-badge {
    position: absolute; bottom: -16px; right: -16px;
    background: #6c30a8; color: #fff; border-radius: 12px;
    padding: 12px 18px; text-align: center;
    box-shadow: 0 6px 20px rgba(108,48,168,.3);
  }
  .about-badge span { font-size: 26px; font-weight: 800; line-height: 1; display: block; }
  .about-badge small { font-size: 11px; font-weight: 600; opacity: .8; }
  .about-content .about-tag {
    display: inline-block; background: #ede7f9; color: #6c30a8;
    padding: 4px 12px; border-radius: 40px;
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 14px;
  }
  .about-content h2 {
    font-size: clamp(24px, 2.5vw, 34px); font-weight: 800;
    color: #1c1c2e; line-height: 1.2; margin-bottom: 14px;
  }
  .about-content h2 em { font-style: normal; color: #6c30a8; }
  .about-content p { font-size: 15px; color: #666; line-height: 1.75; margin-bottom: 24px; }
  .about-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .about-pill {
    background: #f5f0fc; border: 1px solid #e0d4f5;
    border-radius: 8px; padding: 8px 14px;
    font-size: 12px; font-weight: 600; color: #5a2590;
  }

  /* CONTACT */
  .contact-wrap {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.4fr; gap: 50px;
  }
  .info-block { margin-bottom: 22px; }
  .info-title {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #6c30a8; margin-bottom: 10px; display: block;
  }
  .info-row {
    display: flex; align-items: flex-start; gap: 8px;
    font-size: 13px; color: #444; margin-bottom: 6px; line-height: 1.5;
  }
  .info-row a { color: #6c30a8; }
  .info-row a:hover { text-decoration: underline; }
  .info-hr { border: none; border-top: 1px solid #f0eaf8; margin: 18px 0; }
  .map-slot {
    background: #f5f0fc; border-radius: 12px; height: 150px;
    border: 2px dashed #d4c2ef; margin-top: 18px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 26px; color: #b09ad4;
  }
  .map-slot p { font-size: 10px; color: #b09ad4; margin-top: 6px; letter-spacing: .5px; text-transform: uppercase; }

  /* FORM */
  .form-box {
    background: #faf8ff; border: 1px solid #ede7f9;
    border-radius: 16px; padding: 36px 32px;
  }
  .form-box h3 { font-size: 20px; font-weight: 800; color: #1c1c2e; margin-bottom: 24px; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
  .f-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
  .f-field label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; }
  .f-field input, .f-field textarea {
    background: #fff; border: 1.5px solid #e8e0f5;
    border-radius: 9px; padding: 11px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #1c1c2e;
    outline: none; transition: border-color .2s, box-shadow .2s; resize: vertical;
  }
  .f-field input::placeholder, .f-field textarea::placeholder { color: #bbb; }
  .f-field input:focus, .f-field textarea:focus {
    border-color: #9b59e8; box-shadow: 0 0 0 3px rgba(108,48,168,.08);
  }
  .f-field textarea { min-height: 110px; }
  .btn-send {
    width: 100%; background: #6c30a8; color: #fff;
    padding: 14px; border-radius: 9px;
    font-size: 15px; font-weight: 700;
    transition: all .22s; box-shadow: 0 4px 16px rgba(108,48,168,.22);
  }
  .btn-send:hover { background: #7d3dc0; transform: translateY(-2px); }
  .btn-send:disabled { opacity: .65; cursor: not-allowed; transform: none; }
  .f-alert {
    border-radius: 9px; padding: 12px 16px;
    font-size: 13px; line-height: 1.5; margin-bottom: 18px;
  }
  .f-ok  { background: #edfaf3; border: 1px solid #a3d9b1; color: #246b42; }
  .f-err { background: #fff0f0; border: 1px solid #f4a0a0; color: #8b2020; }
  .f-err a { color: #6c30a8; }

  /* FOOTER */
  .footer {
    border-top: 1px solid #f0eaf8; padding: 24px 7%;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
  }
  .footer p { font-size: 12px; color: #aaa; }
  .footer a { font-size: 12px; color: #aaa; transition: color .2s; }
  .footer a:hover { color: #6c30a8; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .au  { animation: fadeUp .5s ease both; }
  .d1  { animation-delay: .1s; }
  .d2  { animation-delay: .2s; }
  .d3  { animation-delay: .3s; }

  /* RESPONSIVE */
  @media (max-width: 960px) {
    .offer-grid  { grid-template-columns: repeat(2, 1fr); }
    .steps-grid  { grid-template-columns: repeat(2, 1fr); }
    .about-row   { grid-template-columns: 1fr; gap: 40px; }
    .contact-wrap{ grid-template-columns: 1fr; }
    .hero        { flex-direction: column; }
    .hero-visual { max-width: 100%; width: 100%; }
  }
  @media (max-width: 600px) {
    .offer-grid   { grid-template-columns: 1fr 1fr; }
    .steps-grid   { grid-template-columns: 1fr; }
    .numbers      { flex-wrap: wrap; }
    .number-item  { flex: 0 0 50%; border-bottom: 1px solid #f0eaf8; }
    .form-grid-2  { grid-template-columns: 1fr; }
    .nav-links a  { padding: 6px 9px; font-size: 13px; }
    .form-box     { padding: 24px 18px; }
  }
`;

// ─── DATA ──────────────────────────────────────────────────
const offerItems = [
  { emoji: "✏️",  title: "Gadżety reklamowe",    desc: "Grawer laserowa na długopisach, nadruki na kubkach i smyczach z logo firmy." },
  { emoji: "📋",  title: "Materiały reklamowe",   desc: "Wizytówki, ulotki, plakaty, naklejki, notesy i broszury w różnych formatach." },
  { emoji: "🖨️", title: "Druk cyfrowy",          desc: "Wysoka jakość przy małym nakładzie — szybko i bez kompromisów." },
  { emoji: "🚗",  title: "Nadruki na samochody",  desc: "Oklejanie samochodów firmowych z montażem. Reklama w ruchu." },
  { emoji: "📚",  title: "Publikacje",            desc: "Gazety, książki, albumy i czasopisma — wysoka jakość wydruku." },
  { emoji: "🗺️", title: "Druk wielkoformatowy",  desc: "Banery, roll-upy, billboardy, fototapety, mapy w wielkich formatach." },
  { emoji: "📄",  title: "Ksero",                 desc: "Szybkie kserowanie dokumentów i notatek w naszym biurze." },
  { emoji: "🗞️", title: "Druk offsetowy",        desc: "Im więcej drukujesz, tym mniej płacisz. CMYK i PANTONE." },
  { emoji: "📝",  title: "Druki firmowe",         desc: "Druki na papierze samokopiującym do prowadzenia firmy." },
  { emoji: "🔖",  title: "Pieczątki",             desc: "Różne kształty i wielkości — automatyczne i tradycyjne." },
  { emoji: "📗",  title: "Introligatorstwo",      desc: "Oprawy miękkie i twarde, zeszyty, oprawy czasopism." },
  { emoji: "📅",  title: "Kalendarze",            desc: "Wiszące, trójdzielne, na biurko — w wybranej tematyce." },
  { emoji: "📦",  title: "Opakowania",            desc: "Wydrukujemy i wytniemy opakowania dla Twoich produktów." },
  { emoji: "💌",  title: "Zaproszenia",           desc: "Ślubne, komunijne, konferencyjne — każda tematyka." },
  { emoji: "🪧",  title: "Tabliczki",             desc: "Tabliczki informacyjne i znamionowe — grawer laserowy." },
  { emoji: "👕",  title: "Koszulki",              desc: "Dowolne nadruki na koszulkach dobrej jakości." },
];

// ─── CONTACT FORM ──────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ from_name: "", from_email: "", subject: "", phone: "", message: "" });

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendViaEmailJS(form);
      setStatus("success");
      setForm({ from_name: "", from_email: "", subject: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="form-box">
      <h3>Wyślij wiadomość</h3>

      {status === "success" && (
        <div className="f-alert f-ok">✅ Wysłano! Odezwiemy się wkrótce.</div>
      )}
      {status === "error" && (
        <div className="f-alert f-err">
          ❌ Błąd wysyłki. Napisz bezpośrednio: <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        <div className="form-grid-2">
          <div className="f-field">
            <label>Imię i nazwisko</label>
            <input name="from_name" type="text" placeholder="Jan Kowalski"
              value={form.from_name} onChange={onChange} required />
          </div>
          <div className="f-field">
            <label>E-mail</label>
            <input name="from_email" type="email" placeholder="jan@firma.pl"
              value={form.from_email} onChange={onChange} required />
          </div>
        </div>
        <div className="form-grid-2">
          <div className="f-field">
            <label>Temat</label>
            <input name="subject" type="text" placeholder="Wycena ulotki A5"
              value={form.subject} onChange={onChange} required />
          </div>
          <div className="f-field">
            <label>Telefon</label>
            <input name="phone" type="tel" placeholder="+48 000 000 000"
              value={form.phone} onChange={onChange} />
          </div>
        </div>
        <div className="f-field">
          <label>Wiadomość</label>
          <textarea name="message" placeholder="Opisz zamówienie lub zadaj pytanie..."
            value={form.message} onChange={onChange} required />
        </div>
        <button className="btn-send" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość →"}
        </button>
      </form>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────
export default function AWADrukV3() {
  const [active, setActive] = useState("start");
  const nav = (id) => setActive(id);

  return (
    <>
      <style>{css}</style>
      <div className="rb" />

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="#start" className="nav-brand" onClick={() => nav("start")}>
          <div className="nav-brand-box">AWA</div>
          <span className="nav-brand-name">AWA-DRUK</span>
        </a>
        <div className="nav-links">
          {[["start","Start"],["oferta","Oferta"],["jak-zamowic","Jak zamówić"],["o-nas","O nas"],["kontakt","Kontakt"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => nav(id)}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="start" className="hero">
        <div className="hero-text">
          <span className="hero-tag au">Drukarnia · Radzyń Podlaski</span>
          <h1 className="au d1">
            Wszystko co<br />
            <span>wydrukujesz</span>,<br />
            robimy dla Ciebie.
          </h1>
          <p className="hero-desc au d2">
            Ponad 20 lat doświadczenia w poligrafii. Od wizytówki po wielkoformatowy baner —
            kompleksowa obsługa w jednym miejscu.
          </p>
          <div className="hero-btns au d3">
            <a href="#oferta" className="btn-purple" onClick={() => nav("oferta")}>Sprawdź ofertę</a>
            <a href="#kontakt" className="btn-border" onClick={() => nav("kontakt")}>Zapytaj o wycenę</a>
          </div>
        </div>

        {/* IMAGE SLOT — zamień na: <img src="/twoje-zdjecie.jpg" style={{flex:1,maxWidth:480,borderRadius:20,objectFit:"cover"}} /> */}
        <div className="hero-visual">
          🖨️
          <span className="hero-visual-label">zdjęcie główne</span>
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <div className="numbers">
        {[["20+","lat w branży"],["675×480","mm format arkusza"],["400","linii/sek"],["5 dni","czas realizacji"]].map(([v, l], i) => (
          <div className="number-item" key={i}>
            <div className="number-val">{v}</div>
            <div className="number-label">{l}</div>
          </div>
        ))}
      </div>

      {/* ── OFFER ── */}
      <section id="oferta" className="section section-alt">
        <div className="sec-head">
          <span className="sec-tag">Oferta</span>
          <h2>Co możemy dla Ciebie <em>wydrukować?</em></h2>
          <p>Kompleksowa obsługa poligraficzna — od projektu po wykończenie introligatorskie.</p>
        </div>
        <div className="offer-grid">
          {offerItems.map((item, i) => (
            <div className="offer-card" key={i}>
              {/* IMAGE SLOT — wstaw <img src="..." style={{width:"100%",height:120,objectFit:"cover"}} /> zamiast .offer-img-slot */}
              <div className="offer-img-slot">
                {item.emoji}
                <span className="offer-img-hint">zdjęcie</span>
              </div>
              <div className="offer-card-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section id="jak-zamowic" className="section section-dark">
        <div className="sec-head">
          <span className="sec-tag sec-tag-dark">Zamówienie</span>
          <h2 style={{color:"#fff"}}>Jak <span style={{color:"#b39ddb"}}>zamówić?</span></h2>
          <p>Cztery proste kroki dzielą Cię od gotowego wydruku.</p>
        </div>
        <div className="steps-grid">
          {[
            { n:"01", icon:"📞", title:"Zadzwoń lub napisz",     text:"Porozmawiajmy o projekcie i ustalmy szczegóły oraz cenę." },
            { n:"02", icon:"📤", title:"Wyślij projekt",         text:<>Prześlij na <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a> lub przez FTP: host ftp.strefa.pl, użytkownik: serwer@awadruk.pl.</> },
            { n:"03", icon:"⏳", title:"Poczekaj na realizację", text:"Do 5 dni roboczych. Powiadomimy Cię o zakończeniu prac." },
            { n:"04", icon:"📦", title:"Odbierz wydruk",         text:"Dowóz do klienta lub odbiór przy ul. Dąbrowskiego 4a albo Zielonej 22a." },
          ].map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-icon">{s.icon}</div>
              <span className="step-label">KROK {s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="steps-note">
          <strong>Wymagania plików:</strong> PDF, PS, TIFF — rozdzielczość 300 dpi, spady min. 3 mm,
          barwy CMYK lub PANTONE, czcionki zamienione na krzywe, zgodność PDF od wersji 4.0.
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="o-nas" className="section">
        <div className="about-row">
          <div style={{position:"relative"}}>
            {/* IMAGE SLOT — zamień na <img src="..." style={{width:"100%",borderRadius:18,display:"block"}} /> */}
            <div className="about-visual">
              🏭
              <span className="about-visual-label">zdjęcie drukarni</span>
            </div>
            <div className="about-badge">
              <span>20+</span>
              <small>lat w branży</small>
            </div>
          </div>
          <div className="about-content">
            <span className="about-tag">O nas</span>
            <h2>Nowoczesna drukarnia<br /><em>z tradycją</em></h2>
            <p>
              Jesteśmy drukarnią z ponad 20-letnim doświadczeniem. Stale inwestujemy w sprzęt
              najwyższej klasy i zespół fachowców. Kompleksowa obsługa — od projektu, przez druk,
              aż po wykończenie introligatorskie.
            </p>
            <div className="about-pills">
              {["🔬 Sprzęt CTP Cobalt 4","🎨 CMYK & PANTONE","📐 Introligatorstwo","⚡ 5 dni realizacji","🖨️ Format 675×480 mm","📞 Doradztwo projektowe"].map((p, i) => (
                <div className="about-pill" key={i}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontakt" className="section section-alt">
        <div className="sec-head">
          <span className="sec-tag">Kontakt</span>
          <h2>Napisz <em>do nas</em></h2>
          <p>Masz pytanie lub chcesz wycenić zlecenie? Odezwij się!</p>
        </div>
        <div className="contact-wrap">
          <div>
            <div className="info-block">
              <span className="info-title">📍 Biuro — ul. Dąbrowskiego 4a</span>
              <div className="info-row">🏢 <span>ul. Dąbrowskiego 4a, 21-300 Radzyń Podlaski</span></div>
              <div className="info-row">ℹ️ <span>Obsługa klienta, doradztwo, wydruki do A3.</span></div>
            </div>
            <hr className="info-hr" />
            <div className="info-block">
              <span className="info-title">🏭 Drukarnia — ul. Zielona 22a</span>
              <div className="info-row">📌 <span>ul. Zielona 22a, 21-300 Radzyń Podlaski</span></div>
              <div className="info-row">⚙️ <span>CTP, druk offsetowy, maszyna 675×480 mm.</span></div>
            </div>
            <hr className="info-hr" />
            <div className="info-block">
              <span className="info-title">📬 Dane kontaktowe</span>
              {[
                ["✉️", <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a>],
                ["✉️", <a href="mailto:reklama@awadruk.pl">reklama@awadruk.pl</a>],
                ["✉️", <a href="mailto:agwd@poczta.onet.pl">agwd@poczta.onet.pl</a>],
                ["📞","508 097 499"],["📞","83 352 25 91"],["📞","83 352 02 63"],
              ].map(([icon, content], i) => (
                <div className="info-row" key={i}>{icon} <span>{content}</span></div>
              ))}
            </div>
            {/* MAP SLOT — zamień na <iframe src="https://maps.google.com/maps?q=..." width="100%" height="150" style={{borderRadius:12,border:"none"}} /> */}
            <div className="map-slot">
              🗺️
              <p>Google Maps</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>© 2025 Drukarnia AWA-DRUK, Radzyń Podlaski. Wszelkie prawa zastrzeżone.</p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook →</a>
      </footer>
    </>
  );
}
