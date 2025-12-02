document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;

    // ---- Helper: apply language everywhere ----
    function applyLanguage(lang) {
        const isArabic = (lang === "ar");

        // Set html lang + dir
        html.setAttribute("lang", isArabic ? "ar" : "en");
        html.setAttribute("dir", isArabic ? "rtl" : "ltr");

        // Change inner text based on data-ar / data-en
        document.querySelectorAll("[data-ar]").forEach(el => {
            el.innerHTML = isArabic
                ? el.getAttribute("data-ar")
                : el.getAttribute("data-en");
        });

        // Change direction for sections with custom direction attributes
        document.querySelectorAll("[data-dir-ar]").forEach(section => {
            const newDir = isArabic
                ? section.getAttribute("data-dir-ar")
                : section.getAttribute("data-dir-en");

            section.style.direction = newDir;
            section.setAttribute("dir", newDir);
        });

        // Translate placeholders for inputs + textarea
        document
            .querySelectorAll("input[placeholder][data-ar], textarea[placeholder][data-ar]")
            .forEach(field => {
                field.placeholder = isArabic
                    ? field.getAttribute("data-ar")
                    : field.getAttribute("data-en");
            });

        // Tagline special case
        const tagline = document.querySelector(".tagline-text");
        if (tagline && tagline.parentElement) {
            tagline.innerHTML = isArabic
                ? tagline.parentElement.getAttribute("data-ar")
                : tagline.parentElement.getAttribute("data-en");
        }
    }

    // ---- 1) On load: read saved language (if any) ----
    const savedLang = localStorage.getItem("siteLang");
    const initialLang = savedLang || html.getAttribute("lang") || "ar";
    applyLanguage(initialLang);

    // ---- 2) Click handler: toggle + save to localStorage ----
    const langSwitch = document.getElementById("langSwitcher");
    if (langSwitch) {
        langSwitch.addEventListener("click", function () {
            const currentLang = html.getAttribute("lang") === "ar" ? "ar" : "en";
            const newLang = currentLang === "ar" ? "en" : "ar";

            applyLanguage(newLang);
            localStorage.setItem("siteLang", newLang); // ← persistence
        });
    }
});