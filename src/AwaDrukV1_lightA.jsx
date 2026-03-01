import { useState, useEffect, useRef } from "react";
import autoImg from "./assets/Auto.png";
import etuiImg from "./assets/Etui.jpg";
import grawerImg from "./assets/grawer.jpg";
import kalendarzeImg from "./assets/Kalendarze.jpg";
import kseroImg from "./assets/ksero.png";
import ksiazkiImg from "./assets/Książki.jpg";
import maszynaImg from "./assets/Maszyna.png";
import menuImg from "./assets/Menu.jpg";
import opakowaniaImg from "./assets/Opakowania.jpg";
import pieczatkiImg from "./assets/Pieczątki.png";
import praceImg from "./assets/Prace  naukowe.jpg";
import rolandImg from "./assets/roland (2).png";
import wnioskiImg from "./assets/Wnioski.jpg";
import logoImg from "./assets/logo-bgrm.png";
import wizytowkiImg from "./assets/Wizytówki.jpg";
import koszulkiImg from "./assets/Koszulki.jpg";
import teczkiImg from "./assets/Teczki.jpg";
import torbyImg from "./assets/Torby reklamowe.png";
import kubekImg from "./assets/kubek.jpg"
import kartonikImg from "./assets/opakowanie.jpg"
import cyfraImg from "./assets/cyfra.jpg"
import drukarniaImg from "./assets/drukarnia.jpg"
// ══════════════════════════════════════════════════════
//  WARIANT A — jasny motyw
//  #BCCCE6 niebieskawa stal  |  #E6D6BC kremowo-piaskowy
//  Identyczny JSX jak oryginał — zmieniony tylko CSS
// ══════════════════════════════════════════════════════

const COLORS = {
  blue: "#bccce6", // główny akcent — niebieskawa stal
  blueDeep: "#7a9ab8", // ciemniejszy niebieski (hover, aktywny nav)
  blueDark: "#3d5a78", // bardzo ciemny niebieski (logo, heading)
  cream: "#e6d6bc", // kremowy/piaskowy — tła, karty
  creamDeep: "#c9b898", // ciemniejszy krem (hover)
  text: "#26211a", // ciemny brąz/grafit — główny tekst
  textMuted: "#6e6558", // wyciszony tekst
  white: "#ffffff",
  light: "#f5f0e8", // ciepłe białe tło
  border: "#d8ccba", // obramowania
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Lato', sans-serif; color: #26211a; background: #faf7f2; overflow-x: hidden; max-width: 100vw; }
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

  /* ── NAV ── */
.nav {
  position: sticky;
  top: 0;
  z-index: 200;

  height: 76px;
  padding: 0 6%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(250, 247, 242, 0.85);
  backdrop-filter: blur(18px);

  border-bottom: 1px solid rgba(61, 90, 120, 0.08);
  box-shadow: 0 4px 30px rgba(61, 90, 120, 0.08);
}


/* ===== LOGO ===== */

.nav-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
}

