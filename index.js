document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dob = new Date(2006, 12, 20); // Дата рождения
    const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    let age = today.getFullYear() - dob.getFullYear();

    if (today < dobnow) {
        age = age - 1;
    }

    document.querySelector('[data-age]').innerHTML = age;


    const coords = [
        {options: [59.968398,  30.494965], text:'Реконструкция КЛ 6 кВ (ф.24-41 - 7615), протяженностью 3 км для Правобережного РЭС ПАО «Ленэнерго»'},
        {options: [59.971551,  30.449726], text:'Реконструкция  БКТП №7588, строительство кабельного киоска и КЛ-0,4 кВ, заявитель: ООО «Универсал-4»'},
        {options: [59.929362,  30.349600], text:'Строительство КЛ 0,4 кВ с установкой нового кабельного киоска, заявитель: ООО "СБС-СЕРВИС"'},
        {options: [59.970069,  30.339260], text:'Строительство нового кабельного киоска взамен существующего кабельного киоска №1776, заявитель: ГУП «ТЭК СПб»'},
        {options: [59.981721,  30.408610], text:'Строительство КЛ-0,4 кВ, заявитель: ООО «Вереск-А» (строительный магазин)'},
        {options: [59.965021,  30.375292], text:'Прокладка КЛ, заявитель: ООО «Вертикаль»'},
        {options: [59.941484,  30.363398], text:'Прокладка КЛ, заявитель: ООО «ПК»'},
        {options: [59.947392,  30.410739], text:'Строительство КЛ 0,4 кВ с установкой нового кабельного киоска, заявитель: УМВД РФ по Красногвардейскому району г. Санкт-Петербурга'},
        {options: [59.840198,  30.170745], text:'Вынос сетей из под пятна застройки. Общеразвивающее дошкольное обшеобразовательное учреждение на 220 мест'},
        {options: [59.935205,  30.439692], text:'Реконструкция БКТП №17412, заявитель: ООО «Оутдор Медиа Менеджмент»'},
        {options: [59.901008,  30.464180], text:'Реконструкция БКТП №13501, строительство нового кабельного киоска, КЛ 0,4 кВ, заявитель: ООО «Вилия»'},
        {options: [59.951434,  30.410110], text:'Ремонт поврежденной КЛ 10 кВ для ООО «Сотэкс»'},
        {options: [59.918241,  30.442980], text:'Создание временной схемы электроснабжения здания детской поликлиники (прокладка КЛ 0,4 кВ) для СПбГКУ «Фонд капитального строительства и реконструкции»'},
        {options: [59.929362,  30.349600], text:'Строительство КЛ 0,4 кВ с установкой нового кабельного киоска, заявитель: ООО «СБС-СЕРВИС»'},
        {options: [59.965309,  30.345036], text:'Прокладка КЛ, заявитель: ООО «Виктория»'},
        {options: [59.965237,  30.435847], text:'Строительство кабельного киоска и КЛ-0,4 кВ, заявитель: ООО «Арго»'},
        {options: [59.971283,  30.348709], text:'Строительство нового кабельного киоска и КЛ-0,4 кВ, заявитель: ООО «Линк Девелопмент»'},
        {options: [59.743948,  30.647275], text:'Прокладка КЛ, заявитель:  ООО «Линк Девелопмент»'},
        {options: [59.983283,  30.354011], text:'Строительство нового кабельного киоска и КЛ-0,4 кВ, заявитель: ООО «Линк Девелопмент»'},
    ]

    ymaps.ready(initProjects);
    ymaps.ready(initAddress);


    function initProjects () {
        // Создание карты.
        const myMap = new ymaps.Map('mapProjects', {
            center: [59.947187, 30.383418],
            zoom: 12,
            controls: []
        });

        const myGeoObjects = [];
        for (let i = 0; i < coords.length; i++) {
            myGeoObjects[i] = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coords[i].options
                },
                properties: {
                    clusterCaption: 'Объект № '+(i+1),
                    balloonContentBody: coords[i].text
                }
            });
        }

        const myClusterer = new ymaps.Clusterer();
        myClusterer.add(myGeoObjects);
        myMap.controls.add('zoomControl');
        myMap.geoObjects.add(myClusterer);
        myMap.behaviors.disable(['scrollZoom', 'drag']);
    }
    function initAddress () {
        const myMap = new ymaps.Map('mapAddress', {
            center: [60.074599, 30.353831],
            zoom: 17,
            controls: []
        });
        const address = new ymaps.Placemark([60.074599, 30.353831]);
        myMap.controls.add('zoomControl');
        myMap.geoObjects.add(address);
        myMap.behaviors.disable(['scrollZoom', 'drag']);
    }

    $('.owl-carousel').owlCarousel({
        loop: true,
        items:2,
        margin:60,
        nav:false,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 1500,
        dotsEach: true,
        responsive:{
            0:{
                items:2,
            },
            400:{
                items:2,
            },
            1000:{
                items:5,
            }
        }
    })

    const phoneMask = document.getElementById('phone');
    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };
    const mask = IMask(phoneMask, maskOptions);

    new WOW().init();

    $('.drawer').drawer();

    document.addEventListener('submit', (event) => {
        event.preventDefault();

        const body = 'name=' + encodeURIComponent(event.target[0].value) +
            '&email=' + encodeURIComponent(event.target[1].value) +
            '&phone=' + encodeURIComponent(event.target[2].value);

        const oReq = new XMLHttpRequest();
        oReq.open('POST', '/main.php', true);
        oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        oReq.send(body);

        document.forms[0].reset();

        alert('Заявка отправлена!')
    })

    document.querySelector('.drawer-menu').addEventListener('click', (event) => {
        if (event.target.nodeName.toLowerCase() === 'a') {
            $('.drawer').drawer('close');
        }
    })
})
