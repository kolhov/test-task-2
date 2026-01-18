function setPos(elId) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { display_name: address } = await getCityFromCoords(
        pos.coords.latitude,
        pos.coords.longitude
      );
      if (address) {
        const cityInput = document.getElementById(elId);
        cityInput.value = address;
        cityInput.focus();
      }
    });
  }
}

async function getCityFromCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
    );
    if (!response.ok) throw new Error();

    return await response.json();
  } catch (error) {
    return null;
  }
}

function openNavigation() {
  const navEl = document.getElementById("navMenu");
  navEl.classList.toggle("active");
}

function emailValidate(input) {
  const emailValue = input.value;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const errEl = document.getElementById("emailErr");

  if (!emailValue) {
    input.classList.add("error-text");
    errEl.classList.add("error-text");
    errEl.textContent = "Email required";
  } else if (!emailRegex.test(emailValue)) {
    input.classList.add("error-text");
    errEl.classList.add("error-text");
    errEl.textContent = "Email incorrect";
  } else {
    errEl.classList.remove("error-text");
    input.classList.remove("error-text");
    errEl.textContent = "";
  }
}
