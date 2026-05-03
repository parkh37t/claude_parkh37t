const newCatBtn = document.getElementById('newCatBtn');
const randomCat = document.getElementById('randomCat');
const refreshGalleryBtn = document.getElementById('refreshGalleryBtn');
const gallery = document.getElementById('gallery');
const meowBtn = document.getElementById('meowBtn');
const meowText = document.getElementById('meowText');

const meows = [
    '야옹~ 🐱',
    '냐옹! 😸',
    '먀우~ 😻',
    '갸르릉... 😺',
    '냐아아옹! 🙀',
    '쪼옥 (츄르 주세요) 😽',
    '나비야~ 🐈',
    '꾹꾹이 시작! 😼'
];

newCatBtn.addEventListener('click', () => {
    randomCat.style.opacity = '0.3';
    randomCat.src = `https://cataas.com/cat?random=${Date.now()}`;
    randomCat.onload = () => {
        randomCat.style.transition = 'opacity 0.4s ease';
        randomCat.style.opacity = '1';
    };
});

refreshGalleryBtn.addEventListener('click', () => {
    const images = gallery.querySelectorAll('img');
    images.forEach((img, index) => {
        img.style.opacity = '0.3';
        setTimeout(() => {
            img.src = `https://cataas.com/cat?type=square&random=${Date.now()}-${index}`;
            img.onload = () => {
                img.style.transition = 'opacity 0.4s ease';
                img.style.opacity = '1';
            };
        }, index * 80);
    });
});

meowBtn.addEventListener('click', () => {
    const randomMeow = meows[Math.floor(Math.random() * meows.length)];
    meowText.textContent = randomMeow;
    meowText.style.animation = 'none';
    void meowText.offsetWidth;
    meowText.style.animation = 'bounce 0.5s ease';
});

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const img = e.target;
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); display: flex; justify-content: center;
            align-items: center; z-index: 1000; cursor: pointer; padding: 2rem;
        `;
        const enlarged = document.createElement('img');
        enlarged.src = img.src;
        enlarged.style.cssText = `
            max-width: 90%; max-height: 90%; border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        `;
        overlay.appendChild(enlarged);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    }
});
