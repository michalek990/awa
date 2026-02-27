import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/TWOJ_ID";

// ══════════════════════════════════════════════════════════
//  WARIANT A — jasny motyw
//  Główny kolor: #BCCCE6 (niebieskawa stal)
//  Drugi kolor:  #E6D6BC (kremowo-piaskowy)
//  Tło strony: ciepły papier, tekst ciemny
// ══════════════════════════════════════════════════════════

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');

  :root {
    --ink:     #2a2318;
    --ink2:    #3d3426;
    --purple:  #7a9ec0;
    --plum:    #bccce6;
    --violet:  #5a82aa;
    --cream:   #f2ede4;
    --gold:    #e6d6bc;
    --mist:    #dce7f5;
    --border:  rgba(42,35,24,0.12);
    --textd:   rgba(42,35,24,0.9);
    --textd2:  rgba(42,35,24,0.5);
    --rose:    #e6c1bc;
    --rose2:   #d4a8a2;
    --card-bg: #fff;
    --sidebar-bg: #2a2318;
    --sidebar-border: rgba(255,255,255,0.07);
    --sidebar-text:   rgba(255,255,255,0.4);
    --sidebar-active: #bccce6;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--textd);
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: inherit; border: none; background: none; }

  .rb {
    height: 4px;
    background: linear-gradient(90deg,
      #e53935 0%,#e53935 7.14%,
      #fb8c00 7.14%,#fb8c00 14.28%,
      #fdd835 14.28%,#fdd835 21.42%,
      #43a047 21.42%,#43a047 28.56%,
      #00acc1 28.56%,#00acc1 35.7%,
      #1e88e5 35.7%,#1e88e5 42.84%,
      #9b59e8 42.84%,#9b59e8 50%,
      #e53935 50%,#e53935 57.14%,
      #fb8c00 57.14%,#fb8c00 64.28%,
      #fdd835 64.28%,#fdd835 71.42%,
      #43a047 71.42%,#43a047 78.56%,
      #00acc1 78.56%,#00acc1 85.7%,
      #1e88e5 85.7%,#1e88e5 92.84%,
      #9b59e8 92.84%,#9b59e8 100%
    );
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    position: fixed; left: 0; top: 0; bottom: 0;
    width: 72px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    display: flex; flex-direction: column;
    align-items: center;
    padding: 24px 0 28px;
    z-index: 200;
    transition: width 0.35s cubic-bezier(.4,0,.2,1);
  }
  .sidebar:hover { width: 210px; }
  .sidebar-logo {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 0 18px;
    margin-bottom: 44px; overflow: hidden; white-space: nowrap;
  }
  .sidebar-logo-box {
    flex-shrink: 0; width: 38px; height: 38px;
    background: var(--plum);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-weight: 900; font-size: 13px; color: var(--ink);
  }
  .sidebar-logo-text { opacity: 0; transition: opacity 0.2s 0.1s; }
  .sidebar:hover .sidebar-logo-text { opacity: 1; }
  .sidebar-logo-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; color: #fff; display: block; line-height: 1.2; }
  .sidebar-logo-sub { font-size: 9px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--sidebar-text); display: block; }
  .sidebar-nav { list-style: none; width: 100%; flex: 1; }
  .sidebar-nav li { width: 100%; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: 14px;
    padding: 13px 18px; overflow: hidden; white-space: nowrap;
    font-size: 13px; font-weight: 500; color: var(--sidebar-text);
    transition: color 0.2s, background 0.2s; position: relative;
  }
  .sidebar-nav a:hover { color: #fff; background: rgba(255,255,255,0.06); }
  .sidebar-nav a.active { color: var(--sidebar-active); }
  .sidebar-nav a.active::before {
    content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
    width: 3px; background: var(--sidebar-active); border-radius: 0 3px 3px 0;
  }
  .sidebar-nav-icon { font-size: 18px; flex-shrink: 0; width: 36px; text-align: center; }
  .sidebar-nav-label { opacity: 0; transition: opacity 0.2s 0.1s; }
  .sidebar:hover .sidebar-nav-label { opacity: 1; }
  .sidebar-bottom { width: 100%; padding: 0 18px; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
  .sidebar-contact-item { display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--sidebar-text); white-space: nowrap; overflow: hidden; }
  .sidebar-contact-item-icon { font-size: 14px; flex-shrink: 0; width: 36px; text-align: center; }
  .sidebar-contact-text { opacity: 0; transition: opacity 0.2s 0.1s; }
  .sidebar:hover .sidebar-contact-text { opacity: 1; }

  .main { margin-left: 72px; padding-top: 4px; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    position: relative; overflow: hidden;
  }
  .hero-left {
    background: #e6d6bc;
    padding: 100px 56px 80px;
    display: flex; flex-direction: column; justify-content: center;
    position: relative; z-index: 1;
  }
  .hero-left::after {
    content: ''; position: absolute; right: -1px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(180deg, transparent, var(--rose), transparent);
  }
  .hero-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
  .hero-eyebrow-line { width: 28px; height: 2px; background: var(--rose); }
  .hero-eyebrow-text { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--rose2); }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 4vw, 62px); font-weight: 900;
    color: var(--ink); line-height: 1.08; margin-bottom: 26px;
  }
  .hero h1 em { font-style: italic; color: #5a82aa; }
  .hero-desc { font-size: 16px; color: var(--textd2); line-height: 1.78; margin-bottom: 44px; max-width: 420px; }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-gold {
    background: var(--ink); color: #fff;
    padding: 13px 28px; border-radius: 8px;
    font-weight: 700; font-size: 14px; display: inline-block;
    transition: all 0.22s;
  }
  .btn-gold:hover { background: var(--ink2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(42,35,24,0.2); }
  .btn-outline-light {
    background: transparent; color: var(--ink);
    padding: 13px 28px; border-radius: 8px; font-weight: 500; font-size: 14px;
    border: 1.5px solid rgba(42,35,24,0.2); transition: all 0.22s; display: inline-block;
  }
  .btn-outline-light:hover { border-color: var(--rose); background: rgba(230,193,188,0.12); }

  .hero-right {
    background: #bccce6;
    position: relative; overflow: hidden; display: flex; align-items: flex-end;
  }
  .hero-right-pattern {
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 55%),
      radial-gradient(circle at 80% 80%, rgba(159,184,216,0.5) 0%, transparent 50%);
  }
  .hero-right-num {
    position: absolute; top: -10px; right: -10px;
    font-family: 'Playfair Display', serif; font-size: 280px; font-weight: 900;
    line-height: 1; color: rgba(42,35,24,0.07); user-select: none; pointer-events: none;
  }
  .hero-right-content {
    position: relative; z-index: 1; padding: 52px 48px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  .hero-feat {
    background: rgba(255,255,255,0.45);
    border: 1px solid rgba(255,255,255,0.65);
    border-radius: 14px; padding: 22px 18px; transition: background 0.25s;
    backdrop-filter: blur(4px);
  }
  .hero-feat:hover { background: rgba(255,255,255,0.62); }
  .hero-feat-emoji { font-size: 28px; margin-bottom: 10px; display: block; }
  .hero-feat h3 { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .hero-feat p { font-size: 12px; color: var(--textd2); line-height: 1.55; }
  .hero-feat.span2 { grid-column: span 2; }

  /* ── BAND ── */
  .band {
    background: var(--ink);
    padding: 28px 56px;
    display: flex; align-items: center; gap: 56px; overflow-x: auto;
  }
  .band-item { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
  .band-item-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #bccce6; line-height: 1; }
  .band-item-label { font-size: 12px; color: rgba(255,255,255,0.45); font-weight: 500; line-height: 1.3; }
  .band-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.1); flex-shrink: 0; }

  /* ── OFFER ── */
  .offer-section { padding: 90px 0 90px 56px; background: var(--cream); }
  .offer-header { padding-right: 56px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
  .offer-scroll-wrap { overflow-x: auto; padding-bottom: 20px; scrollbar-width: thin; scrollbar-color: #9fb8d8 transparent; }
  .offer-scroll-wrap::-webkit-scrollbar { height: 4px; }
  .offer-scroll-wrap::-webkit-scrollbar-thumb { background: #9fb8d8; border-radius: 4px; }
  .offer-track { display: flex; gap: 18px; padding-right: 56px; width: max-content; }
  .offer-card {
    width: 240px; flex-shrink: 0; background: var(--card-bg);
    border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
    transition: transform 0.28s, border-color 0.28s, box-shadow 0.28s;
  }
  .offer-card:hover { transform: translateY(-6px); border-color: var(--rose); box-shadow: 0 16px 48px rgba(230,193,188,0.25); }
  .offer-img-slot {
    width: 100%; height: 150px; background: #bccce6;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-bottom: 1px solid var(--border); position: relative; overflow: hidden; transition: background 0.3s;
  }
  .offer-card:hover .offer-img-slot { background: var(--rose); }
  .offer-img-slot-pattern { position: absolute; inset: 0; background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 65%); }
  .offer-img-emoji { font-size: 42px; position: relative; z-index: 1; }
  .offer-img-hint { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: rgba(42,35,24,0.4); margin-top: 6px; position: relative; z-index: 1; }
  .offer-card-body { padding: 18px 18px 22px; }
  .offer-card h3 { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; line-height: 1.25; }
  .offer-card p { font-size: 12px; color: var(--textd2); line-height: 1.65; }

  /* ── ORDER ── */
  .order-section {
    padding: 90px 56px; background: #e6d6bc;
    position: relative; overflow: hidden;
  }
  .order-section::before {
    content: 'ZAMÓW'; position: absolute; right: -20px; top: 50%; transform: translateY(-50%);
    font-family: 'Playfair Display', serif; font-size: 200px; font-weight: 900;
    color: rgba(42,35,24,0.05); pointer-events: none; user-select: none; white-space: nowrap;
  }
  .order-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .order-steps {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; margin-top: 60px;
    background: rgba(42,35,24,0.1); border-radius: 18px; overflow: hidden;
  }
  .order-step { background: #e6d6bc; padding: 40px 28px; transition: background 0.25s; }
  .order-step:hover { background: #d9c5a4; }
  .order-step:nth-child(even) .order-step-num { color: rgba(230,193,188,0.7); }
  .order-step:nth-child(odd)  .order-step-num { color: rgba(122,158,192,0.5); }
  .order-step-num { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 900; line-height: 1; margin-bottom: 16px; display: block; }
  .order-step-icon { font-size: 28px; margin-bottom: 14px; display: block; }
  .order-step h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 10px; line-height: 1.3; }
  .order-step p { font-size: 13px; color: var(--textd2); line-height: 1.65; }
  .order-step p a { color: #5a82aa; font-weight: 600; }
  .order-note { margin-top: 30px; padding: 18px 24px; background: rgba(42,35,24,0.05); border: 1px solid rgba(42,35,24,0.1); border-radius: 12px; font-size: 12px; color: var(--textd2); line-height: 1.8; }
  .order-note strong { color: var(--ink); }

  /* ── ABOUT ── */
  .about-section { padding: 90px 56px; background: #f5f0e8; }
  .about-inner { max-width: 1100px; margin: 0 auto; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 60px; }
  .about-img-slot {
    border-radius: 16px; aspect-ratio: 5/4; background: #bccce6;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 1px solid var(--border); font-size: 72px; position: relative; overflow: hidden;
  }
  .about-img-slot::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 20% 80%, rgba(230,193,188,0.4) 0%, transparent 60%),
                radial-gradient(circle at 80% 10%, rgba(230,214,188,0.4) 0%, transparent 50%);
  }
  .about-img-slot-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(42,35,24,0.45); margin-top: 10px; position: relative; z-index: 1; }
  .about-img-slot span.emoji { position: relative; z-index: 1; }
  .about-right { padding-top: 10px; }
  .about-text { font-size: 16px; color: var(--textd2); line-height: 1.8; margin-bottom: 36px; }
  .about-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .about-feat-card {
    padding: 20px 18px; background: var(--card-bg);
    border: 1px solid var(--border); border-radius: 14px; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .about-feat-card:hover { border-color: var(--rose); box-shadow: 0 4px 16px rgba(230,193,188,0.2); }
  .about-feat-icon { font-size: 20px; margin-bottom: 8px; display: block; }
  .about-feat-card h4 { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .about-feat-card p { font-size: 12px; color: var(--textd2); line-height: 1.55; }

  /* ── LABELS ── */
  .sec-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .sec-label-line { width: 24px; height: 2px; background: #7a9ec0; flex-shrink: 0; }
  .sec-label-text { font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #7a9ec0; }
  .sec-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 3vw, 42px); font-weight: 900; color: var(--ink); line-height: 1.18; margin-bottom: 14px; }
  .sec-title em { font-style: italic; color: #5a82aa; }
  .sec-sub { font-size: 15px; color: var(--textd2); line-height: 1.75; max-width: 520px; }

  /* ── CONTACT ── */
  .contact-section { padding: 90px 56px; background: var(--cream); }
  .contact-inner { max-width: 1100px; margin: 0 auto; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 70px; margin-top: 60px; }
  .contact-locations { display: flex; flex-direction: column; gap: 0; }
  .contact-loc { padding: 26px 0; border-bottom: 1px solid var(--border); }
  .contact-loc:first-child { padding-top: 0; }
  .contact-loc-title { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #7a9ec0; margin-bottom: 12px; display: block; }
  .contact-loc-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--textd2); margin-bottom: 7px; line-height: 1.45; }
  .contact-loc-icon { font-size: 15px; flex-shrink: 0; }
  .contact-loc-item a { color: #5a82aa; font-weight: 600; }
  .contact-loc-item a:hover { text-decoration: underline; color: var(--rose2); }
  .map-slot { margin-top: 24px; height: 160px; border-radius: 12px; background: var(--rose); border: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 28px; color: rgba(42,35,24,0.45); }
  .map-slot p { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(42,35,24,0.5); margin-top: 8px; }

  .contact-form { background: var(--rose); border: 1px solid rgba(42,35,24,0.06); border-radius: 20px; padding: 42px 40px; }
  .contact-form h3 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 30px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .form-field label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--textd2); }
  .form-field input, .form-field textarea {
    background: #fff; border: 1.5px solid rgba(42,35,24,0.15);
    border-radius: 10px; padding: 13px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
  }
  .form-field input::placeholder, .form-field textarea::placeholder { color: rgba(42,35,24,0.3); }
  .form-field input:focus, .form-field textarea:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(230,193,188,0.2); }
  .form-field textarea { min-height: 120px; }
  .btn-send { width: 100%; background: var(--ink); color: #fff; padding: 15px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; transition: all 0.25s; }
  .btn-send:hover { background: var(--ink2); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(42,35,24,0.2); }
  .btn-send:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .form-alert { border-radius: 10px; padding: 14px 18px; font-size: 13px; line-height: 1.55; margin-bottom: 20px; }
  .form-alert-success { background: rgba(67,160,71,0.1); border: 1px solid rgba(67,160,71,0.25); color: #2d6a30; }
  .form-alert-error { background: rgba(229,57,53,0.08); border: 1px solid rgba(229,57,53,0.2); color: #b71c1c; }
  .form-alert-error a { color: #5a82aa; }

  /* ── FOOTER ── */
  .footer { background: var(--ink); border-top: 1px solid rgba(255,255,255,0.06); padding: 26px 56px; }
  .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .footer-inner p { font-size: 12px; color: rgba(255,255,255,0.35); }
  .footer-inner a { font-size: 12px; color: rgba(255,255,255,0.35); transition: color 0.2s; }
  .footer-inner a:hover { color: var(--rose); }

  /* ── ROSE TAG ── */
  .rose-tag {
    display: inline-block;
    background: var(--rose);
    color: var(--ink2);
    font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
    margin-bottom: 10px;
  }

  /* ── SECTION label variant rose ── */
  .sec-label-rose .sec-label-line { background: var(--rose); }
  .sec-label-rose .sec-label-text { color: var(--rose2); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .au { animation: fadeUp 0.6s ease both; }
  .d1 { animation-delay: 0.1s; } .d2 { animation-delay: 0.22s; } .d3 { animation-delay: 0.34s; } .d4 { animation-delay: 0.46s; }

  .topbar-mobile { display: none; position: fixed; top: 4px; left: 0; right: 0; z-index: 198; background: var(--ink); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0 20px; height: 58px; align-items: center; justify-content: space-between; }
  .topbar-mobile-logo { display: flex; align-items: center; gap: 10px; }
  .topbar-mobile-logo-box { width: 34px; height: 34px; background: #bccce6; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 12px; color: var(--ink); }
  .topbar-mobile-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; color: #fff; }
  .topbar-mobile-links { display: flex; gap: 4px; }
  .topbar-mobile-links a { padding: 6px 10px; border-radius: 7px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); transition: color 0.2s, background 0.2s; }
  .topbar-mobile-links a:hover { color: #fff; background: rgba(255,255,255,0.07); }

  @media (max-width: 1050px) { .hero { grid-template-columns: 1fr; min-height: auto; } .hero-right { min-height: 380px; } .about-grid { grid-template-columns: 1fr; gap: 40px; } .contact-grid { grid-template-columns: 1fr; } .order-steps { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 768px) {
    .sidebar { display: none; } .main { margin-left: 0; padding-top: 62px; }
    .topbar-mobile { display: flex !important; }
    .offer-section, .order-section, .about-section, .contact-section, .footer { padding-left: 20px; padding-right: 20px; }
    .offer-section { padding-left: 20px; }
    .offer-track { padding-right: 20px; }
    .hero-left { padding: 80px 24px 60px; }
    .hero-right-content { padding: 32px 24px; grid-template-columns: 1fr 1fr; }
    .band { padding: 20px 24px; gap: 30px; }
    .order-steps { grid-template-columns: 1fr; }
    .contact-form { padding: 24px 20px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

const offerItems = [
  { emoji: "✏️",  title: "Gadżety reklamowe",      desc: "Grawer laserowa na długopisach, nadruki na kubkach, smyczach i wielu innych." },
  { emoji: "📋",  title: "Materiały reklamowe",     desc: "Wizytówki, ulotki, plakaty, koperty, kalendarze, naklejki, notesy, broszury." },
  { emoji: "🖨️", title: "Druk cyfrowy",            desc: "Wysoka jakość przy małym nakładzie. Szybko i precyzyjnie." },
  { emoji: "🚗",  title: "Nadruki na samochody",    desc: "Oklejanie samochodów firmowych + montaż. Świetna reklama w ruchu." },
  { emoji: "📚",  title: "Publikacje",              desc: "Gazety, czasopisma, książki i albumy. Wysoka jakość wydruku." },
  { emoji: "🗺️", title: "Druk wielkoformatowy",    desc: "Banery, roll-upy, billboardy, fototapety, mapy w wielkich formatach." },
  { emoji: "📄",  title: "Ksero",                   desc: "Szybkie ksero ważnych dokumentów i notatek w biurze naszej firmy." },
  { emoji: "🗞️", title: "Druk offsetowy",          desc: "Im więcej drukujesz, tym mniej płacisz. CMYK i PANTONE." },
  { emoji: "📝",  title: "Druki firmowe",           desc: "Wydruk druków na papierze samokopiującym do prowadzenia firmy." },
  { emoji: "🔖",  title: "Pieczątki",               desc: "Różne wielkości i kształty — automatyczne i tradycyjne." },
  { emoji: "📗",  title: "Introligatorstwo",        desc: "Oprawy miękkie, twarde, zeszyty, oprawy czasopism." },
  { emoji: "📅",  title: "Kalendarze",              desc: "Wiszące, trójdzielne, na biurko, planszowe — w wybranej tematyce." },
  { emoji: "📦",  title: "Opakowania",              desc: "Wydrukujemy i wytniemy opakowania dla Twoich produktów." },
  { emoji: "💌",  title: "Zaproszenia",             desc: "Ślubne, komunijne, konferencyjne — każda tematyka." },
  { emoji: "🪧",  title: "Tabliczki informacyjne",  desc: "Różne tabliczki znamionowe i informacyjne — grawer laserowy." },
  { emoji: "👕",  title: "Koszulki",                desc: "Dowolne nadruki na koszulkach dobrej jakości." },
];

const navItems = [
  { id: "start",       label: "Start",       icon: "🏠" },
  { id: "oferta",      label: "Oferta",      icon: "📂" },
  { id: "jak-zamowic", label: "Jak zamówić", icon: "📋" },
  { id: "o-nas",       label: "O nas",       icon: "ℹ️" },
  { id: "kontakt",     label: "Kontakt",     icon: "✉️" },
];

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setStatus("success"); setFormData({ name: "", email: "", subject: "", phone: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <div className="contact-form">
      <h3>Wyślij wiadomość</h3>
      {status === "success" && <div className="form-alert form-alert-success">✅ Wiadomość wysłana! Odezwiemy się wkrótce.</div>}
      {status === "error" && <div className="form-alert form-alert-error">❌ Coś poszło nie tak. Napisz na <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a></div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-field"><label htmlFor="name">Imię i nazwisko</label><input id="name" name="name" type="text" placeholder="Jan Kowalski" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" placeholder="jan@firma.pl" value={formData.email} onChange={handleChange} required /></div>
        </div>
        <div className="form-row">
          <div className="form-field"><label htmlFor="subject">Temat</label><input id="subject" name="subject" type="text" placeholder="Wycena ulotki A5" value={formData.subject} onChange={handleChange} required /></div>
          <div className="form-field"><label htmlFor="phone">Telefon</label><input id="phone" name="phone" type="tel" placeholder="+48 000 000 000" value={formData.phone} onChange={handleChange} /></div>
        </div>
        <div className="form-field"><label htmlFor="message">Treść wiadomości</label><textarea id="message" name="message" placeholder="Opisz swoje zamówienie lub zapytanie..." value={formData.message} onChange={handleChange} required /></div>
        <button className="btn-send" type="submit" disabled={status === "sending"}>{status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość →"}</button>
      </form>
    </div>
  );
}

export default function AWADrukV2A() {
  const [activeNav, setActiveNav] = useState("start");
  const nav = (id) => setActiveNav(id);

  return (
    <>
      <style>{css}</style>
      <div className="rb" />

      <aside className="sidebar">
        <a href="#start" className="sidebar-logo" onClick={() => nav("start")}>
          <div className="sidebar-logo-box">AWA</div>
          <div className="sidebar-logo-text"><span className="sidebar-logo-name">AWA-DRUK</span><span className="sidebar-logo-sub">Drukarnia</span></div>
        </a>
        <ul className="sidebar-nav">
          {navItems.map(({ id, label, icon }) => (
            <li key={id}><a href={`#${id}`} className={activeNav === id ? "active" : ""} onClick={() => nav(id)}><span className="sidebar-nav-icon">{icon}</span><span className="sidebar-nav-label">{label}</span></a></li>
          ))}
        </ul>
        <div className="sidebar-bottom">
          {[{ icon: "📞", text: "508 097 499" }, { icon: "✉️", text: "biuro@awadruk.pl" }].map((c, i) => (
            <div className="sidebar-contact-item" key={i}><span className="sidebar-contact-item-icon">{c.icon}</span><span className="sidebar-contact-text">{c.text}</span></div>
          ))}
        </div>
      </aside>

      <div className="topbar-mobile">
        <div className="topbar-mobile-logo"><div className="topbar-mobile-logo-box">AWA</div><span className="topbar-mobile-name">AWA-DRUK</span></div>
        <div className="topbar-mobile-links">{navItems.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => nav(id)}>{label}</a>)}</div>
      </div>

      <div className="main">
        <section id="start" className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow au"><div className="hero-eyebrow-line" /><span className="hero-eyebrow-text">Ponad 20 lat doświadczenia</span></div>
            <h1 className="au d1">Drukarnia<br /><em>AWA-DRUK</em><br />Radzyń Podlaski</h1>
            <p className="hero-desc au d2">Kompleksowa obsługa poligraficzna — od wizytówki po baner wielkoformatowy. Stale inwestujemy w sprzęt i technologie.</p>
            <div className="hero-btns au d3">
              <a href="#oferta" className="btn-gold" onClick={() => nav("oferta")}>Zobacz ofertę →</a>
              <a href="#kontakt" className="btn-outline-light" onClick={() => nav("kontakt")}>Napisz do nas</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-right-pattern" />
            <div className="hero-right-num">20</div>
            <div className="hero-right-content au d4">
              {[
                { emoji: "🖨️", title: "Druk offsetowy i cyfrowy", desc: "CMYK & PANTONE. Wysoka jakość w każdym nakładzie.", wide: true, tag: "Bestseller" },
                { emoji: "🎁", title: "Gadżety reklamowe", desc: "Kubki, długopisy, smycze z logo.", tag: null },
                { emoji: "🚗", title: "Nadruki na pojazdy", desc: "Oklejanie + montaż.", tag: null },
              ].map((f, i) => (
                <div className={`hero-feat${f.wide ? " span2" : ""}`} key={i}>
                  {f.tag && <span className="rose-tag">{f.tag}</span>}
                  <span className="hero-feat-emoji">{f.emoji}</span><h3>{f.title}</h3><p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="band">
          {[["20+","lat\nw branży"],["675×480","mm format\narkusza"],["400","linii/sek\nnaświetlarka"],["300 dpi","rozdzielczość\nminimalna"],["5 dni","czas\nrealizacji"]].map(([n,l], i) => (
            <>{i > 0 && <div className="band-sep" key={`s${i}`}/>}<div className="band-item" key={i}><div className="band-item-num">{n}</div><div className="band-item-label" style={{whiteSpace:"pre-line"}}>{l}</div></div></>
          ))}
        </div>

        <section id="oferta" className="offer-section">
          <div className="offer-header">
            <div><div className="sec-label"><div className="sec-label-line"/><span className="sec-label-text">Nasza oferta</span></div><h2 className="sec-title">Co możemy dla Ciebie<br/><em>wydrukować?</em></h2></div>
            <p className="sec-sub" style={{maxWidth:340,textAlign:"right"}}>Przewiń w prawo →<br/><span style={{fontSize:13}}>Pełna lista usług poligraficznych</span></p>
          </div>
          <div className="offer-scroll-wrap"><div className="offer-track">
            {offerItems.map((item, i) => (
              <div className="offer-card" key={i}>
                <div className="offer-img-slot"><div className="offer-img-slot-pattern"/><span className="offer-img-emoji">{item.emoji}</span><span className="offer-img-hint">zdjęcie</span></div>
                <div className="offer-card-body"><h3>{item.title}</h3><p>{item.desc}</p></div>
              </div>
            ))}
          </div></div>
        </section>

        <section id="jak-zamowic" className="order-section">
          <div className="order-inner">
            <div className="sec-label"><div className="sec-label-line"/><span className="sec-label-text">Zamówienie</span></div>
            <h2 className="sec-title">Jak <em>zamówić?</em></h2>
            <p className="sec-sub">Cztery proste kroki dzielą Cię od gotowego wydruku.</p>
            <div className="order-steps">
              {[
                { n:"01", icon:"📞", title:"Zadzwoń lub napisz", text:"Porozmawiajmy o projekcie i ustalmy szczegóły oraz cenę." },
                { n:"02", icon:"📤", title:"Wyślij projekt", text:<>Wyślij na <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a> lub przez FTP: host ftp.strefa.pl, użytkownik: serwer@awadruk.pl.</> },
                { n:"03", icon:"⏳", title:"Poczekaj na wydruk", text:"Czas realizacji to do 5 dni roboczych. Powiadomimy Cię o zakończeniu." },
                { n:"04", icon:"📦", title:"Odbierz projekt", text:"Dowóz do klienta lub odbiór osobisty: ul. Dąbrowskiego 4a lub ul. Zielona 22a." },
              ].map((s, i) => (
                <div className="order-step" key={i}><span className="order-step-num">{s.n}</span><span className="order-step-icon">{s.icon}</span><h3>{s.title}</h3><p>{s.text}</p></div>
              ))}
            </div>
            <div className="order-note"><strong>Wymagania plików:</strong> PDF, PS, TIFF — rozdzielczość 300 dpi, spady min. 3 mm, barwy CMYK lub PANTONE, czcionki zamienione na krzywe, zgodność PDF od wersji 4.0.</div>
          </div>
        </section>

        <section id="o-nas" className="about-section">
          <div className="about-inner">
            <div className="sec-label sec-label-rose"><div className="sec-label-line"/><span className="sec-label-text">Kim jesteśmy</span></div>
            <h2 className="sec-title">Nowoczesna drukarnia<br/><em>z tradycją</em></h2>
            <div className="about-grid">
              <div><div className="about-img-slot"><span className="emoji">🏭</span><span className="about-img-slot-label">zdjęcie drukarni</span></div></div>
              <div className="about-right">
                <p className="about-text">Jesteśmy nowoczesną drukarnią z ponad 20-letnim doświadczeniem. Wykonujemy coraz poważniejsze zlecenia, podejmujemy wyzwania. Stale unowocześniamy park maszyn i inwestujemy w doświadczonych fachowców.</p>
                <div className="about-feats">
                  {[
                    { icon:"🔬", title:"Sprzęt najwyższej klasy", text:"CTP Cobalt 4, naświetlarka 400 linii/sek, format do 675×480 mm." },
                    { icon:"🎨", title:"CMYK i PANTONE", text:"Druk jedno- i wielokolorowy na papierach 100–400g." },
                    { icon:"📐", title:"Kompleksowa obsługa", text:"Od projektu, przez druk, po introligatorstwo." },
                    { icon:"⚡", title:"Ekspresowe terminy", text:"Realizacja od 5 dni roboczych. Informujemy na bieżąco." },
                  ].map((f, i) => (
                    <div className="about-feat-card" key={i}><span className="about-feat-icon">{f.icon}</span><h4>{f.title}</h4><p>{f.text}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="contact-section">
          <div className="contact-inner">
            <div className="sec-label sec-label-rose"><div className="sec-label-line"/><span className="sec-label-text">Kontakt</span></div>
            <h2 className="sec-title">Napisz <em>do nas</em></h2>
            <p className="sec-sub">Masz pytanie lub chcesz wycenić zlecenie? Jesteśmy do dyspozycji.</p>
            <div className="contact-grid">
              <div className="contact-locations">
                <div className="contact-loc">
                  <span className="contact-loc-title">📍 Biuro — ul. Dąbrowskiego 4a</span>
                  <div className="contact-loc-item"><span className="contact-loc-icon">🏢</span><span>ul. Dąbrowskiego 4a, 21-300 Radzyń Podlaski</span></div>
                  <div className="contact-loc-item"><span className="contact-loc-icon">ℹ️</span><span>Obsługa klienta, doradztwo projektowe, wydruki do A3.</span></div>
                </div>
                <div className="contact-loc">
                  <span className="contact-loc-title">🏭 Drukarnia — ul. Zielona 22a</span>
                  <div className="contact-loc-item"><span className="contact-loc-icon">📌</span><span>ul. Zielona 22a, 21-300 Radzyń Podlaski</span></div>
                  <div className="contact-loc-item"><span className="contact-loc-icon">⚙️</span><span>Naświetlarka CTP, druk offsetowy, maszyna arkuszowa 675×480 mm.</span></div>
                </div>
                <div className="contact-loc">
                  <span className="contact-loc-title">📬 Dane kontaktowe</span>
                  {[
                    { icon:"✉️", content:<a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a> },
                    { icon:"✉️", content:<a href="mailto:reklama@awadruk.pl">reklama@awadruk.pl</a> },
                    { icon:"✉️", content:<a href="mailto:agwd@poczta.onet.pl">agwd@poczta.onet.pl</a> },
                    { icon:"📞", content:"508 097 499" },
                    { icon:"📞", content:"83 352 25 91" },
                    { icon:"📞", content:"83 352 02 63" },
                  ].map((c, i) => <div className="contact-loc-item" key={i}><span className="contact-loc-icon">{c.icon}</span><span>{c.content}</span></div>)}
                </div>
                <div className="map-slot">🗺️<p>Google Maps</p></div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <p>© 2025 Drukarnia AWA-DRUK, Radzyń Podlaski. Wszelkie prawa zastrzeżone.</p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook →</a>
          </div>
        </footer>
      </div>
    </>
  );
}
