// Инициализация карты (центр на Санкт-Петербурге)
const map = L.map('map').setView([59.9343, 30.3351], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locations = [
    {
        title: "Нарвские триумфальные ворота",
        coords: [59.9011, 30.2743],
        description: "Temp",
        images: [
            "images/triumf.jpg",
            "images/triumf2.jpg",
        ]
    }
]

locations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);

    // Создаём HTML-строку для всех изображений
    let imagesHTML = '<div class="swiper"> <div class="swiper-wrapper">';

    location.images.forEach(image => {
        imagesHTML += `<div class ="swiper-slide"><img src="${image}" style="width: 100%; height: auto;"></div>`;
    });
    imagesHTML += `
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    `;
    // Добавляем всплывающее окно с заголовком, изображениями и описанием
    marker.bindPopup(`
        <h4>${location.title}</h4>
        ${imagesHTML}
        <p>${location.description}</p>
    `);
    marker.on('popupopen', () => {
        new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
            },
        })
    })
});
