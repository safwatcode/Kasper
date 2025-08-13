// Slider

// Automatically update current year in footer
let year = new Date();
let currentYear = year.getFullYear();
document.getElementById("current-year").innerHTML = currentYear;

// Count-Up Animation
const counters = document.querySelectorAll(".stat-number");
let hasAnimated = false;

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats");
  if (!statsSection || hasAnimated) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.5) {
    hasAnimated = true;
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
  }
});

// Another way using Observer
/*
const statsSection = document.querySelector(".stats");
if (statsSection) {
    const counters = document.querySelectorAll(".stat-number");
    const animationDuration = 2000; // Animation duration in milliseconds (e.g., 2 seconds)

    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let startTime = null;

            const updateCounter = (timestamp) => {
                if (!startTime) {
                    startTime = timestamp;
                }

                const elapsedTime = timestamp - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);
                const currentValue = Math.floor(progress * target);

                counter.innerText = currentValue;

                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Ensure the final target value is set precisely
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCounter);
        });

        // Disconnect the observer after the animation has been triggered to save resources.
        observer.disconnect();
    }, {
        // Start the animation when 50% of the stats section is visible.
        threshold: 0.5
    });

    // Start observing the stats section.
    observer.observe(statsSection);
}
*/
