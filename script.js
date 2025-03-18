// document.addEventListener('DOMContentLoaded', () => {
//   const mainContainer = document.getElementById('mainContainer');
//   const giftModal = document.getElementById('giftModal');
//   const modalTitle = document.getElementById('modalTitle');
//   const giftForm = document.getElementById('giftForm');
//   const amountField = document.getElementById('amountField');
//   const modalClose = document.querySelector('.modal__close');
//   const toggle = document.getElementById('layoutToggle');


//   let currentGift = null;
//   let currentCelebrantIndex = null;

//   // Обработчик изменения состояния toggle
//   toggle.addEventListener('change', () => {
//     if (toggle.checked) {
//       mainContainer.classList.remove('sequential');
//       mainContainer.classList.add('parallel');
//     } else {
//       mainContainer.classList.remove('parallel');
//       mainContainer.classList.add('sequential');
//     }
//   });

//   // Загрузка данных из data.json
//   fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//       data.celebrants.forEach((celebrant, index) => {
//         const celebrantBlock = document.createElement('div');
//         celebrantBlock.classList.add('celebrant');

//         // Информация о поздравляемом
//         const infoBlock = document.createElement('div');
//         infoBlock.classList.add('celebrant__info');

//         const avatar = document.createElement('img');
//         avatar.src = celebrant.avatar;
//         avatar.alt = celebrant.name;
//         avatar.classList.add('celebrant__avatar');

//         const name = document.createElement('h2');
//         name.textContent = celebrant.name;
//         name.classList.add('celebrant__name');

//         const age = document.createElement('p');
//         age.textContent = `Е${celebrant.gender === 'женский' ? 'й' : 'му'} исполняется: ${celebrant.age} ${getAgeWord(celebrant.age)}`;
//         age.classList.add('celebrant__age');

//         infoBlock.appendChild(name);
//         infoBlock.appendChild(avatar);
//         infoBlock.appendChild(age);

//         // Блок с подарками
//         const giftsBlock = document.createElement('div');
//         giftsBlock.classList.add('gifts');

//         celebrant.gifts.forEach(gift => {
//           const giftBlock = document.createElement('div');
//           giftBlock.classList.add('gift');

//           const giftPhoto = document.createElement('img');
//           giftPhoto.src = gift.photo;
//           giftPhoto.alt = gift.title;
//           giftPhoto.classList.add('gift__photo');

//           const giftInfo = document.createElement('div');
//           giftInfo.classList.add('gift__info');

//           const giftTitle = document.createElement('h3');
//           giftTitle.textContent = gift.title;
//           giftTitle.classList.add('gift__title');

//           const giftDescription = document.createElement('p');
//           giftDescription.textContent = gift.description;
//           giftDescription.classList.add('gift__description');

//           const giftLink = document.createElement('a');
//           giftLink.href = gift.link;
//           giftLink.textContent = 'Похожий товар';
//           giftLink.classList.add('gift__link');
//           giftLink.target = '_blank';

//           const giftButtons = document.createElement('div');
//           giftButtons.classList.add('gift__buttons');

//           const giftButton = document.createElement('button');
//           giftButton.textContent = 'Подарить этот подарок';
//           giftButton.classList.add('gift__button');
//           giftButton.addEventListener('click', () => openModal(gift, index, false));

//           const contributeButton = document.createElement('button');
//           contributeButton.textContent = 'Вложиться в этот подарок';
//           contributeButton.classList.add('gift__button');
//           contributeButton.addEventListener('click', () => openModal(gift, index, true));

//           if (gift.isFullyPaid || gift.isSelected) {
//             giftButton.disabled = true;
//             contributeButton.disabled = true;
//           }

//           giftButtons.appendChild(giftButton);
//           giftButtons.appendChild(contributeButton);

//           giftInfo.appendChild(giftTitle);
//           giftInfo.appendChild(giftDescription);
//           giftInfo.appendChild(giftLink);
//           giftInfo.appendChild(giftButtons);