.nav-logo-image {
  height: 72px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.nav-logo:hover .nav-logo-image {
  transform: scale(1.05);
}

.nav-logo-text {
  font-family: 'Outfit', sans-serif;
  line-height: 1.1;
}

.nav-logo-name {
  font-weight: 800;
  font-size: 17px;
  color: #3d5a78;
  display: block;
}

.nav-logo-sub {
  font-weight: 400;
  font-size: 10px;
  color: #6e6558;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
}


/* ===== LINKS ===== */

.nav-links {
  display: flex;
  gap: 6px;
  list-style: none;
}

.nav-links a {
  padding: 10px 18px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;
  color: #6e6558;

  transition: all 0.25s ease;
  display: block;
}

.nav-links a:hover {
  color: #3d5a78;
  background: rgba(188, 204, 230, 0.35);
}

.nav-links a.active {
  background: #bccce6;
  color: #26211a;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(61, 90, 120, 0.15);
}

  .img-slot {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }

  .offer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .offer-card:hover .offer-image {
    transform: scale(1.05);
  }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(140deg, #3d5a78 0%, #5a7ea0 50%, #7a9ab8 100%);
    padding: 90px 6% 80px;
    position: relative; overflow: hidden;
  }
  .hero-blob1 {
    position: absolute; top: -120px; right: -80px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
  }
  .hero-blob2 {
    position: absolute; bottom: -160px; left: 5%;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(230,214,188,0.12) 0%, transparent 65%);
    border-radius: 50%; pointer-events: none;
  }
  .hero-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr auto;
    gap: 60px; align-items: center;
    position: relative; z-index: 1;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(230,214,188,0.2);
    border: 1px solid rgba(230,214,188,0.4);
    color: #e6d6bc;
    padding: 5px 15px; border-radius: 40px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase;
    margin-bottom: 22px;
  }
  .hero h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(34px, 4vw, 52px); font-weight: 900;
    color: #fff; line-height: 1.12; margin-bottom: 20px;
  }
  .hero h1 em { font-style: normal; color: #e6d6bc; }
  .hero-desc {
    font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.75;
    margin-bottom: 48px; max-width: 620px;
  }
  .hero-btns { display: flex; flex-direction: column; gap: 16px; align-items: stretch; min-width: 220px; max-width: 320px; }
  .btn-white {
    background: #e6d6bc; color: #26211a;
    padding: 22px 48px; border-radius: 14px;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 20px;
    transition: all 0.25s; box-shadow: 0 4px 20px rgba(0,0,0,0.14);
    display: block; text-align: center;
  }
  .btn-white:hover { background: #f0e4cc; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.18); }
  .btn-ghost {
    background: transparent; color: #fff;
    padding: 22px 48px; border-radius: 14px;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 20px;
    border: 2px solid rgba(255,255,255,0.35); transition: all 0.25s;
    display: block; text-align: center;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }

  /* ── STATS ── */
  .stats { background: #e6d6bc; padding: 48px 6%; border-bottom: 1px solid #d8ccba; }
  .stats-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
  }
  .stat {
    background: #fff; border: 1px solid #ddd4c4;
    border-radius: 16px; padding: 28px 20px; text-align: center;
    box-shadow: 0 2px 16px rgba(61,90,120,0.06);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .stat:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(61,90,120,0.12); }
  .stat-num {
    font-family: 'Outfit', sans-serif; font-size: 38px; font-weight: 900;
    color: #3d5a78; line-height: 1; margin-bottom: 6px;
  }
  .stat-label { font-size: 13px; color: #6e6558; font-weight: 500; }

  /* ── SECTIONS ── */
  .section { padding: 90px 6%; }
  .section-light { background: #f5f0e8; }
  .section-dark { background: #3d5a78; position: relative; overflow: hidden; }
  .section-center { text-align: center; }

  .section-tag {
    display: inline-block;
    background: #e6d6bc; color: #3d5a78;
    padding: 5px 14px; border-radius: 40px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 14px;
  }
  .section-tag-light { background: rgba(230,214,188,0.2); color: rgba(230,214,188,0.9); }

  .section-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(28px, 3vw, 42px); font-weight: 800;
    color: #26211a; line-height: 1.18; margin-bottom: 14px;
  }
  .section-title em { font-style: normal; color: #5a7ea0; }
  .section-title-light { color: #fff; }
  .section-title-light em { color: #e6d6bc; }
  .section-sub { font-size: 16px; color: #6e6558; line-height: 1.72; max-width: 540px; }
  .section-sub-center { margin: 0 auto; }
  .section-sub-light { color: rgba(255,255,255,0.62); }
  .section-header { margin-bottom: 60px; }

  /* ── OFFER GRID ── */
  .offer-grid {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 22px;
  }
  .offer-card {
    background: #fff; border: 1px solid #ddd4c4;
    border-radius: 18px; padding: 0 0 24px;
    transition: all 0.3s; overflow: hidden; position: relative;
  }
  .offer-card:hover {
    border-color: #7a9ab8;
    box-shadow: 0 12px 40px rgba(61,90,120,0.14);
    transform: translateY(-5px);
  }
  .offer-card-top-bar {
    height: 3px; background: #bccce6;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .offer-card:hover .offer-card-top-bar { transform: scaleX(1); }

  /* IMAGE PLACEHOLDER */
  .img-slot {
    width: 100%; aspect-ratio: 4/3;
    background: #eef3fa;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    border-bottom: 1px dashed #c4d4e8;
    margin-bottom: 18px;
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .offer-card:hover .img-slot { background: #dce8f5; }
  .img-slot-emoji { font-size: 46px; pointer-events: none; }
  .img-slot-label {
    font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
    color: #9ab4cc; margin-top: 8px; font-weight: 600;
  }

  .offer-card-body { padding: 0 20px; }
  .offer-card h3 {
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    color: #26211a; margin-bottom: 8px;
  }
  .offer-card p { font-size: 13px; color: #6e6558; line-height: 1.65; }

  /* ── HOW TO ORDER ── */
  .dark-blob {
    position: absolute; top: -180px; right: -150px;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(188,204,230,0.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .steps-wrapper { max-width: 1140px; margin: 0 auto; position: relative; z-index: 1; }
  .steps-connector {
    position: absolute; top: 40px; left: calc(12.5% + 28px); right: calc(12.5% + 28px);
    height: 1px; background: rgba(188,204,230,0.25);
  }
  .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
  .step { text-align: center; }
  .step-icon {
    width: 66px; height: 66px; margin: 0 auto 20px;
    background: rgba(188,204,230,0.12);
    border: 1.5px solid rgba(188,204,230,0.3);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; transition: all 0.3s;
  }
  .step:hover .step-icon { background: #e6d6bc; border-color: #e6d6bc; }
  .step h3 {
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    color: #fff; margin-bottom: 10px; line-height: 1.3;
  }
  .step p { font-size: 13px; color: rgba(255,255,255,0.58); line-height: 1.65; }
  .step p a { color: #e6d6bc; }
  .file-note {
    max-width: 1140px; margin: 40px auto 0;
    background: rgba(188,204,230,0.08); border: 1px solid rgba(188,204,230,0.2);
    border-radius: 12px; padding: 16px 24px;
    font-size: 12px; color: rgba(255,255,255,0.48); line-height: 1.75;
    position: relative; z-index: 1;
  }

  /* ── ABOUT ── */
  .about-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .about-features {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px;
  }
  .about-feat {
    background: #eef3fa; border: 1px solid #c8d8ec;
    border-radius: 14px; padding: 20px 16px;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .about-feat:hover { box-shadow: 0 4px 18px rgba(61,90,120,0.1); border-color: #9ab4cc; }
  .about-feat-icon { font-size: 22px; margin-bottom: 8px; display: block; }
  .about-feat h4 { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; color: #26211a; margin-bottom: 4px; }
  .about-feat p { font-size: 12px; color: #6e6558; line-height: 1.55; }

  /* ABOUT IMAGE */
  .about-img-wrap { position: relative; }
  .about-img-slot {
    background: #e6d6bc; border-radius: 20px;
    aspect-ratio: 3/2; border: 2px dashed #c9b898;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-size: 70px; overflow: hidden;
  }
  .about-img-slot-label { font-size: 11px; color: #9a8a74; margin-top: 10px; letter-spacing: 0.5px; }
  .about-badge {
    position: absolute; bottom: -20px; right: -20px;
    background: #bccce6; color: #26211a;
    border-radius: 14px; padding: 14px 20px;
    font-family: 'Outfit', sans-serif; text-align: center;
    box-shadow: 0 8px 28px rgba(61,90,120,0.22);
  }
  .about-badge-num { font-size: 30px; font-weight: 900; line-height: 1; display: block; }
  .about-badge-text { font-size: 12px; font-weight: 600; opacity: 0.8; }

  /* ── CONTACT ── */
  .contact-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px;
  }
  .contact-block { margin-bottom: 28px; }
  .contact-block-title {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #5a7ea0; margin-bottom: 12px; display: block;
  }
  .contact-item {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 9px; font-size: 14px; color: #26211a;
  }
  .contact-item-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .contact-item a { color: #5a7ea0; font-weight: 600; }
  .contact-item a:hover { text-decoration: underline; }
  .contact-divider { border: none; border-top: 1px solid #ddd4c4; margin: 20px 0; }
  .map-slot {
    border-radius: 14px; margin-top: 22px;
    overflow: hidden;
  }
  .map-slot p { font-size: 11px; color: #9a8a74; margin-top: 6px; letter-spacing: 0.5px; }

  /* FORM */
  .contact-form {
    background: #fff; border: 1px solid #ddd4c4;
    border-radius: 20px; padding: 40px;
    box-shadow: 0 4px 32px rgba(61,90,120,0.07);
  }
  .contact-form h3 {
    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800;
    color: #26211a; margin-bottom: 28px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .form-field label {
    font-size: 11px; font-weight: 700; color: #6e6558;
    letter-spacing: 0.8px; text-transform: uppercase;
  }
  .form-field input, .form-field textarea {
    border: 1.5px solid #ddd4c4; border-radius: 10px;
    padding: 12px 16px; font-family: 'Lato', sans-serif;
    font-size: 14px; color: #26211a; background: #f5f0e8;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
  }
  .form-field input:focus, .form-field textarea:focus {
    border-color: #9fb8d4; box-shadow: 0 0 0 3px rgba(122,154,184,0.12); background: #fff;
  }
  .form-field textarea { min-height: 110px; }
  .btn-send {
    width: 100%; background: #5a7ea0; color: #fff;
    padding: 15px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.25s; letter-spacing: 0.3px;
    box-shadow: 0 4px 16px rgba(61,90,120,0.2);
  }
  .btn-send:hover {
    background: #3d5a78; transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(61,90,120,0.3);
  }

  /* ── FLOATING FACEBOOK ── */
  .fb-float {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 999;
    width: 52px; height: 52px;
    background: #1877f2;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(24,119,242,0.45);
    transition: transform 0.25s, box-shadow 0.25s;
    text-decoration: none;
  }
  .fb-float:hover {
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 10px 32px rgba(24,119,242,0.55);
  }
  .fb-float svg {
    width: 28px; height: 28px; fill: #fff;
  }

  /* ── FOOTER ── */
  .footer {
    background: #3d5a78; color: rgba(255,255,255,0.65);
    padding: 28px 6%;
  }
  .footer-inner {
    max-width: 1140px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap;
  }
  .footer-inner p { font-size: 13px; }
  .footer-inner a { color: rgba(255,255,255,0.45); font-size: 13px; }
  .footer-inner a:hover { color: #e6d6bc; }

  /* ── HAMBURGER ── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px; height: 40px;
    padding: 6px;
    border-radius: 10px;
    cursor: pointer;
    background: none; border: none;
    transition: background 0.2s;
  }
  .nav-hamburger:hover { background: rgba(188,204,230,0.35); }
  .nav-hamburger span {
    display: block;
    height: 2px; width: 100%;
    background: #3d5a78;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .nav-mobile-menu {
    position: fixed;
    top: 76px; left: 0; right: 0;
    background: rgba(250,247,242,0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(61,90,120,0.1);
    box-shadow: 0 8px 32px rgba(61,90,120,0.12);
    padding: 16px 6% 24px;
    z-index: 199;
    display: flex; flex-direction: column; gap: 4px;
    transform: translateY(-110%);
    opacity: 0;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
    pointer-events: none;
  }
  .nav-mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav-mobile-menu a {
    display: block;
    padding: 13px 16px;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 16px; font-weight: 600;
    color: #6e6558;
    transition: all 0.2s;
  }
  .nav-mobile-menu a:hover,
  .nav-mobile-menu a.active {
    background: #bccce6;
    color: #26211a;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .anim { animation: fadeUp 0.55s ease both; }
  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.18s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.38s; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1000px) {
    .offer-grid { grid-template-columns: repeat(2,1fr); }
    .stats-inner { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 860px) {
    .hero-inner { grid-template-columns: 1fr; gap: 32px; }
    .hero-btns { flex-direction: row; flex-wrap: wrap; min-width: unset; max-width: 100%; }
    .btn-white, .btn-ghost { flex: 1; min-width: 0; padding: 16px 20px; font-size: 16px; }
    .about-inner, .contact-inner { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: repeat(2,1fr); }
    .steps-connector { display: none; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .hero { padding: 60px 5% 60px; }
    .section { padding: 60px 5%; }
    .hero-desc { max-width: 100%; }
  }
  @media (max-width: 600px) {
    .offer-grid, .steps-grid { grid-template-columns: 1fr; }
    .stats-inner { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .contact-form { padding: 24px; }
    .btn-white, .btn-ghost { font-size: 15px; padding: 14px 16px; }
    .hero-btns { flex-direction: column; }
    .about-features { grid-template-columns: 1fr; }
    .about-badge { right: 0; bottom: -16px; }
    .contact-inner { gap: 40px; }
    .hero h1 { font-size: clamp(28px, 8vw, 40px); }
  }
`;

const offerItems = [
  {
    image: kubekImg, // grawer.jpg
    title: "Gadzety reklamowe",
    desc: "Grawer laserowa na długopisach, nadruki na kubkach, smyczach i wielu innych. Obdaruj klientów gadżetem z Twoim logo!",
  },
  {
    image: wizytowkiImg, // Wizytówki.jpg
    title: "Materiały reklamowe",
    desc: "Wizytówki, ulotki, plakaty, koperty, kalendarze, naklejki, notesy, broszury — w różnych formatach.",
  },
  {
    image: cyfraImg, // Maszyna.png
    title: "Druk cyfrowy",
    desc: "Możliwość wydrukowania wielu rzeczy w wysokiej jakości przy małym nakładzie.",
  },
  {
    image: autoImg, // Auto.png
    title: "Oklejanie samochodów firmowych oraz okien witrynowych wraz z montażem.",
    desc: "",
  },
  {
    image: ksiazkiImg, // Książki.jpg
    title: "Publikacje",
    desc: "Gazety, czasopisma, tygodniki, książki i albumy. Zadbamy o wysoką jakość wydruku.",
  },
  {
    image: rolandImg, // roland (2).png
    title: "Druk wielkoformatowy",
    desc: "Banery, roll-upy, billboardy, nadruki na foliach, fototapety, mapy, kalendarze w wielkich formatach. Możliwość nacinania.",
  },
  {
    image: kseroImg, // ksero.png
    title: "Ksero",
    desc: "W biurze naszej firmy możliwość szybkiego kserowania ważnych dokumentów, notatek itp.",
  },
  {
    image: maszynaImg, // Maszyna.png
    title: "Druk offsetowy",
    desc: "Offsetowa metoda drukowania — wysoka jakość wydruków w dużych nakładach. Im więcej drukujesz, tym mniej płacisz.",
  },
  {
    image: pieczatkiImg, // Pieczątki.png
    title: "Pieczątki",
    desc: "Pieczątki w różnych wielkościach i kształtach — z mechanizmem automatycznym i tradycyjne.",
  },
  {
    image: praceImg, // Prace naukowe.jpg
    title: "Usługi introligatorskie",
    desc: "Oprawy: miękkie i twarde prac licencjackich i magisterskich, oprawy czasopism, dokumentów itp.",
  },
  {
    image: kalendarzeImg, // Kalendarze.jpg
    title: "Kalendarze",
    desc: "Różne typy kalendarzy: wiszące, trójdzielne, na biurko, planszowe i w sprężynie — w wybranej tematyce.",
  },
  {
    image: kartonikImg, // Opakowania.jpg
    title: "Opakowania",
    desc: "Produkujemy opakowania dopasowane do Twojego produktu – estetyczne, trwałe i funkcjonalne.",
  },
  {
    image: wnioskiImg, // Wnioski.jpg
    title: "Druki akcydensowe",
    desc: "Wydruk druków akcydensowych na papierze samokopiującym.",
  },
  {
    image: menuImg, // Menu.jpg
    title: "Zaproszenia",
    desc: "Tworzymy eleganckie zaproszenia na każdą okazję – ślubne, komunijne, urodzinowe i firmowe. Oferujemy wysokiej jakości druk oraz uszlachetnienia, w tym efektowne złocenie, które nadaje wyjątkowy i prestiżowy charakter.",
  },
  {
    image: grawerImg, // Tabliczki.jpg
    title: "Tabliczki informacyjne",
    desc: "Różnego rodzaju tabliczki informacyjne czy znamionowe metodą grawerowania laserowego.",
  },
  {
    image: koszulkiImg, // Koszulki.jpg
    title: "Koszulki",
    desc: "Dowolne nadruki na dobrej jakości koszulkach.",
  },
  {
    image: etuiImg, // roland (2).png
    title: "Druk UV",
    desc: "Nowoczesna technologia zapewniająca intensywne kolory, wysoką trwałość i odporność na ścieranie oraz warunki atmosferyczne. Drukujemy na różnych podłożach (papier, folia, płyty, tworzywa), z możliwością zastosowania lakieru wybiórczego.",
  },
  {
    image: torbyImg, // Torby reklamowe.png
    title: "Torby reklamowe",
    desc: "Trwałe, estetyczne i dopasowane do identyfikacji Twojej marki. Oferujemy różne formaty, rodzaje papieru oraz uszlachetnienia.",
  },
  {
    image: teczkiImg, // Teczki.jpg
    title: "Teczki twarde i miękkie z nadrukiem",
    desc: "Wykonujemy je z wysokiej jakości kartonu, z możliwością foliowania, lakieru UV lub złocenia.",
  },
  {
    image: opakowaniaImg, // Etui.jpg
    title: "Etykiety w różnych formatach i kształtach",
    desc: "Papierowe oraz foliowe, odporne na wilgoć i ścieranie.",
  },
];

// ── LEAFLET MAP — dwie pinezki ──────────────────────────────
function LeafletMap() {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (instanceRef.current) return; // już zainicjalizowana

    // Wczytaj CSS Leaflet
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    // Wczytaj JS Leaflet
    const loadLeaflet = () => {
      if (window.L) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const L = window.L;

      // Środek między dwoma punktami
      const map = L.map(mapRef.current, {
        center: [51.7752, 22.6210],
        zoom: 12,
        scrollWheelZoom: false,
      });
      instanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Własna ikona pinezki
      const pinIcon = (color) => L.divIcon({
        className: "",
        html: `<div style="
          width:32px;height:40px;position:relative;
        ">
          <svg viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.3))">
            <path d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28S28 21 28 12C28 5.373 22.627 0 16 0z" fill="${color}"/>
            <circle cx="16" cy="12" r="5" fill="white"/>
          </svg>
        </div>`,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -42],
      });

      // Pinezka 1 — Biuro ul. Dąbrowskiego 4a
      const marker1 = L.marker([51.78455, 22.61820], { icon: pinIcon("#3d5a78") })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:'Lato',sans-serif;padding:4px 2px;min-width:180px">
            <strong style="color:#3d5a78;font-size:13px">🏢 Biuro AWA-DRUK</strong><br/>
            <span style="font-size:12px;color:#444">ul. Dąbrowskiego 4a<br/>21-300 Radzyń Podlaski</span>
          </div>
        `);

      // Pinezka 2 — Drukarnia ul. Zielona 22a
      const marker2 = L.marker([51.76669, 22.62356], { icon: pinIcon("#c0392b") })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:'Lato',sans-serif;padding:4px 2px;min-width:180px">
            <strong style="color:#c0392b;font-size:13px">🏭 Drukarnia AWA-DRUK</strong><br/>
            <span style="font-size:12px;color:#444">ul. Zielona 22a<br/>21-300 Radzyń Podlaski</span>
          </div>
        `);

      marker1.openPopup();
    };

    loadLeaflet();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", borderRadius: "12px", zIndex: 1 }}
    />
  );
}

export default function AWADruk() {
  const [activeNav, setActiveNav] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);

  // ── FORMULARZ ──
  const [formData, setFormData] = useState({ from_name: "", from_email: "", subject: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  const handleNav = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.from_name || !formData.from_email || !formData.message) {
      alert("Wypełnij przynajmniej imię, e-mail i treść wiadomości.");
      return;
    }
    setFormStatus("sending");

    // Załaduj EmailJS jeśli jeszcze nie jest
    const send = () => {
      window.emailjs.send(
        "service_3t4l1uk",
        "template_jvvdq2l",
        { ...formData },
        "i1026PpWjpkua6hc2"
      ).then(() => {
        setFormStatus("success");
        setFormData({ from_name: "", from_email: "", subject: "", phone: "", message: "" });
      }).catch(() => {
        setFormStatus("error");
      });
    };

    if (window.emailjs) {
      send();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => { window.emailjs.init("i1026PpWjpkua6hc2"); send(); };
      document.head.appendChild(script);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="rainbow-bar" />

      {/* NAV */}
      <nav className="nav">
        <a
          href="#start"
          className="nav-logo"
          onClick={() => setActiveNav("start")}
        >
          <img src={logoImg} alt="AWA-DRUK logo" className="nav-logo-image" />

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
                onClick={() => handleNav(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        {[
          { id: "start", label: "Start" },
          { id: "oferta", label: "Oferta" },
          { id: "o-nas", label: "O nas" },
          { id: "jak-zamowic", label: "Jak zamówić" },
          { id: "kontakt", label: "Kontakt" },
        ].map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeNav === id ? "active" : ""}
            onClick={() => handleNav(id)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* HERO */}
      <div id="start">
        <section className="hero">
          <div className="hero-blob1" />
          <div className="hero-blob2" />
          <div className="hero-inner">
            <div>
              <span className="hero-badge anim">
                Ponad 25 lat doświadczenia
              </span>
              <h1 className="anim d1">
                Twoja drukarnia
                <br />w <em>Radzyniu Podlaskim</em>
              </h1>
              <p className="hero-desc anim d2">
                Oferujemy szeroki zakres usług drukarskich — od wizytówek po
                wielkoformatowe banery. Stale inwestujemy w nowe technologie i
                sprzęt najwyższej jakości.
              </p>
            </div>
            <div className="hero-btns anim d3">
              <a
                href="#oferta"
                className="btn-white"
                onClick={() => setActiveNav("oferta")}
              >
                Zobacz ofertę →
              </a>
              <a
                href="#kontakt"
                className="btn-ghost"
                onClick={() => setActiveNav("kontakt")}
              >
                Skontaktuj się
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* OFFER */}
      <section id="oferta" className="section section-light">
        <div className="section-header section-center">
          <span className="section-tag">Nasza oferta</span>
          <h2 className="section-title">
            Co możemy dla Ciebie <em>wydrukować?</em>
          </h2>
          <p className="section-sub section-sub-center">
            Kompleksowa obsługa poligraficzna — od projektu, przez druk, aż po
            wykończenie introligatorskie.
          </p>
        </div>

        <div className="offer-grid">
          {offerItems.map((item, i) => (
            <div className="offer-card" key={i}>
              <div className="offer-card-top-bar" />

              <div className="img-slot">
                <img
                  src={item.image}
                  alt={item.title}
                  className="offer-image"
                />
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
          <h2 className="section-title section-title-light">
            Jak <em>zamówić?</em>
          </h2>
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
                text: "Czas realizacji do 1 do 5 dni roboczych. Powiadomimy Cię o zakończeniu prac.",
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
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>
              Wymagania plików:
            </strong>{" "}
            PDF, PS, TIFF — rozdzielczość 300 dpi, spady minimum 3 mm, barwy
            CMYK lub PANTONE, czcionki zamienione na krzywe lub dołączone do
            pliku postscript, zgodność PDF od wersji 4.0.
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="o-nas" className="section">
        <div className="about-inner">
          <div>
            <span className="section-tag">Kim jesteśmy</span>
            <h2 className="section-title">
              Nowoczesna drukarnia
              <br />
              <em>z tradycją</em>
            </h2>
            <p className="section-sub">
              Jesteśmy nowoczesną drukarnią z ponad 20-letnim doświadczeniem.
              Wykonujemy coraz poważniejsze zlecenia, podejmujemy wyzwania.
              Stale unowocześniamy park maszyn i inwestujemy w doświadczonych
              fachowców.
            </p>
            <div className="about-features">
              {[
                {
                  icon: "🎨",
                  title: "CMYK & PANTONE",
                  text: "Specjalizujemy się w druku jednokolorowym i wielokolorowym.",
                },
                {
                  icon: "📐",
                  title: "Kompleksowa obsługa",
                  text: "Od projektu, przez druk, aż po wykończenie introligatorskie.",
                },
                {
                  icon: "⚡",
                  title: "Ekspresowe terminy",
                  text: "Realizacja 1 do 5 dni roboczych. Informujemy na bieżąco.",
                },
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
              <img src={drukarniaImg} alt="AWA-DRUK drukarnia" style={{width:'100%', borderRadius:'20px',display:'block'}}/>
         </div>
            <div className="about-badge">
              <span className="about-badge-num">25</span>
              <span className="about-badge-text">lat w branży</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="section section-light">
        <div className="section-header section-center">
          <span className="section-tag">Kontakt</span>
          <h2 className="section-title">
            Napisz <em>do nas</em>
          </h2>
          <p className="section-sub section-sub-center">
            Masz pytanie? Chcesz wycenić zlecenie? Skontaktuj się z nami!
          </p>
        </div>
        <div className="contact-inner">
          <div>
            {/* BIURO */}
            <div className="contact-block">
              <span className="contact-block-title">
                📍 Biuro — ul. Dąbrowskiego 4a
              </span>
              <div className="contact-item">
                <span className="contact-item-icon">🏢</span>
                <span>ul. Dąbrowskiego 4a, 21-300 Radzyń Podlaski</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">ℹ️</span>
                <span>
                  Obsługa klienta, doradztwo projektowe, kolorowe wydruki do A3.
                </span>
              </div>
            </div>
            <hr className="contact-divider" />
            {/* DRUKARNIA */}
            <div className="contact-block">
              <span className="contact-block-title">
                🏭 Drukarnia — ul. Zielona 22a
              </span>
              <div className="contact-item">
                <span className="contact-item-icon">📌</span>
                <span>ul. Zielona 22a, 21-300 Radzyń Podlaski</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon">⚙️</span>
                <span>
                  Naświetlarka CTP, druk offsetowy, maszyna arkuszowa 675×480
                  mm.
                </span>
              </div>
            </div>
            <hr className="contact-divider" />
            {/* KONTAKT */}
            <div className="contact-block">
              <span className="contact-block-title">📬 Dane kontaktowe</span>
              {[
                {
                  icon: "✉️",
                  content: (
                    <a href="mailto:biuro@awadruk.pl">biuro@awadruk.pl</a>
                  ),
                },
                {
                  icon: "✉️",
                  content: (
                    <a href="mailto:reklama@awadruk.pl">reklama@awadruk.pl</a>
                  ),
                },
                {
                  icon: "✉️",
                  content: (
                    <a href="mailto:agwd@poczta.onet.pl">agwd@poczta.onet.pl</a>
                  ),
                },
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
            {/* MAPA LEAFLET — dwie pinezki */}
            <div className="map-slot">
              <LeafletMap />
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form">
            <h3>Wyślij wiadomość</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Imię i nazwisko</label>
                <input
                  type="text" name="from_name" placeholder="Jan Kowalski"
                  value={formData.from_name} onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Adres e-mail</label>
                <input
                  type="email" name="from_email" placeholder="jan@firma.pl"
                  value={formData.from_email} onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Temat</label>
                <input
                  type="text" name="subject" placeholder="Wycena ulotki A5"
                  value={formData.subject} onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Telefon</label>
                <input
                  type="tel" name="phone" placeholder="+48 000 000 000"
                  value={formData.phone} onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Treść wiadomości</label>
              <textarea
                name="message" placeholder="Opisz swoje zamówienie lub zapytanie..."
                value={formData.message} onChange={handleChange}
              />
            </div>

            {formStatus === "success" && (
              <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", color: "#2e7d32", fontSize: "14px", fontWeight: 600 }}>
                ✅ Wiadomość wysłana! Odezwiemy się wkrótce.
              </div>
            )}
            {formStatus === "error" && (
              <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", color: "#c62828", fontSize: "14px", fontWeight: 600 }}>
                ❌ Błąd wysyłania. Spróbuj ponownie lub zadzwoń do nas.
              </div>
            )}

            <button
              className="btn-send"
              onClick={handleSubmit}
              disabled={formStatus === "sending"}
              style={{ opacity: formStatus === "sending" ? 0.7 : 1, cursor: formStatus === "sending" ? "not-allowed" : "pointer" }}
            >
              {formStatus === "sending" ? "Wysyłanie..." : "Wyślij wiadomość →"}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <p>
            © 2025 Drukarnia AWA-Druk, Radzyń Podlaski. Wszelkie prawa
            zastrzeżone.
          </p>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </footer>
      {/* FLOATING FACEBOOK */}
      <a
        href="https://www.facebook.com/share/1WYCQDTpt9/"
        target="_blank"
        rel="noopener noreferrer"
        className="fb-float"
        aria-label="Facebook AWA-DRUK"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      </a>

    </>
  );
}