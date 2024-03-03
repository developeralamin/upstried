module.exports = {
    "locales": [
        "en"
    ],
    "pages": {
        "*": ["banner", "tips"],
    },
    "defaultLocale": "en",
    "loadLocaleFrom": (lang, ns) => import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
};