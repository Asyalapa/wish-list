import { fetchData, updateData } from './api.js';

/**
 * Глобальная переменная для хранения текущего выбранного подарка.
 * @type {Object|null}
 */
let currentGift = null;
/**
 * Глобальная переменная для хранения индекса текущего празднующего.
 * @type {number|null}
 */
let currentCelebrantIndex = null;

/**
 * Инициализирует обработчики событий для интерактивных элементов интерфейса.
 *
 * @function initEventListeners
 * @param {HTMLElement} mainContainer - Главный контейнер с блоками празднующих.
 * @param {HTMLElement} giftModal - Модальное окно для работы с подарками.
 * @param {HTMLElement} modalTitle - Заголовок модального окна.
 * @param {HTMLInputElement} amountField - Поле ввода суммы вклада.
 * @param {HTMLFormElement} giftForm - Форма для отправки данных о подарке.
 * @param {HTMLInputElement} toggle - Переключатель макета (параллельный/последовательный).
 *
 * @description
 * 1. Добавляет обработчик изменения переключателя макета.
 * 2. Обрабатывает закрытие модального окна по клику на кнопку закрытия или вне области окна.
 * 3. Обрабатывает отправку формы для обновления данных о подарках.
 */
export function initEventListeners(mainContainer, giftModal, modalTitle, amountField, giftForm, toggle) {
  /**
   * Обработчик изменения переключателя макета.
   * Переключает классы `parallel` и `sequential` у главного контейнера.
   */
  toggle.addEventListener('change', () => {
    mainContainer.classList.toggle('parallel', toggle.checked);
    mainContainer.classList.toggle('sequential', !toggle.checked);
  });

  /**
   * Обработчик закрытия модального окна по клику на кнопку закрытия.
   */
  giftModal.querySelector('.modal__close').addEventListener('click', () => {
    giftModal.style.display = 'none';
  });

  /**
   * Обработчик закрытия модального окна при клике вне его области.
   */
  window.addEventListener('click', (event) => {
    if (event.target === giftModal) {
      giftModal.style.display = 'none';
    }
  });

  /**
   * Обработчик отправки формы для обновления данных о подарках.
   * @param {Event} event - Событие отправки формы.
   */
  giftForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    if (currentGift) {
      const data = await fetchData();
      const gift = data.celebrants[currentCelebrantIndex].gifts.find((g) => g.title === currentGift.title);

      if (amount) {
        gift.contributions = gift.contributions || [];
        gift.contributions.push({ name, amount: parseFloat(amount) });
        gift.isFullyPaid = gift.contributions.reduce((sum, c) => sum + c.amount, 0) >= parseFloat(gift.price);
      } else {
        gift.isSelected = true;
        gift.donor = name;
      }

      await updateData(data);
      alert('Данные успешно обновлены!');
      giftModal.style.display = 'none';
      location.reload();
    }
  });
}

/**
 * Открывает модальное окно для работы с подарком.
 *
 * @function openModal
 * @param {Object} gift - Объект подарка, с которым будет работать модальное окно.
 * @param {number} celebrantIndex - Индекс празднующего, связанного с подарком.
 * @param {boolean} isContribution - Флаг, указывающий, является ли действие вкладом в подарок.
 *
 * @description
 * 1. Устанавливает заголовок модального окна в зависимости от типа действия.
 * 2. Показывает или скрывает поле ввода суммы в зависимости от флага `isContribution`.
 * 3. Отображает модальное окно.
 */
export function openModal(gift, celebrantIndex, isContribution) {
  currentGift = gift;
  currentCelebrantIndex = celebrantIndex;

  const modalTitle = document.getElementById('modalTitle');
  const amountField = document.getElementById('amountField');
  const giftModal = document.getElementById('giftModal');

  modalTitle.textContent = isContribution ? 'Вложиться в подарок' : gift ? 'Подарить подарок' : 'Добавить свой подарок';
  amountField.style.display = isContribution ? 'block' : 'none';

  giftModal.style.display = 'block';
}