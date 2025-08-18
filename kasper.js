// Header - Search and Toggle menu

// "DOMContentLoaded" It ensures that the code only runs after the webpage's HTML has been fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".search-icon i");
  const searchInput = document.querySelector(".search-input");
  const searchSuggestions = document.querySelector(".search-suggestions");
  const navUl = document.querySelector("header nav ul");
  const toggleMenu = document.querySelector(".toggle-menu");

  // Toggle menu
  // Show toggle menu on mobile only
  toggleMenu.addEventListener("click", () => {
    navUl.classList.toggle("menu-active");
  });

  // Hide toggle menu when a section link is clicked
  document.querySelectorAll("header nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      navUl.classList.remove("menu-active");
    });
  });

  // Search
  // Reading section names (textContent) and stores it as a text, and its destinatino (href)
  const sections = Array.from(
    document.querySelectorAll("header nav ul li a")
  ).map((a) => ({
    name: a.textContent,
    href: a.getAttribute("href"),
  }));
  // Show search input (I made it appear for desktop only)
  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("active");
      navUl.classList.toggle("search-active");
      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      } else {
        searchInput.value = "";
        searchSuggestions.classList.remove("active");
        searchSuggestions.innerHTML = "";
      }
    });

    // Filter suggestions based on input
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      searchSuggestions.innerHTML = "";
      if (query) {
        const filteredSections = sections.filter((section) =>
          section.name.toLowerCase().startsWith(query)
        );
        if (filteredSections.length) {
          filteredSections.forEach((section) => {
            const suggestion = document.createElement("a");
            suggestion.textContent = section.name;
            suggestion.href = section.href;
            suggestion.addEventListener("click", (e) => {
              e.preventDefault();
              window.location.href = section.href;
              searchInput.value = "";
              searchSuggestions.classList.remove("active");
              searchInput.classList.remove("active");
              navUl.classList.remove("search-active");
            });
            searchSuggestions.appendChild(suggestion);
          });
          searchSuggestions.classList.add("active");
        } else {
          searchSuggestions.classList.remove("active");
        }
      } else {
        searchSuggestions.classList.remove("active");
      }
    });

    // Close search suggestions and search input when clicking outside the search icon, search input or search suggestions
    document.addEventListener("click", (e) => {
      if (
        !searchIcon.contains(e.target) &&
        !searchInput.contains(e.target) &&
        !searchSuggestions.contains(e.target)
      ) {
        searchInput.classList.remove("active");
        navUl.classList.remove("search-active");
        searchSuggestions.classList.remove("active");
        searchInput.value = "";
        searchSuggestions.innerHTML = "";
      }
    });
  }
});

// Landing - Slider
// Define arrays for background images, landing-container colors, and content
const slides = [
  {
    background: 'url("../images/landing-01.jpg")',
    title: "Hello World!<br>We Are Kasper, We Make Art.",
    text: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
  },
  {
    background: 'url("../images/landing-02.jpg")',
    title: "Welcome to Creativity!<br>Discover Our Vision.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    background: 'url("../images/landing-03.jpg")',
    title: "Innovate with Us!<br>Shape the Future.",
    text: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies ligula sed magna dictum porta.",
  },
];

// Get DOM elements
const landing = document.querySelector(".landing");
const landingContainer = document.querySelector(".landing-container");
const landingContent = document.querySelector(".landing-content");
const titleElement = landingContent.querySelector("h2");
const textElement = landingContent.querySelector("p");
const prevButton = document.querySelector(".fa-angle-left");
const nextButton = document.querySelector(".fa-angle-right");
const bullets = document.querySelectorAll(".bullets li");
let currentSlide = 0;

