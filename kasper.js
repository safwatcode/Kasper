// Slider

// Automatically update current year in footer
let year = new Date();
let currentYear = year.getFullYear();
document.getElementById("current-year").innerHTML = currentYear;

// Count-Up Animation
const counters = document.querySelectorAll(".stat-number");
counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 200;
    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});
