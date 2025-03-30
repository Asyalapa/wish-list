import { fetchData } from './api.js';
import { createCelebrantBlock } from './dom.js';
import { initEventListeners } from './events.js';
import { applyGiftColors } from './helpers.js';

/**
 * Обработчик события DOMContentLoaded.
 * Инициализирует интерфейс, загружает данные и настраивает взаимодействие с пользователем.
 * 
 * * @param {HTMLElement} mainContainer - Главный контейнер.
   * @param {HTMLElement} giftModal - Модальное окно.
   * @param {HTMLElement} modalTitle - Заголовок модального окна.
   * @param {HTMLInputElement} amountField - Поле ввода суммы.
   * @param {HTMLFormElement} giftForm - Форма подарка.
   * @param {HTMLElement} toggle - Переключатель макета.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const mainContainer = document.getElementById('mainContainer');
  const giftModal = document.getElementById('giftModal');
  const modalTitle = document.getElementById('modalTitle');
  const amountField = document.getElementById('amountField');
  const giftForm = document.getElementById('giftForm');
  const toggle = document.getElementById('layoutToggle');

  const data = await fetchData();

  /**
   * Создает и добавляет блоки для каждого празднующего в главный контейнер.
   * @param {Array<Object>} celebrants - Массив объектов, представляющих празднующих.
   */
  data.celebrants.forEach((celebrant, index) => {
    /**
     * Создает блок для одного празднующего.
     * @function createCelebrantBlock
     * @param {Object} celebrant - Данные о празднующем.
     * @param {number} index - Индекс празднующего в массиве.
     * @returns {HTMLElement} - Созданный блок для празднующего.
     */
    const celebrantBlock = createCelebrantBlock(celebrant, index);
    mainContainer.appendChild(celebrantBlock);
  });

  applyGiftColors();
  initEventListeners(mainContainer, giftModal, modalTitle, amountField, giftForm, toggle);
});