function updateSlide(index) {
  const slide = slides[index];
  // Update background image
  landing.style.backgroundImage = slide.background;
  // Update landing-container content dynamically from the js - I'm very HAPPY with this feature ^_^
  titleElement.innerHTML = slide.title;
  textElement.textContent = slide.text;
  // Update active bullet when the slide changes
  bullets.forEach((bullet, i) => {
    bullet.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

// Event listeners for arrows - change slides on clicking on the arrows
// Right arrow
prevButton.addEventListener("click", () => {
  let newIndex = currentSlide - 1;
  if (newIndex < 0) newIndex = slides.length - 1; // If the slide is the first one, loop to last slide
  updateSlide(newIndex);
});

// Left arrow
nextButton.addEventListener("click", () => {
  let newIndex = (currentSlide + 1) % slides.length; // If the slide is the last one, loop to first slide
  updateSlide(newIndex);
});

// Event listeners for bullets - When clicking on the bullets, the slide also changes!
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    updateSlide(index);
  });
});

// Initialize first slide - By default, the first slide is shown.
updateSlide(currentSlide);

// Portfolio Gallery
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".portfolio-nav li");
  const galleryItems = document.querySelectorAll(".gallary-box");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all nav items (By default, no active classes - "All" category is shown)
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked nav item
      item.classList.add("active");

      // Get the selected category
      const selectedCategory = item.textContent.trim();

      // Filter gallery items - if there is no category selected, the category "All" will always shown;
      galleryItems.forEach((galleryItem) => {
        const itemCategory = galleryItem.getAttribute("data-category");
        if (selectedCategory === "All" || itemCategory === selectedCategory) {
          galleryItem.style.display = "block";
        } else {
          galleryItem.style.display = "none";
        }
      });
    });
  });
});

// Count-Up Animation
const counters = document.querySelectorAll(".stat-number");
let hasAnimated = false; // Crucial flag, to ensure that the animation runs only once when scrolling to the section.

// Unfortunately, this code runs every time a scroll event occurs.
// There is a much better way using "Observer" but for now lets use this.

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats");

  // It stops the execution (return) if the stats section doesn't exist on the page,
  // or if the animation has already been played (the flag hasAnimated is true).
  if (!statsSection || hasAnimated) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // The trigger of the animation (sectionTop < windowHeight * 0.5),
  // if the top of stats section has reached (scrolled) the bottom half (50%) of the screen.
  if (sectionTop < windowHeight * 0.5) {
    hasAnimated = true;
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        // Convert the value of the attribute "data-target" in the html stat div to number
        const target = parseInt(counter.getAttribute("data-target"));

        const current = +counter.innerText; // Start point and the current value

        // Divide the target by 200 (or any suitable number) to make a smooth animation for the counter
        const increment = target / 200;
        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`; // increase the counter by this ceiled value
          // Calling the "updateCounter" function again after a 10ms delay,
          // creating a recursive loop that continuously updates the number.
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target; // Once the count reaches the target value, set it to the target
        }
      };
      // Start the counter (Initial call)
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

// Testimonial Slider
const testimonialSlides = document.querySelectorAll(".slide");
const testimonialBullets = document.querySelectorAll(".bullet");

let currentTestSlide = 0; // To keep track of the cuurently displayed slide

function showSlide(index) {
  /*
  For each of slides and bullets
  - Add the active class if the second argument (i === index) is true.
  - Remove the active class if the second argument (i === index) is false.
  */
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  testimonialBullets.forEach((bullet, i) =>
    bullet.classList.toggle("active", i === index)
  );
}

testimonialBullets.forEach((bullet) =>
  bullet.addEventListener("click", () => {
    // Convert the value of the attribute "data-index" in the html bullet div to number
    const index = parseInt(bullet.getAttribute("data-index"));
    showSlide(index);
  })
);

// Automatically cycle through slides every 3 seconds
setInterval(() => {
  currentTestSlide = (currentTestSlide + 1) % testimonialSlides.length;
  showSlide(currentTestSlide);
}, 5000);

showSlide(currentTestSlide);

// Automatically update the current year in footer

let year = new Date();
let currentYear = year.getFullYear();
document.getElementById("current-year").innerHTML = currentYear;
