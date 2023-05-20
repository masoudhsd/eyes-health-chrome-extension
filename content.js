(() => {
  let timer;

  function startTimer() {
    const startTime = localStorage.getItem("timerStartTime");
    const elapsedTime = startTime ? Date.now() - startTime : 0;

    if (elapsedTime >= 20 * 60 * 1000) {
      displayMessage();
    } else {
      timer = setTimeout(displayMessage, 20 * 60 * 1000 - elapsedTime);
      localStorage.setItem("timerStartTime", Date.now());
    }
  }

  function displayMessage() {
    document.body.innerHTML += `
      <div
        style="
          position: fixed;
          bottom: 10px;
          right: 0;
          width: 20%;
          height: 15%;
          padding: 2px 20px;
          background: #fefefe;
          z-index: 100000;
          border-radius: 20px;
          box-shadow: 0px 0px 93px 40px rgba(0, 0, 0, 0.1);
        "
      >
        <p style="font-family: sans-serif; font-weight: 600; font-size: 14px">
          Hey, You have been staring at your device for 20 minutes! Please get up and
          look at something far away for 20 meters for 20 seconds.
        </p>
        <button
          id="got-it-btn"
          style="
            border-radius: 8px;
            background-color: blue;
            color: #fefefe;
            padding: 10px 40px;
            position: absolute;
            bottom: 10px;
            right: 10px;
            border: none;
          "
        >
          Got it!
        </button>
      </div>
    `;

    let element = document.getElementById("got-it-btn");
    element.addEventListener(
      "click",
      function (e) {
        let parentElement = e.target.parentElement;
        parentElement.remove();
        clearTimeout(timer);
        localStorage.removeItem("timerStartTime");
        startTimer();
      },
      false
    );
  }

  // Start the initial timer
  startTimer();
})();
