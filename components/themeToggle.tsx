'use client';
const themes = {
    dark: {
        theme: 'light',
        cookie: 'theme=light; path=/;',
        showIcon: 'maskedsun',
        hideIcon: 'maskedmoon',
    },
    light: {
        theme: 'dark',
        cookie: 'theme=dark; path=/;',
        showIcon: 'maskedmoon',
        hideIcon: 'maskedsun',
    },
};

function toggleTheme() {
    const root = document.documentElement;
    if (
        document.getElementsByClassName('hide-theme-icon').length > 0 ||
        document.getElementsByClassName('show-theme-icon').length > 0
    ) {
        return;
    }
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = themes[currentTheme as 'dark' | 'light'];

    root.setAttribute('data-theme', newTheme.theme);
    document.cookie = newTheme.cookie;

    const showIcon = document.getElementById(newTheme.showIcon);
    const hideIcon = document.getElementById(newTheme.hideIcon);

    showIcon?.classList.remove('hide-theme-icon', 'hidden-theme-icon');
    showIcon?.classList.add('show-theme-icon');

    hideIcon?.classList.remove('show-theme-icon');
    hideIcon?.classList.add('hide-theme-icon');

    setTimeout(() => {
        showIcon?.classList.remove('show-theme-icon');
        showIcon?.classList.remove('hide-theme-icon');
        hideIcon?.classList.remove('hide-theme-icon');
        hideIcon?.classList.add('hidden-theme-icon');
    }, 1800);
}

export default function ThemeToggle() {
    const theme = typeof document !== 'undefined' && document.cookie.includes('theme=light') ? 'light' : 'dark';
    const sunIsHidden = theme !== 'light' ? 'hidden-theme-icon' : '';
    const moonIsHidden = theme === 'light' ? 'hidden-theme-icon' : '';

    return (
        <button type="button" onClick={toggleTheme} id="theme-toggle">
            <div id="maskedmoon" className={moonIsHidden}></div>
            <div id="maskedsun" className={sunIsHidden}></div>
        </button>
    );
}
