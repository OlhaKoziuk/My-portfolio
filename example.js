import Controller from './mvc/controller.js';
import Model from './mvc/model.js';
import View from './mvc/view.js';

if ("serviceWorker" in navigator) { // дізнаємось, чи наш сайт підтримує serviceWorker
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js")); // після того, як усі елементи браузеру завантажаться, ми реєструємо наш service worker
}


document.addEventListener("DOMContentLoaded", function(){
    new Controller(new Model(), new View());
});