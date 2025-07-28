// Loading画面の制御
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  
  // 最低2秒間はLoading画面を表示
  setTimeout(() => {
    loading.classList.add('fade-out');
    
    // フェードアウト完了後にLoading要素を削除
    setTimeout(() => {
      loading.remove();
    }, 500);
  }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
  // 要素取得
  const menuButton = document.getElementById("menuButton");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.querySelectorAll(".nav-menu__link");
  const body = document.body;

  // メニューの開閉
  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('is-open');
    
    navMenu.classList.toggle('is-open', !isOpen);
    navOverlay.classList.toggle('is-open', !isOpen);
    menuButton.classList.toggle('is-opened', !isOpen);
    body.classList.toggle('nav-open', !isOpen);
  };

  // メニューを閉じる
  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    menuButton.classList.remove('is-opened');
    body.classList.remove('nav-open');
  };

  // イベントリスナー
  menuButton?.addEventListener("click", toggleMenu);
  navOverlay?.addEventListener("click", closeMenu);

  // ナビリンククリック時の処理
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        closeMenu();
      }
    });
  });

  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ヒーロー初期アニメーション（Loading完了後に実行）
  setTimeout(() => {
    document.querySelector('.hero__title')?.classList.add('visible');
    document.querySelector('.hero__description')?.classList.add('visible');
  }, 3000); // Loading時間 + 少し遅延

  // スクロールアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const { target, isIntersecting } = entry;
      target.classList.toggle('visible', isIntersecting);
      
      // 子要素も同時制御
      const children = target.querySelectorAll('[class*="__text"], [class*="__border"], [class*="__item"]');
      children.forEach(child => child.classList.toggle('visible', isIntersecting));
    });
  }, { threshold: 0.2, rootMargin: '-50px' });

  // 監視対象要素
  const selectors = [
    '.section__title',
    '.section__description', 
    '.demo-box',
    '.image-grid',
    '.feature-list',
    '.code-demo'
  ];

  // 監視開始
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });
});
