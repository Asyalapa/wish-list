
/**
 * Возвращает слово, соответствующее числу лет в зависимости от правил склонения.
 *
 * @param {number} age - Возраст (количество лет).
 * @returns {string} - Слово, соответствующее возрасту: "год", "года" или "лет".
 *
 * @example
 * getAgeWord(1);  // "год"
 * getAgeWord(23); // "года"
 * getAgeWord(45); // "лет"
 */
export function getAgeWord(age) {
  if (age % 10 === 1 && age % 100 !== 11) return 'год';
  if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года';
  return 'лет';
}

/**
 * Применяет цветовую схему к элементам подарков на основе их цены.
 *
 * Функция изменяет цвет фона элементов с классом `.gift` в зависимости от значения атрибута `data-price`.
 * Цвет рассчитывается на основе базового цвета и коэффициента, зависящего от цены.
 *
 * @function applyGiftColors
 *
 * @description
 * 1. Базовый цвет задается как RGB-массив `[226, 245, 236]` (#e2f5ec).
 * 2. Коэффициент (`factor`) определяется диапазоном цены:
 *    - < 500: factor = 1.08
 *    - 500–999: factor = 1.04
 *    - 1000–1999: factor = 1
 *    - 2000–4999: factor = 0.96
 *    - >= 5000: factor = 0.92
 * 3. Новый цвет рассчитывается путем умножения каждого компонента базового цвета на коэффициент,
 *    с ограничением значений в диапазоне [0, 255].
 *
 * @example
 * // HTML: <div class="gift" data-price="1200"></div>
 * applyGiftColors();
 * // Результат: стиль элемента изменится на `rgb(226, 245, 236)` (без изменения для этой цены).
 */
export function applyGiftColors() {
  document.querySelectorAll('.gift').forEach((gift) => {
    const price = parseInt(gift.getAttribute('data-price'), 10);
    let baseColor = [226, 245, 236]; // #e2f5ec (RGB)
    let factor = 0;

    if (price < 500) factor = 1.08;
    else if (price >= 500 && price < 1000) factor = 1.04;
    else if (price >= 1000 && price < 2000) factor = 1;
    else if (price >= 2000 && price < 5000) factor = 0.96;
    else if (price >= 5000) factor = 0.92;

    const newColor = baseColor.map((c) => Math.min(255, Math.max(0, Math.round(c * factor))));
    gift.style.backgroundColor = `rgb(${newColor.join(',')})`;
  });
}

/**
 * Вспомогательная функция для создания элементов с классами, атрибутами и текстовым содержимым.
 * @param {string} tag - Тег элемента.
 * @param {string[]} classes - Массив классов.
 * @param {Object} attributes - Объект атрибутов (необязательно).
 * @param {string} textContent - Текстовое содержимое элемента (необязательно).
 * @returns {HTMLElement} - Созданный элемент.
 */
export function createElement(tag, classes = [], attributes = {}, textContent = null) {
  const element = document.createElement(tag);
  classes.forEach((cls) => element.classList.add(cls));
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (textContent !== null) {
    element.textContent = textContent;
  }
  return element;
}

/**
 * Создает кнопку с текстом и обработчиком события.
 * @param {string} text - Текст на кнопке.
 * @param {Function} handler - Функция-обработчик события click.
 * @param {boolean} isDisabled - Флаг, указывающий, должна ли кнопка быть отключена.
 * @returns {HTMLButtonElement} - Созданная кнопка.
 */
export function createButton(text, handler, isDisabled = false) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', handler);
  if (isDisabled) {
    button.disabled = true;
  }
  button.classList.add('gift__button');
  return button;
}
