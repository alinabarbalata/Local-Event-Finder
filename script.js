window.onload = function () {
    const eventsContainer = document.getElementById('eventsContainer');
    const btnFilter = document.getElementById('filterBtn');
    const filterOption = document.getElementById('filterOption');
    const mapBtn = document.getElementById('mapBtn');
    const listBtn = document.getElementById('listBtn');
    const geolocationCheckbox = document.getElementById('geolocationCheckbox');
    let events = [
        {
            image: './images/event1.jpg',
            name: 'Outdoor Movie Night',
            date: '2025-01-10',
            location: 'Bucharest, Piata Amzei Street',
            description: 'Gather under the stars at Piata Amzei Street for a cozy evening of cinema magic.',
            latitude: 44.4519,
            longitude: 26.0764
        },
        {
            image: './images/event2.jpg',
            name: 'Art Festival',
            date: '2025-02-15',
            location: 'Bucharest, Cismigiu Garden',
            description: "Immerse yourself in the vibrant art scene at Cismigiu Garden's annual Art Festival.",
            latitude: 44.4356,
            longitude: 26.0877
        },
        {
            image: './images/event3.jpg',
            name: 'Charity Run',
            date: '2025-03-20',
            location: 'Bucharest, University area',
            description: "Lace up your running shoes and join us for the Charity Run in Bucharest's University area.",
            latitude: 44.4347,
            longitude: 26.1007
        },
        {
            image: './images/event4.jpg',
            name: 'Food Truck Festival',
            date: '2025-04-25',
            location: 'Bucharest, Dorobanti Street',
            description: "Satisfy your taste buds at the Food Truck Festival on Dorobanti Street.",
            latitude: 44.4551,
            longitude: 26.0929
        },
        {
            image: './images/event5.jpg',
            name: 'Science Fair',
            date: '2025-05-30',
            location: 'Bucharest, Piata Unirii',
            description: "Step into the world of science at Piata Unirii's Science Fair.",
            latitude:44.4276,
            longitude: 26.1033
        },
        {
            image: './images/event6.jpg',
            name: 'Train exposition',
            date: '2025-01-10',
            location: 'Bucharest, Gara de Nord',
            description: 'All aboard for the Train Exposition at Gara de Nord!',
            latitude: 44.4472,
            longitude: 26.0983
        },
    ];
    btnFilter.addEventListener('click', function () {
        if (filterOption.style.display === 'none') {
            filterOption.style.display = '';
        } else {
            filterOption.style.display = 'none';
        }
    });

    listBtn.addEventListener('click', function () {
        eventsContainer.innerHTML = '';
        events.forEach((event) => {
            createCanvasForEvent(event);
        });
    })

    mapBtn.addEventListener('click',function(){
        eventsContainer.innerHTML = '';
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);

    })
    function onLocationSuccess(position){
        let latitude=position.coords.latitude;
        let longitude=position.coords.longitude;

        let mapContainer=document.createElement('div');
        mapContainer.id='map';
        eventsContainer.appendChild(mapContainer);

        const map = L.map('map').setView([latitude, longitude], 17);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Multimedia'
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map);
        const circle = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#ff0033',
            fillOpacity: 0.5,
            radius: 1500
        }).addTo(map);

        const bounds = circle.getBounds();
        const minLat = bounds.getSouthWest().lat;
        const minLng = bounds.getSouthWest().lng;
        const maxLat = bounds.getNorthEast().lat;
        const maxLng = bounds.getNorthEast().lng;

        events.forEach(event => {
            if (!geolocationCheckbox.checked || (event.latitude >= minLat && event.latitude <= maxLat && event.longitude >= minLng && event.longitude <= maxLng)) {
                const marker = L.marker([event.latitude, event.longitude]).addTo(map);
                marker.bindPopup(`<b>${event.name}</b><br>${event.date}<br>${event.location}<br>${event.description}`);
            }
        });
    }

    function onLocationError(error) {
        console.log(error);
    }
    function createCanvasForEvent(event) {
        let canvasContainer = document.createElement('div');
        canvasContainer.classList.add('canvasContainer');
        eventsContainer.appendChild(canvasContainer);

        let canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 200;
        canvas.classList.add('eventCanvas');
        canvasContainer.appendChild(canvas);

        let ctx = canvas.getContext('2d');

        let img = new Image();
        img.src = event.image;
        img.onload = () => {
            ctx.drawImage(img, 10, 10, 150, 150);
            ctx.font = '16px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(`Name: ${event.name}`, 180, 30);
            ctx.fillText(`Date: ${event.date}`, 180, 50);
            ctx.fillText(`Location: ${event.location}`, 180, 70);
            ctx.fillText(`Description: ${event.description}`, 180, 90);

            let button = document.createElement('button');
            button.classList.add('registerBtn');
            button.textContent = 'Register for event';
            button.addEventListener('click', () => {
                alert(`Successfully registered for ${event.name}`);
            });
            canvasContainer.appendChild(button);
        };
    }

}

