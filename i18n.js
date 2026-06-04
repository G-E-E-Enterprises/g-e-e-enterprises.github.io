document.addEventListener('DOMContentLoaded', () => {
    const supportedLanguages = ['en', 'es', 'de', 'fr'];
    const defaultLanguage = 'en';

    const langFlags = {
        en: '🇺🇸',
        es: '🇪🇸',
        de: '🇩🇪',
        fr: '🇫🇷'
    };

    const langNames = {
        en: 'English',
        es: 'Español',
        de: 'Deutsch',
        fr: 'Français'
    };

    // 1. Detect language preference
    function getPreferredLanguage() {
        const savedLang = localStorage.getItem('preferred-lang');
        if (savedLang && supportedLanguages.includes(savedLang)) {
            return savedLang;
        }

        const browserLang = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        return defaultLanguage;
    }

    let currentLang = getPreferredLanguage();

    // Helper to resolve dot notation paths in translations object
    function getTranslationVal(lang, key) {
        if (!translations || !translations[lang]) return null;
        return key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
    }

    // 2. Apply translations to DOM
    function applyTranslations(lang) {
        document.documentElement.setAttribute('lang', lang);
        
        // Translate text contents and innerHTML
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = getTranslationVal(lang, key);
            if (val !== null && val !== undefined) {
                // If element specifies HTML mode (e.g. for rich spans) or has tags, use innerHTML
                const useHtml = el.getAttribute('data-i18n-mode') === 'html' || val.includes('<span');
                if (useHtml) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        // Translate placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = getTranslationVal(lang, key);
            if (val !== null && val !== undefined) {
                el.placeholder = val;
            }
        });

        // Translate alt texts
        const alts = document.querySelectorAll('[data-i18n-alt]');
        alts.forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            const val = getTranslationVal(lang, key);
            if (val !== null && val !== undefined) {
                el.alt = val;
            }
        });

        // Translate page title
        const pageTitleKey = document.querySelector('title').getAttribute('data-i18n');
        if (pageTitleKey) {
            const val = getTranslationVal(lang, pageTitleKey);
            if (val) {
                document.title = val;
            }
        }

        // Update active dropdown items visually
        updateDropdownUI(lang);
    }

    // 3. Dropdown UI logic
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const optionBtns = langDropdown ? langDropdown.querySelectorAll('.lang-option') : [];
    const currentFlagEl = document.getElementById('current-lang-flag');
    const currentTextEl = document.getElementById('current-lang-text');

    function updateDropdownUI(lang) {
        if (currentFlagEl) currentFlagEl.textContent = langFlags[lang];
        if (currentTextEl) currentTextEl.textContent = langNames[lang];

        optionBtns.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });
    }

    function toggleDropdown(show) {
        const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
        const forceShow = show !== undefined ? show : !isExpanded;
        
        langBtn.setAttribute('aria-expanded', forceShow ? 'true' : 'false');
        if (forceShow) {
            langDropdown.classList.add('show');
        } else {
            langDropdown.classList.remove('show');
            langBtn.focus();
        }
    }

    if (langBtn && langDropdown) {
        // Click to toggle
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        // Click outside to close
        document.addEventListener('click', () => {
            toggleDropdown(false);
        });

        // Keyboard Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleDropdown(false);
            }
        });

        // Dropdown options click handlers
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = btn.getAttribute('data-lang');
                if (selectedLang && supportedLanguages.includes(selectedLang)) {
                    currentLang = selectedLang;
                    localStorage.setItem('preferred-lang', selectedLang);
                    applyTranslations(selectedLang);
                }
                toggleDropdown(false);
            });
        });

        // Keyboard navigation within the dropdown
        langDropdown.addEventListener('keydown', (e) => {
            const activeEl = document.activeElement;
            const buttonsArray = Array.from(optionBtns);
            const currentIndex = buttonsArray.indexOf(activeEl);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttonsArray.length;
                buttonsArray[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + buttonsArray.length) % buttonsArray.length;
                buttonsArray[prevIndex].focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                buttonsArray[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                buttonsArray[buttonsArray.length - 1].focus();
            }
        });
    }

    // 4. Initial execution
    applyTranslations(currentLang);
});
