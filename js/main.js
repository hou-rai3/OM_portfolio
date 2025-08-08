
// ===== GSAP + ScrollTrigger Animation Sample =====
window.addEventListener('DOMContentLoaded', () => {
  // ヒーローテキストをフェードイン
  gsap.from('.hero-content h1', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out' });
  gsap.from('.hero-content p', { opacity: 0, y: 40, duration: 1, delay: 0.5, ease: 'power2.out' });

  // Aboutセクションをスクロールでアニメーション
  gsap.from('.about h2', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out'
  });
  gsap.from('.about p', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 75%',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out'
  });

  // Worksセクションの各アイテムを順にアニメーション
  gsap.utils.toArray('.work-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'power2.out'
    });
  });

  // Contactセクション
  gsap.from('.contact h2', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out'
  });
  gsap.from('.contact p', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 75%',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out'
  });

  // ナビゲーションのスムーススクロール
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});