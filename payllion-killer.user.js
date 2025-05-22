// ==UserScript==
// @name         payllion-killer v.2.3
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  Хола Амигос, представляю убийцу Payllion + звук + вкл/выкл по Shift+Tab 
// @author       @Andreaweo
// @match        *://lk.payllion.net/operator*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let enabled = true;

    // Звук: создаём аудио-элемент
    const clickSound = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1168-pristine.mp3");
    clickSound.volume = 1.0;

    const observer = new MutationObserver(() => {
        if (!enabled) return;

        const btn = document.querySelector('[title="Взять в работу"]');
        if (btn) {
            btn.click();
            clickSound.play().catch(e => console.warn("🔇 Ошибка при воспроизведении звука:", e));
            console.log("✅ Заявка взята");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Обработчик горячей клавиши Shift + Tab
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key === 'Tab') {
            enabled = !enabled;
            console.log(`🟢 Автокликер ${enabled ? 'включен' : 'выключен'}`);
        }
    });
})();
