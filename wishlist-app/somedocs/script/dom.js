import { getAgeWord, createElement, createButton } from './helpers.js';
import { openModal } from './events.js';

/**
 * Создает блок для отображения информации о празднующем.
 *
 * @function createCelebrantBlock
 * @param {Object} celebrant - Объект, содержащий данные о празднующем.
 * @param {number} index - Индекс празднующего в массиве данных.
 * @returns {HTMLElement} - Созданный блок празднующего.
 *
 * @description
 * Функция создает контейнер с информацией о празднующем и его подарками.
 * Состоит из двух частей: блока информации (`createInfoBlock`) и блока подарков (`createGiftsBlock`).
 */
export function createCelebrantBlock(celebrant, index) {
  const celebrantBlock = createElement('div', ['celebrant']);
  celebrantBlock.append(createInfoBlock(celebrant), createGiftsBlock(celebrant.gifts, index));
  return celebrantBlock;
}

/**
 * Создает блок с информацией о празднующем.
 *
 * @function createInfoBlock
 * @param {Object} celebrant - Объект, содержащий данные о празднующем.
 * @returns {HTMLElement} - Созданный блок информации о празднующем.
 *
 * @description
 * Функция создает элементы для отображения имени, аватара и возраста празднующего.
 * Использует функцию `getAgeWord` для правильного склонения слова "год".
 */
function createInfoBlock(celebrant) {
  const infoBlock = document.createElement('div');
  infoBlock.classList.add('celebrant__info');

  const avatar = document.createElement('img');
  avatar.src = celebrant.avatar;
  avatar.alt = celebrant.name;
  avatar.classList.add('celebrant__avatar');

  const name = document.createElement('h2');
  name.textContent = celebrant.name;
  name.classList.add('celebrant__name');

  const age = document.createElement('p');
  age.textContent = `Е${celebrant.gender === 'женский' ? 'й' : 'му'} исполняется: ${celebrant.age} ${getAgeWord(celebrant.age)}`;
  age.classList.add('celebrant__age');

  infoBlock.append(name, avatar, age);
  return infoBlock;
}

/**
 * Создает блок с подарками празднующего.
 *
 * @function createGiftsBlock
 * @param {Array<Object>} gifts - Массив объектов, представляющих подарки.
 * @param {number} index - Индекс празднующего в массиве данных.
 * @returns {HTMLElement} - Созданный блок подарков.
 *
 * @description
 * Функция создает элементы для каждого подарка и добавляет кнопку для добавления нового подарка.
 * Для каждого подарка вызывается функция `createGiftElement`.
 */
function createGiftsBlock(gifts, index) {
  const giftsBlock = document.createElement('div');
  giftsBlock.classList.add('gifts');

  giftsBlock.appendChild(createFilters());

  gifts.forEach((gift) => {
    const giftBlock = createGiftElement(gift, index);
    giftsBlock.appendChild(giftBlock);
  });

  const addGiftButton = document.createElement('button');
  addGiftButton.textContent = 'Подарить свой подарок';
  addGiftButton.classList.add('gift__button');
  addGiftButton.addEventListener('click', () => openModal(null, index, false));

  giftsBlock.appendChild(addGiftButton);
  return giftsBlock;
}

/**
 * Создает элемент для отображения одного подарка.
 *
 * @param {Object} gift - Объект, представляющий подарок.
 * @param {number} index - Индекс празднующего в массиве данных.
 * @returns {HTMLElement} - Созданный элемент подарка.
 */
