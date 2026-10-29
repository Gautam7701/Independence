"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Heart, Sparkles, X } from "lucide-react";
import { akanksha } from "@/data/akanksha";

const sectionIds = ["welcome", "note", "scrapbook", "appreciation", "vibe", "happiness", "garden", "goodbye"];
const offsets = [-4, 3, -2, 4, -3, 2];

function Bow({ small = false }: { small?: boolean }) {
  return <span className={`bow ${small ? "bow-small" : ""}`} aria-hidden="true"><i /><b>♡</b><i /></span>;
}

function Heading({ eyebrow, children, subtitle }: { eyebrow?: string; children: React.ReactNode; subtitle?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow || "A LITTLE SOMETHING, JUST BECAUSE"}</span><h2>{children}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [gift, setGift] = useState<string | null>(null);
  const [giftCount, setGiftCount] = useState(0);
  const [planted, setPlanted] = useState<string[]>([]);
  const [resetArmed, setResetArmed] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);

  useEffect(() => {
    const updateSection = () => {
      const marker = window.innerHeight * 0.45;
      const current = sectionIds.findIndex((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      if (current >= 0) setActive(current);
    };
    window.addEventListener("scroll", updateSection, { passive: true });
    updateSection();
    return () => window.removeEventListener("scroll", updateSection);
  }, []);

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  const openGift = () => {
    const choices = akanksha.gifts.filter((message) => message !== gift);
    setGift(choices[Math.floor(Math.random() * choices.length)]);
    setGiftCount((count) => count + 1);
    setSparkleKey((key) => key + 1);
  };
  const closeLightbox = () => setLightbox(null);

  return <main>
    <div className="grain" aria-hidden="true" />
    <header className="topbar"><a href="#welcome" className="brand" onClick={(e) => { e.preventDefault(); jumpTo("welcome"); }}><Bow small /> a little something</a><a className="top-link" href="#scrapbook" onClick={(e) => { e.preventDefault(); jumpTo("scrapbook"); }}>take a peek <ArrowDown size={14} /></a></header>
    <aside className="progress" aria-label="Page sections"><span className="progress-line"><i style={{ height: `${((active + 1) / sectionIds.length) * 100}%` }} /></span>{sectionIds.map((id, i) => <button key={id} className={active === i ? "progress-dot active" : "progress-dot"} aria-label={`Go to section ${i + 1}`} onClick={() => { setActive(i); jumpTo(id); }} />)}</aside>

    <section id="welcome" className="hero section" onMouseEnter={() => setActive(0)}>
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <span className="hero-star star-one">✳</span><span className="hero-star star-two">✧</span><span className="hero-star star-three">✳</span>
      <div className="hero-content"><div className="envelope-wrap"><div className={opened ? "envelope opened" : "envelope"}><div className="envelope-back" /><div className="letter-peek"><Heart size={19} fill="currentColor" /><span>a little hello</span></div><div className="envelope-front" /><div className="envelope-flap" /><div className="envelope-sticker"><Bow /></div></div><span className="envelope-shadow" /></div>
        <p className="hero-kicker">A SMALL THING, MADE WITH CARE</p><h1>{akanksha.name}<span className="hero-heart">♡</span></h1><p className="hero-tagline">{akanksha.tagline}</p><p className="hero-intro">{akanksha.opening}<br />I hope you like it.</p>
        <button className="button button-primary" onClick={() => { setOpened(true); setTimeout(() => jumpTo("note"), reduceMotion ? 0 : 650); setActive(1); }}>open your little surprise <Heart size={16} /></button>
        <button className="skip-link" onClick={() => { setOpened(true); jumpTo("note"); setActive(1); }}>skip the animation <ArrowRight size={13} /></button>
      </div><span className="side-note">A DIGITAL SCRAPBOOK&nbsp; · &nbsp;EST. WITH A LITTLE EXTRA EFFORT</span>
    </section>

    <section id="note" className="note-section section" onMouseEnter={() => setActive(1)}><div className="section-number">01 <span>— A NOTE</span></div><div className="note-layout"><div className="note-aside"><span className="scribble">for you,</span><p>because some ideas<br />are too cute to keep<br />in your notes app.</p><span className="doodle-flower">✿</span></div><motion.article className="paper-note" initial={{ opacity: 0, y: 22, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: -1.2 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .7 }}><div className="tape" /><span className="note-date">A NOTE FOR A NICE HUMAN</span><h2>hi, {akanksha.name} <span>♡</span></h2><p>{akanksha.note} 🎀</p><p className="signature">— someone who enjoys making things <Sparkles size={14} /></p><button className="text-button" onClick={() => jumpTo("scrapbook")}>okay, show me more <ArrowRight size={16} /></button></motion.article><div className="note-doodle">✳<span>just<br />because</span></div></div></section>

    <section id="scrapbook" className="scrapbook-section section" onMouseEnter={() => setActive(2)}><div className="section-number">02 <span>— THE SCRAPBOOK</span></div><Heading eyebrow="A FEW LITTLE PAGES" subtitle="a few pictures, a few details, and a little extra effort.">your little corner<br />of the internet</Heading><div className="photo-grid">{akanksha.photos.map((photo, i) => <motion.button key={photo.src} className={`polaroid polaroid-${i + 1}`} style={{ "--tilt": `${offsets[i]}deg` } as React.CSSProperties} onClick={() => setLightbox(i)} whileHover={reduceMotion ? {} : { y: -8, rotate: 0, scale: 1.025 }} whileTap={{ scale: .97 }} aria-label={`Open photo: ${photo.caption}`}><span className="photo-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 42vw, 260px" /></span><span className="photo-caption">{photo.caption}</span><span className="photo-index">0{i + 1}</span><span className="photo-sticker">✳</span></motion.button>)}</div><p className="replace-hint"><span>✿</span> A few little placeholders, ready for real-life memories whenever you like.</p></section>

    <section id="appreciation" className="appreciation-section section" onMouseEnter={() => setActive(3)}><div className="section-number">03 <span>— THE NICE THINGS</span></div><Heading eyebrow="SOME THINGS ARE NICE TO HEAR" subtitle="because nice things deserve to be said sometimes.">the tiny appreciation<br />corner <span className="heading-heart">♡</span></Heading><div className="appreciation-grid">{akanksha.appreciations.map(([title, message], i) => <button key={title} className={`appreciation-card ${flipped === i ? "is-flipped" : ""}`} onClick={() => setFlipped(flipped === i ? null : i)} aria-pressed={flipped === i}><span className="card-inner"><span className="card-face card-front"><span className="card-number">0{i + 1}</span><span className="card-flower">{["✿", "❀", "✳", "❋", "✾", "❁"][i]}</span><span className="card-title">{title}</span><span className="card-hint">tap to open <ArrowRight size={13} /></span></span><span className="card-face card-back"><span className="card-back-icon"><Heart size={18} fill="currentColor" /></span><span className="card-message">{message}</span><span className="card-hint">tap to close <ArrowLeft size={13} /></span></span></span></button>)}</div></section>

    <section id="vibe" className="vibe-section section" onMouseEnter={() => setActive(4)}><div className="section-number">04 <span>— A VERY IMPORTANT QUESTION</span></div><div className="vibe-wrap"><div className="vibe-copy"><span className="eyebrow">NO WRONG ANSWERS, PROMISE</span><h2>important question,<br /><em>actually...</em></h2><p>what&apos;s the current vibe?</p><span className="vibe-squiggle">〰</span></div><div className="mood-panel"><AnimatePresence mode="wait">{mood === null ? <motion.div key="options" className="mood-options" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 8 }}><p>Pick whichever feels like today:</p>{akanksha.moods.map(([icon, label], i) => <motion.button key={label} className="mood-option" onClick={() => { setMood(i); setSparkleKey((key) => key + 1); }} whileHover={{ x: 5 }} whileTap={{ scale: .98 }}><span className="mood-emoji">{icon}</span><span>{label}</span><ArrowRight size={15} /></motion.button>)}</motion.div> : <motion.div key="response" className={`mood-response mood-${mood}`} initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><span className="response-icon">{akanksha.moods[mood][0]}</span><span className="eyebrow">TODAY&apos;S LITTLE REMINDER</span><p>{akanksha.moods[mood][2]}</p><button className="text-button" onClick={() => setMood(null)}>pick another vibe <ArrowRight size={15} /></button></motion.div>}</AnimatePresence></div></div><span key={sparkleKey} className="mood-sparkle" aria-hidden="true">✧</span></section>

    <section id="happiness" className="gift-section section" onMouseEnter={() => setActive(5)}><div className="section-number">05 <span>— A TINY SURPRISE</span></div><div className="gift-layout"><div className="gift-copy"><span className="eyebrow">A LITTLE BUTTON OF JOY</span><h2>the tiny<br /><em>happiness</em><br />machine <span>🎁</span></h2><p>tap the box. it has something for you.</p><p className="gift-counter">tiny surprises opened: <b>{giftCount}</b></p></div><div className="gift-stage"><AnimatePresence>{gift && <motion.div key={giftCount} className="gift-message" initial={{ opacity: 0, y: 15, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><span>✧ A TINY SURPRISE ✧</span><p>{gift}</p></motion.div>}</AnimatePresence><motion.button className={`gift-box ${gift ? "gift-open" : ""}`} onClick={openGift} whileHover={reduceMotion ? {} : { y: -5 }} whileTap={{ scale: .96 }} aria-label="Open the tiny happiness machine"><span className="gift-lid"><i /><b /></span><span className="gift-body"><i /></span><span className="gift-sparkle">✧</span></motion.button><span className="gift-shadow" /></div></div></section>

    <section id="garden" className="garden-section section" onMouseEnter={() => setActive(6)}><div className="section-number">06 <span>— A LITTLE BONUS</span></div><Heading eyebrow="GROW A SMALL HAPPY THOUGHT" subtitle="pick a little word and watch it grow.">plant a little<br />happy thought <span>🌷</span></Heading><div className="garden-bed" aria-label={`A little garden with ${planted.length} flowers planted`}><div className="garden-sky"><span>☁</span><i>✧</i><b>✦</b></div><div className="planted-row">{planted.map((flower, i) => <motion.div key={`${flower}-${i}`} className={`planted-flower flower-color-${i % 4}`} initial={{ opacity: 0, scale: .25, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 190, damping: 14 }}><span className="bloom">{["✿", "❀", "✾", "✽", "❁", "✳"][i]}</span><span className="stem" /><span className="leaf leaf-left" /><span className="leaf leaf-right" /><span className="flower-word">{flower}</span></motion.div>)}</div><div className="garden-soil"><span>✿</span><span>·</span><span>✽</span><span>·</span><span>✿</span></div></div><div className="plant-controls"><p>choose something to plant <span>{planted.length}/6</span></p><div className="plant-options">{akanksha.flowers.map((flower, i) => <button key={flower} disabled={planted.length >= 6} onClick={() => setPlanted([...planted, flower])}><span>{["✿", "❀", "✾", "✽", "❁", "✳"][i]}</span>{flower}</button>)}</div><button className="reset-garden" onClick={() => { if (resetArmed) { setPlanted([]); setResetArmed(false); } else setResetArmed(true); }} disabled={planted.length === 0}>{resetArmed ? <><Check size={14} /> yes, clear the garden</> : <>start a new garden <ArrowRight size={14} /></>}</button>{resetArmed && <button className="cancel-reset" onClick={() => setResetArmed(false)}>actually, keep it</button>}</div></section>

    <section id="goodbye" className="goodbye-section section" onMouseEnter={() => setActive(7)}><div className="section-number">07 <span>— BEFORE YOU GO</span></div><div className="goodbye-frame"><div className="goodbye-sparkles">✳ <span>✧</span> ✦</div><div className="goodbye-polaroid"><Image src="/images/akanksha/final-photo.svg" alt="A small illustrated bouquet of flowers" fill sizes="180px" /><span>a little thing to keep ♡</span></div><article className="goodbye-note"><div className="goodbye-bow"><Bow /></div><span className="eyebrow">THAT&apos;S THE LITTLE TOUR</span><h2>before you go... <span>♡</span></h2><p>{akanksha.final} 🎀</p><p className="goodbye-signature">made with a little extra effort,<br />just because ♡</p><button className="button button-primary" onClick={() => { setActive(0); jumpTo("welcome"); setOpened(false); }}>revisit the little surprise <ArrowUp size={15} /></button></article><span className="goodbye-footnote">MADE ON A VERY NORMAL DAY, FOR NO PARTICULAR REASON.</span></div><footer><span>with a little extra care <Heart size={12} fill="currentColor" /></span><button onClick={() => jumpTo("welcome")} aria-label="Back to top"><ArrowUp size={15} /> back to the beginning</button></footer></section>

    <AnimatePresence>{lightbox !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={akanksha.photos[lightbox].caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox} onKeyDown={(e) => { if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % akanksha.photos.length); if (e.key === "ArrowLeft") setLightbox((lightbox + akanksha.photos.length - 1) % akanksha.photos.length); }} tabIndex={-1}><button className="lightbox-close" onClick={closeLightbox} aria-label="Close photo"><X /></button><button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + akanksha.photos.length - 1) % akanksha.photos.length); }} aria-label="Previous photo"><ArrowLeft /></button><motion.div className="lightbox-card" onClick={(e) => e.stopPropagation()} initial={{ scale: .9, y: 18 }} animate={{ scale: 1, y: 0 }}><div className="lightbox-image"><Image src={akanksha.photos[lightbox].src} alt={akanksha.photos[lightbox].alt} fill sizes="(max-width: 600px) 80vw, 520px" /></div><p>{akanksha.photos[lightbox].caption}</p></motion.div><button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % akanksha.photos.length); }} aria-label="Next photo"><ArrowRight /></button></motion.div>}</AnimatePresence>
  </main>;
}
