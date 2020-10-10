(function() {
    const formElement = document.getElementById("start-form");
    const displayElement = document.getElementById("display");
    const remainingTimeElement = document.getElementById("remaining-time");

    const urlParams = new URLSearchParams(window.location.search);
    const time = urlParams.get('time');
    
    if (time) {
        startTimer(time);
    } else {
        displayElement.classList.add("hide");
    }

    document.getElementById("form").addEventListener("submit", onSubmit);

    function onSubmit(evt) {
        evt.preventDefault();
        const numMinutes = parseInt(document.getElementById("field-minutes").value);
        const numSeconds = parseInt(document.getElementById("field-seconds").value);
        startTimer(numMinutes * 60 + numSeconds);
    }

    function startTimer(numSeconds) {
        displayElement.classList.remove("hide");
        formElement.classList.add("hide");

        function updateTimer(remainingTime) {
            const minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            if (seconds < 10) seconds = "0" + seconds;

            remainingTimeElement.innerText = `${minutes}:${seconds}`;
            if (remainingTime > 0)
                setTimeout(() => updateTimer(remainingTime - 1), 1000);
        }

        updateTimer(numSeconds);
    }
})();
