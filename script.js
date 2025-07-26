const menuButton = document.getElementById("menuButton");
let isMenuOpened = false;

function toggleMenu() {
    isMenuOpened = !isMenuOpened;
    if (isMenuOpened) {
        // メニューを開いた時の処理
        menuButton.classList.add("is-opened");
    } else {
        // メニューを閉じた時の処理
        menuButton.classList.remove("is-opened");
    }
}

menuButton.addEventListener("click", toggleMenu);

// スクロールアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // トップセクションのアニメーション
    const animateTopSection = () => {
        const topTitle = document.querySelector('.top_title');
        const topDescription = document.querySelector('.top_description');
        
        // 初回ロード時のアニメーション
        setTimeout(() => {
            topTitle.classList.add('visible');
            topDescription.classList.add('visible');
        }, 500);
    };
    
    // 通常の要素用のIntersection Observer設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 要素が画面内に入った場合
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                console.log(`${entry.target.className} is now visible`);
            } else {
                // 要素が画面外に出た場合
                entry.target.classList.remove('visible');
                console.log(`${entry.target.className} is now hidden`);
            }
        });
    }, {
        threshold: 0.1, // 要素の10%が見えたらコールバックを実行
        rootMargin: '-50px' // 少し余裕を持たせる
    });
    
    // ボックス用のIntersection Observer設定
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // ボックスが画面内に入った場合
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // ボックス内の要素も可視状態にする
                const boxElements = entry.target.querySelectorAll('.box_text, .border-top, .border-bottom, .border-left, .border-right');
                boxElements.forEach(el => {
                    el.classList.add('visible');
                });
            } else {
                // ボックスが画面外に出た場合
                entry.target.classList.remove('visible');
                // ボックス内の要素も非表示にする
                const boxElements = entry.target.querySelectorAll('.box_text, .border-top, .border-bottom, .border-left, .border-right');
                boxElements.forEach(el => {
                    el.classList.remove('visible');
                });
            }
        });
    }, {
        threshold: 0.5, // ボックスの50%が見えたらコールバックを実行
        rootMargin: '0px' // マージンなし
    });
    
    // トップセクションのアニメーション実行
    animateTopSection();
    
    // 監視する要素を登録
    const elements = document.querySelectorAll('.top_title, .top_description, .about_title, .about_description, .how_title, .how_description, .what_title, .what_description, .advantages_title, .advantages_description, .advantages_list, .practice_title, .practice_description, .code_block');
    elements.forEach(el => {
        observer.observe(el);
    });
    
    // ボックス要素を別のobserverで監視
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        boxObserver.observe(box);
    });
    
    // リストアイテムのアニメーション設定
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // リストが表示されたら、各アイテムにクラスを追加
                const listItems = entry.target.querySelectorAll('.list_item');
                listItems.forEach(item => {
                    item.classList.add('visible');
                });
            } else {
                // リストが非表示になったら、各アイテムからクラスを削除
                const listItems = entry.target.querySelectorAll('.list_item');
                listItems.forEach(item => {
                    item.classList.remove('visible');
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    // リスト要素を監視
    const lists = document.querySelectorAll('.advantages_list');
    lists.forEach(list => {
        listObserver.observe(list);
    });
});