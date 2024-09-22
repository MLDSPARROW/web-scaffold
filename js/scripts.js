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
    calendarLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'block';
        musicSection.style.display = 'none';
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
    });

    musicLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'block';
    });
});
