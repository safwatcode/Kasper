// Header - Search and Toggle menu
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".search-icon i");
  const searchInput = document.querySelector(".search-input");
  const searchSuggestions = document.querySelector(".search-suggestions");
  const navUl = document.querySelector("header nav ul");
  const toggleMenu = document.querySelector(".toggle-menu");
  const sections = Array.from(
    document.querySelectorAll("header nav ul li a")
  ).map((a) => ({
    name: a.textContent,
    href: a.getAttribute("href"),
  }));

  // Toggle menu on mobile
  toggleMenu.addEventListener("click", () => {
    navUl.classList.toggle("menu-active");
  });

  // Hide menu when a section link is clicked
  document.querySelectorAll("header nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      navUl.classList.remove("menu-active");
    });
  });

  // Toggle search input (only relevant for desktop)
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

    // Close suggestions when clicking outside
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