//           giftBlock.appendChild(giftPhoto);
//           giftBlock.appendChild(giftInfo);

//           giftsBlock.appendChild(giftBlock);
//         });

//         // Кнопка "Подарить свой подарок"
//         const addGiftButton = document.createElement('button');
//         addGiftButton.textContent = 'Подарить свой подарок';
//         addGiftButton.classList.add('gift__button');
//         addGiftButton.addEventListener('click', () => openModal(null, index, false));

//         giftsBlock.appendChild(addGiftButton);

//         celebrantBlock.appendChild(infoBlock);
//         celebrantBlock.appendChild(giftsBlock);

//         mainContainer.appendChild(celebrantBlock);
//       });
//       applyGiftColors();
//     });

//     function applyGiftColors() {
//       document.querySelectorAll('.gift').forEach(gift => {
//         console.log(gift.getAttribute('data-price'));
//         const price = parseInt(gift.getAttribute('data-price'), 10);
//         let baseColor = [226, 245, 236]; // #e2f5ec (RGB)
//         let factor = 0;
  
//         if (price < 500) factor = 0.9;
//         else if (price >= 500 && price < 1000) factor = 0.95;
//         else if (price >= 1000 && price < 2000) factor = 1;
//         else if (price >= 2000 && price < 5000) factor = 1.05;
//         else if (price >= 5000) factor = 1.1;
  
//         const newColor = baseColor.map(c => Math.min(255, Math.max(0, Math.round(c * factor))));
//         gift.style.backgroundColor = `rgb(${newColor.join(',')})`;
//       });
//     }

//   // Открытие модального окна
//   function openModal(gift, celebrantIndex, isContribution) {
//     currentGift = gift;
//     currentCelebrantIndex = celebrantIndex;

//     if (isContribution) {
//       modalTitle.textContent = 'Вложиться в подарок';
//       amountField.style.display = 'block';
//     } else {
//       modalTitle.textContent = gift ? 'Подарить подарок' : 'Добавить свой подарок';
//       amountField.style.display = 'none';
//     }

//     giftModal.style.display = 'block';
//   }

//   // Закрытие модального окна
//   modalClose.addEventListener('click', () => {
//     giftModal.style.display = 'none';
//   });

//   window.addEventListener('click', (event) => {
//     if (event.target === giftModal) {
//       giftModal.style.display = 'none';
//     }
//   });

//   // Обработка формы
//   giftForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const amount = document.getElementById('amount').value;

//     if (currentGift) {
//       // Обновление данных в data.json
//       fetch('data.json')
//         .then(response => response.json())
//         .then(data => {
//           const gift = data.celebrants[currentCelebrantIndex].gifts.find(g => g.title === currentGift.title);

//           if (amount) {
//             // Вложение в подарок
//             gift.contributions = gift.contributions || [];
//             gift.contributions.push({ name, amount: parseFloat(amount) });
//             gift.isFullyPaid = gift.contributions.reduce((sum, c) => sum + c.amount, 0) >= parseFloat(gift.price);
//           } else {
//             // Подарок выбран
//             gift.isSelected = true;
//             gift.donor = name;
//           }

//           // Сохранение обновленных данных
//           return fetch('data.json', {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//           });
//         })
//         .then(() => {
//           alert('Данные успешно обновлены!');
//           giftModal.style.display = 'none';
//           location.reload(); // Перезагрузка страницы для обновления интерфейса
//         });
//     } else {
//       // Добавление нового подарка
//       fetch('data.json')
//         .then(response => response.json())
//         .then(data => {
//           data.celebrants[currentCelebrantIndex].gifts.push({
//             title: 'Придумывает поздравляющий',
//             description: '',
//             price: '0 RUB',
//             photo: 'images/custom.jpg',
//             link: '#',
//             donor: name,
//           });

