document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.getElementById('mainContainer');
  const giftModal = document.getElementById('giftModal');
  const modalTitle = document.getElementById('modalTitle');
  const giftForm = document.getElementById('giftForm');
  const amountField = document.getElementById('amountField');
  const modalClose = document.querySelector('.modal__close');
  const toggle = document.getElementById('layoutToggle');


  let currentGift = null;
  let currentCelebrantIndex = null;

  // Обработчик изменения состояния toggle
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      mainContainer.classList.remove('sequential');
      mainContainer.classList.add('parallel');
    } else {
      mainContainer.classList.remove('parallel');
      mainContainer.classList.add('sequential');
    }
  });

  // Загрузка данных из data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.celebrants.forEach((celebrant, index) => {
        const celebrantBlock = document.createElement('div');
        celebrantBlock.classList.add('celebrant');

        // Информация о поздравляемом
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

        infoBlock.appendChild(avatar);
        infoBlock.appendChild(name);
        infoBlock.appendChild(age);

        // Блок с подарками
        const giftsBlock = document.createElement('div');
        giftsBlock.classList.add('gifts');

        celebrant.gifts.forEach(gift => {
          const giftBlock = document.createElement('div');
          giftBlock.classList.add('gift');

          const giftPhoto = document.createElement('img');
          giftPhoto.src = gift.photo;
          giftPhoto.alt = gift.title;
          giftPhoto.classList.add('gift__photo');

          const giftInfo = document.createElement('div');
          giftInfo.classList.add('gift__info');

          const giftTitle = document.createElement('h3');
          giftTitle.textContent = gift.title;
          giftTitle.classList.add('gift__title');

          const giftDescription = document.createElement('p');
          giftDescription.textContent = gift.description;
          giftDescription.classList.add('gift__description');

          const giftLink = document.createElement('a');
          giftLink.href = gift.link;
          giftLink.textContent = 'Подробнее';
          giftLink.classList.add('gift__link');
          giftLink.target = '_blank';

          const giftButtons = document.createElement('div');
          giftButtons.classList.add('gift__buttons');

          const giftButton = document.createElement('button');
          giftButton.textContent = 'Подарить этот подарок';
          giftButton.classList.add('gift__button');
          giftButton.addEventListener('click', () => openModal(gift, index, false));

          const contributeButton = document.createElement('button');
          contributeButton.textContent = 'Вложиться в этот подарок';
          contributeButton.classList.add('gift__button');
          contributeButton.addEventListener('click', () => openModal(gift, index, true));

          if (gift.isFullyPaid || gift.isSelected) {
            giftButton.disabled = true;
            contributeButton.disabled = true;
          }

          giftButtons.appendChild(giftButton);
          giftButtons.appendChild(contributeButton);

          giftInfo.appendChild(giftTitle);
          giftInfo.appendChild(giftDescription);
          giftInfo.appendChild(giftLink);
          giftInfo.appendChild(giftButtons);

          giftBlock.appendChild(giftPhoto);
          giftBlock.appendChild(giftInfo);

          giftsBlock.appendChild(giftBlock);
        });

        // Кнопка "Подарить свой подарок"
        const addGiftButton = document.createElement('button');
        addGiftButton.textContent = 'Подарить свой подарок';
        addGiftButton.classList.add('gift__button');
        addGiftButton.addEventListener('click', () => openModal(null, index, false));

        giftsBlock.appendChild(addGiftButton);

        celebrantBlock.appendChild(infoBlock);
        celebrantBlock.appendChild(giftsBlock);

        mainContainer.appendChild(celebrantBlock);
      });
    });

  // Открытие модального окна
  function openModal(gift, celebrantIndex, isContribution) {
    currentGift = gift;
    currentCelebrantIndex = celebrantIndex;

    if (isContribution) {
      modalTitle.textContent = 'Вложиться в подарок';
      amountField.style.display = 'block';
    } else {
      modalTitle.textContent = gift ? 'Подарить подарок' : 'Добавить свой подарок';
      amountField.style.display = 'none';
    }

    giftModal.style.display = 'block';
  }

  // Закрытие модального окна
  modalClose.addEventListener('click', () => {
    giftModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === giftModal) {
      giftModal.style.display = 'none';
    }
  });

  // Обработка формы
  giftForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    if (currentGift) {
      // Обновление данных в data.json
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const gift = data.celebrants[currentCelebrantIndex].gifts.find(g => g.title === currentGift.title);

          if (amount) {
            // Вложение в подарок
            gift.contributions = gift.contributions || [];
            gift.contributions.push({ name, amount: parseFloat(amount) });
            gift.isFullyPaid = gift.contributions.reduce((sum, c) => sum + c.amount, 0) >= parseFloat(gift.price);
          } else {
            // Подарок выбран
            gift.isSelected = true;
            gift.donor = name;
          }

          // Сохранение обновленных данных
          return fetch('data.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        })
        .then(() => {
          alert('Данные успешно обновлены!');
          giftModal.style.display = 'none';
          location.reload(); // Перезагрузка страницы для обновления интерфейса
        });
    } else {
      // Добавление нового подарка
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          data.celebrants[currentCelebrantIndex].gifts.push({
            title: 'Придумывает поздравляющий',
            description: '',
            price: '0 RUB',
            photo: 'images/custom.jpg',
            link: '#',
            donor: name,
          });

          return fetch('data.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        })
        .then(() => {
          alert('Подарок успешно добавлен!');
          giftModal.style.display = 'none';
          location.reload(); // Перезагрузка страницы для обновления интерфейса
        });
    }
  });

  // Функция для правильного склонения слова "год"
  function getAgeWord(age) {
    if (age % 10 === 1 && age % 100 !== 11) return 'год';
    if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года';
    return 'лет';
  }
});