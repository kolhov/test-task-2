$.fn.trackCoords = function (
  endpoint,
  checkInterval = 30,
  sendInterval = 3000,
) {
  return this.each(function () {
    let updateIntervalId;
    let sendIntervalId;
    let coordX;
    let coordY;
    let data = [];

    const throttledUpdateCoord = throttle(function (event) {
      coordX = event.offsetX;
      coordY = event.offsetY;
    }, checkInterval);

    $(this).on("mousemove", throttledUpdateCoord);

    $(this).on("mouseenter", () => {
      if (updateIntervalId) return;
      if (sendIntervalId) return;

      updateIntervalId = setInterval(() => {
        const lastEl = data[data.length - 1];
        if (lastEl && lastEl.x === coordX && lastEl.y === coordY) {
          lastEl.time += checkInterval;
        } else {
          data.push({
            x: coordX,
            y: coordY,
            time: checkInterval,
          });
        }

        // For demo
        $(this).children().first().text(
          `X: ${lastEl?.x ?? coordX}, Y: ${lastEl?.y ?? coordY}, time: ${lastEl?.time ?? 0}`,
        );
      }, checkInterval);

      sendIntervalId = setInterval(() => {
        try {
          fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error(err);
        }
        data = [];

        // For demo
        $(this).append("<div>Request sended</div>");
      }, sendInterval);
    });

    $(this).on("mouseleave", () => {
      clearInterval(updateIntervalId);
      clearInterval(sendIntervalId);
      updateIntervalId = undefined;
      sendIntervalId = undefined;
    });
  });
};

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