export function createGiftElement(gift, index) {
  const giftBlock = createElement('article', ['gift'], { 'data-price': gift.price });

  const giftPhoto = createElement('img', ['gift__photo'], { src: gift.photo, alt: gift.title });
  const giftInfo = createElement('div', ['gift__info']);
  const gitfText = createElement('div', ['gift__info-text']);
  const giftButtons = createElement('div', ['gift__buttons']);


  gitfText.append(
    createElement('h3', ['gift__title'], {}, gift.title),
    createElement('p', ['gift__description'], {}, gift.description),
    createElement('a', ['gift__link'], { href: gift.link, target: '_blank' }, 'Похожий товар')
  );
  giftButtons.append(
    createButton('Подарить подарок', () => openModal(gift, index, false), gift.isFullyPaid || gift.isSelected),
    createButton('Вложиться в подарок', () => openModal(gift, index, true), gift.isFullyPaid || gift.isSelected)
  );

  giftInfo.append(gitfText, giftButtons);
  giftBlock.append(giftPhoto, giftInfo);

  return giftBlock;
}

/**
 * Создает блок с фильтрами и сортировкой для подарков.
 *
 * @function createFilters
 * @returns {HTMLElement} - Созданный блок фильтров и сортировки.
 *
 * @description
 * Функция создает выпадающие списки для фильтрации подарков по цене и сортировки по возрастанию/убыванию.
 * Добавляет обработчики событий для изменения фильтров и сортировки.
 */
export function createFilters() {
  const controls = document.createElement('div');
  controls.classList.add('controls');

  const filterSelect = document.createElement('select');
  filterSelect.classList.add('filter-select');
  filterSelect.innerHTML = `
    <option value="">Все</option>
    <option value="below500">До ₽500 </option>
    <option value="500to2000">₽500 - ₽2000</option>
    <option value="2000to3000">₽2000 - ₽3000</option>
    <option value="above3000">₽3000+</option>
  `;
  filterSelect.addEventListener('change', (event) => handleFilterChange(event));

  // const sortSelect = document.createElement('select');
  // sortSelect.classList.add('sort-select');
  // sortSelect.innerHTML = `
  //   <option value="asc">По возрастанию</option>
  //   <option value="desc">По убыванию</option>
  // `;
  // sortSelect.addEventListener('change', (event) => handleSortChange(event));

  // Создаем контейнер для кнопок
// Функция для создания кнопок сортировки
function createSortButtons(celebrant) {
  // Создаем контейнер для кнопок
  const sortButtonsContainer = document.createElement('div');
  sortButtonsContainer.classList.add('sort-buttons-container');

  // Создаем кнопку для сортировки по возрастанию
  const ascButton = document.createElement('button');
  ascButton.classList.add('sort-button', 'asc-button');
  ascButton.innerHTML = '&#8593;'; // Стрелка вверх (↑)

  // Создаем кнопку для сортировки по убыванию
  const descButton = document.createElement('button');
  descButton.classList.add('sort-button', 'desc-button');
  descButton.innerHTML = '&#8595;'; // Стрелка вниз (↓)

  // Добавляем кнопки в контейнер
  sortButtonsContainer.appendChild(ascButton);
  sortButtonsContainer.appendChild(descButton);

  // Функция для обработки сортировки
  function handleSortChange(order) {
    // Находим все .gift только внутри текущего .celebrant
    const gifts = Array.from(celebrant.querySelectorAll('.gift'));

    // Сортируем элементы по цене
    const sortedGifts = gifts.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price')) || 0;
      const priceB = parseFloat(b.getAttribute('data-price')) || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Перемещаем отсортированные элементы в DOM
    const giftsContainer = celebrant.querySelector('.gifts');
    if (giftsContainer) {
      sortedGifts.forEach(gift => giftsContainer.appendChild(gift));
    }
  }

  // Обработчик кликов для кнопок
  ascButton.addEventListener('click', () => {
    // Активируем кнопку "по возрастанию"
    ascButton.classList.add('active');
    descButton.classList.remove('active');
    handleSortChange('asc'); // Вызываем сортировку по возрастанию
  });

  descButton.addEventListener('click', () => {
    // Активируем кнопку "по убыванию"
    descButton.classList.add('active');
    ascButton.classList.remove('active');
    handleSortChange('desc'); // Вызываем сортировку по убыванию
  });
}

  controls.append(filterSelect, sortButtonsContainer);
  return controls;
}