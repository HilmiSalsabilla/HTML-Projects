document.addEventListener("DOMContentLoaded", () => {
    const days = [
        { name: 'Sunday',    quote: 'Reset, recharge, and maybe panic a little about Monday.' },
        { name: 'Monday',    quote: 'Let’s pretend we’re productive until coffee kicks in.' },
        { name: 'Tuesday',   quote: 'Today is just Monday with better vibes.' },
        { name: 'Wednesday', quote: 'Happy Hump Day! We’re officially sliding into the weekend.' },
        { name: 'Thursday',  quote: 'Today is the pre-party for Friday, act accordingly.' },
        { name: 'Friday',    quote: 'Work who? Weekend’s calling!' },
        { name: 'Saturday',  quote: 'Today is for naps, snacks, and pretending chores don’t exist.' }
    ];

    const today = days[new Date().getDay()];

    document.getElementById("weekday").textContent = today.name;
    document.getElementById("phrase").textContent = today.quote;
});