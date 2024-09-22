// This JavaScript file provides basic navigation functionality.Students will expand this file to include more complex logic for the calendar and music player.
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('home-link');
    const calendarLink = document.getElementById('calendar-link');
    const musicLink = document.getElementById('music-link');

    const homeSection = document.getElementById('home');
    const calendarSection = document.getElementById('calendar');
    const musicSection = document.getElementById('music');

    homeLink.addEventListener('click', function() {
        homeSection.style.display = 'block';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'none';
    });

    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    calendarLink.addEventListener('click', handleCalendarDisplay);
    calendarLink.addEventListener('touchstart', handleCalendarDisplay);

    
    function handleCalendarDisplay(event){
        homeSection.style.display = 'none';
        calendarSection.style.display = 'block';
        musicSection.style.display = 'none';
        const calendarEl = document.getElementById('calendar-container');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            events: savedEvents,
            eventClick: function(info) {
                const action = prompt('Enter "edit" to edit or "delete" to delete this event:');
                if (action === 'edit') {
                    let newTitle = prompt('Enter new title:', info.event.title);
                    if (newTitle) {
                        info.event.setProp('title', newTitle);
                        updateLocalStorage();
                    }
                } else if (action === 'delete') {
                    info.event.remove();
                    updateLocalStorage();
                }
            },
            select: function(info) {
                let title = prompt('Enter event title:');
                if (title) {
                    const event = {
                        title: title,
                        start: info.startStr,
                        end: info.endStr,
                        allDay: info.allDay
                    };
                    calendar.addEvent(event);
                    savedEvents.push(event);
                    localStorage.setItem('events', JSON.stringify(savedEvents));
                }
                calendar.unselect();
            }
        });
        calendar.render();
    }

    musicLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'block';

        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');
        const fileInput = document.getElementById('fileInput');
        const playButton = document.getElementById('playButton');
        const pauseButton = document.getElementById('pauseButton');
        const skipButton = document.getElementById('skipButton');
        const volumeControl = document.getElementById('volumeControl');

        let tracks = [];
        let currentTrackIndex = 0;

        fileInput.addEventListener('change', function() {
            const files = Array.from(fileInput.files);
            tracks = files.map(file => URL.createObjectURL(file));
            currentTrackIndex = 0;
            if (tracks.length > 0) {
                loadTrack(currentTrackIndex);
            }
        });

        function loadTrack(index) {
            if (tracks.length > 0) {
                audioSource.src = tracks[index];
                audioPlayer.load();
            }
        }


        playButton.addEventListener('click', function() {
            audioPlayer.play();
        });
    
        pauseButton.addEventListener('click', function() {
            audioPlayer.pause();
        });
    
        skipButton.addEventListener('click', function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        });
    
        volumeControl.addEventListener('input', function() {
            audioPlayer.volume = volumeControl.value;
        });
    });


    function updateLocalStorage() {
        savedEvents.length = 0; // Clear the array
        calendar.getEvents().forEach(event => {
            savedEvents.push({
                title: event.title,
                start: event.start,
                end: event.end,
                allDay: event.allDay
            });
        });
        localStorage.setItem('events', JSON.stringify(savedEvents));
    }
});
