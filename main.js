// File: main.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const langFlags = document.querySelectorAll('.lang-switcher .flag');
  const readMoreBtn = document.getElementById('btn-read-more');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  /* =========================
     الترجمات (ar/en)
  ========================== */
  const translations = {
    ar: {
      brandName: "محمد محمود",
      navWork: "أعمال",
      navMore: "المزيد",
      navContact: "اتصل",
      heroHello: "مرحباً، أنا",
      heroTitle: "مطوّر <span class='accent'>مبدع</span> + مصمم",
      heroSub: "أبتكر تجارب واقع معزز (AR)، تصميمات جرافيك عالية الجودة، وكود منظّم وقابل للإنتاج — أوازن بين الجمال والهيكل.",
      btnReadMore: "اقرأ المزيد",
      btnContact: "تواصل معي →",
      statusText: "متاح للعمل · AR · جرافيك · كود",
      sectionMoreTitle: "نماذج مختارة",
      footerCta: "هل تريد العمل معاً؟ <a href='mailto:you@example.com'>راسلني</a>",
      footerCopy: "© {{year}} محمد محمود. كل الحقوق محفوظة.",

      card1Meta: "تجربة AR",
      card1Title: "تجربة قياس افتراضية",
      card1Desc: "تجربة AR markerless مع شيدر للواقعية.",

      card2Meta: "براندنج",
      card2Title: "هوية رقمية عصرية",
      card2Desc: "شعارات، أنظمة طباعة وحركة لعلامات رقمية.",

      card3Meta: "تطبيق ويب",
      card3Title: "لوحة تحكم آنية",
      card3Desc: "React + WebSocket لتحديثات في الوقت الحقيقي."
    },
    en: {
      brandName: "Mohamed Mahmoud",
      navWork: "Work",
      navMore: "More",
      navContact: "Contact",
      heroHello: "Hello, I'm",
      heroTitle: "Creative <span class='accent'>Developer</span> + Designer",
      heroSub: "I create AR experiences, high-quality graphic design, and production-ready code — balancing beauty and structure.",
      btnReadMore: "Read More",
      btnContact: "Contact Me →",
      statusText: "Available for work · AR · Graphics · Code",
      sectionMoreTitle: "Selected Works",
      footerCta: "Want to collaborate? <a href='mailto:you@example.com'>Email me</a>",
      footerCopy: "© {{year}} Mohamed Mahmoud. All rights reserved.",

      card1Meta: "AR EXPERIENCE",
      card1Title: "Virtual Measuring Experience",
      card1Desc: "Markerless AR with realistic shader effects.",

      card2Meta: "BRANDING",
      card2Title: "Modern Digital Identity",
      card2Desc: "Logos, typography systems, and motion for digital brands.",

      card3Meta: "WEB APP",
      card3Title: "Real-time Dashboard",
      card3Desc: "React + WebSocket for live updates."
    }
  };

  /* =========================
     تطبيق الترجمة
  ========================== */
  function applyLanguage(lang, persist = true) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'en' ? 'ltr' : 'rtl';
    if (persist) localStorage.setItem('site-lang', lang);

    if (translations[lang]) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let text = translations[lang][key];
        if (!text) return;
        text = text.replace('{{year}}', new Date().getFullYear());
        el.innerHTML = text;
      });
    }

    // تحديث حالة الأعلام
    langFlags.forEach(flag => {
      const isActive = flag.getAttribute('data-lang') === lang;
      flag.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      flag.classList.toggle('active', isActive);
    });
  }

  /* =========================
     أحداث تغيير اللغة
  ========================== */
  langFlags.forEach(flag => {
    flag.setAttribute('role', 'button');
    flag.setAttribute('tabindex', '0');

    flag.addEventListener('click', () => {
      const lang = flag.getAttribute('data-lang');
      if (lang) applyLanguage(lang);
    });

    flag.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        flag.click();
      }
    });
  });

  // لغة ابتدائية من التخزين أو النظام
  const saved = localStorage.getItem('site-lang');
  const inferred = (navigator.language && navigator.language.startsWith('en')) ? 'en' : 'ar';
  applyLanguage(saved || inferred, !!saved);

  /* =========================
     زر اقرأ المزيد
  ========================== */
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
      const target = document.querySelector('#more-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* =========================
     زر الهامبرجر
  ========================== */
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
});