//           return fetch('data.json', {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//           });
//         })
//         .then(() => {
//           alert('Подарок успешно добавлен!');
//           giftModal.style.display = 'none';
//           location.reload(); // Перезагрузка страницы для обновления интерфейса
//         });
//     }
//   });

//   // Функция для правильного склонения слова "год"
//   function getAgeWord(age) {
//     if (age % 10 === 1 && age % 100 !== 11) return 'год';
//     if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года';
//     return 'лет';
//   }
// });

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

  toggle.addEventListener('change', () => {
    mainContainer.classList.toggle('parallel', toggle.checked);
    mainContainer.classList.toggle('sequential', !toggle.checked);
  });

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.celebrants.forEach((celebrant, index) => {
        const celebrantBlock = document.createElement('div');
        celebrantBlock.classList.add('celebrant');

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

        const giftsBlock = document.createElement('div');
        giftsBlock.classList.add('gifts');

        celebrant.gifts.forEach(gift => {
          const giftBlock = document.createElement('div');
          giftBlock.classList.add('gift');
          giftBlock.setAttribute('data-price', gift.price);

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
          giftLink.textContent = 'Похожий товар';
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

          giftButtons.append(giftButton, contributeButton);
          giftInfo.append(giftTitle, giftDescription, giftLink, giftButtons);
          giftBlock.append(giftPhoto, giftInfo);
          giftsBlock.appendChild(giftBlock);
        });

        const addGiftButton = document.createElement('button');
        addGiftButton.textContent = 'Подарить свой подарок';
        addGiftButton.classList.add('gift__button');
        addGiftButton.addEventListener('click', () => openModal(null, index, false));

        giftsBlock.appendChild(addGiftButton);
        celebrantBlock.append(infoBlock, giftsBlock);
        mainContainer.appendChild(celebrantBlock);
      });

      applyGiftColors();
    });

  function applyGiftColors() {
    document.querySelectorAll('.gift').forEach(gift => {
      const price = parseInt(gift.getAttribute('data-price'), 10);
      let baseColor = [226, 245, 236]; // #e2f5ec (RGB)
      let factor = 0;

      if (price < 500) factor = 1.08;
      else if (price >= 500 && price < 1000) factor = 1.04;
      else if (price >= 1000 && price < 2000) factor = 1;
      else if (price >= 2000 && price < 5000) factor = 0.96;
      else if (price >= 5000) factor = 0.92;

      const newColor = baseColor.map(c => Math.min(255, Math.max(0, Math.round(c * factor))));
      gift.style.backgroundColor = `rgb(${newColor.join(',')})`;
    });
  }

  function openModal(gift, celebrantIndex, isContribution) {
    currentGift = gift;
    currentCelebrantIndex = celebrantIndex;

    modalTitle.textContent = isContribution ? 'Вложиться в подарок' : gift ? 'Подарить подарок' : 'Добавить свой подарок';
    amountField.style.display = isContribution ? 'block' : 'none';

    giftModal.style.display = 'block';
  }

  modalClose.addEventListener('click', () => {
    giftModal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === giftModal) {
      giftModal.style.display = 'none';
    }
  });

  giftForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    if (currentGift) {
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const gift = data.celebrants[currentCelebrantIndex].gifts.find(g => g.title === currentGift.title);

          if (amount) {
            gift.contributions = gift.contributions || [];
            gift.contributions.push({ name, amount: parseFloat(amount) });
            gift.isFullyPaid = gift.contributions.reduce((sum, c) => sum + c.amount, 0) >= parseFloat(gift.price);
          } else {
            gift.isSelected = true;
            gift.donor = name;
          }

          return fetch('data.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        })
        .then(() => {
          alert('Данные успешно обновлены!');
          giftModal.style.display = 'none';
          location.reload();
        });
    }
  });

  function getAgeWord(age) {
    if (age % 10 === 1 && age % 100 !== 11) return 'год';
    if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года';
    return 'лет';
  }
});
