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
  const giftBlock = createElement('div', ['gift'], { 'data-price': gift.price });

  const giftPhoto = createElement('img', ['gift__photo'], { src: gift.photo, alt: gift.title });
  const giftInfo = createElement('div', ['gift__info']);

  giftInfo.append(
    createElement('h3', ['gift__title'], {}, gift.title),
    createElement('p', ['gift__description'], {}, gift.description),
    createElement('a', ['gift__link'], { href: gift.link, target: '_blank' }, 'Похожий товар')
  );

  const giftButtons = createElement('div', ['gift__buttons']);
  giftButtons.append(
    createButton('Подарить подарок', () => openModal(gift, index, false), gift.isFullyPaid || gift.isSelected),
    createButton('Вложиться в подарок', () => openModal(gift, index, true), gift.isFullyPaid || gift.isSelected)
  );

  giftInfo.appendChild(giftButtons);
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
  filterSelect.id = 'filterSelect';
  filterSelect.innerHTML = `
    <option value="">Все</option>
    <option value="below500">До ₽500 </option>
    <option value="500to2000">₽500 - ₽2000</option>
    <option value="2000to3000">₽2000 - ₽3000</option>
    <option value="above3000">₽3000+</option>
  `;
  filterSelect.addEventListener('change', (event) => handleFilterChange(event));

  const sortSelect = document.createElement('select');
  sortSelect.id = 'sortSelect';
  sortSelect.innerHTML = `
    <option value="asc">По возрастанию</option>
    <option value="desc">По убыванию</option>
  `;
  sortSelect.addEventListener('change', (event) => handleSortChange(event));

  controls.append(filterSelect, sortSelect);
  return controls;
}