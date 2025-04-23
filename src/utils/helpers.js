// Закрытие по Esc (если не хочешь дублировать везде)
export function handleEscClose(e, callback) {
  if (e.key === 'Escape') callback();
}

// Форматировать ошибки или другие вспомогательные штуки
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Пример debounce для валидации (если нужно)
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export const getModeTitle = (mode) => {
  switch (mode) {
    case 'login': return 'Вход';
    case 'register': return 'Регистрация';
    case 'verify': return 'Подтверждение Email';
    case 'forgot': return 'Восстановление пароля';
    case 'reset': return 'Смена пароля';
    default: return '';
  }
};

export const getSwitchModeText = (mode) => {
  switch (mode) {
    case 'login':
      return { text: 'Нет аккаунта? Зарегистрироваться', action: 'register' };
    case 'register':
      return { text: 'Уже есть аккаунт? Войти', action: 'login' };
    case 'forgot':
      return { text: 'Вернуться к входу', action: 'login' };
    case 'verify':
    case 'reset':
      return { text: 'Назад', action: mode === 'verify' ? 'register' : 'forgot' };
    default:
      return { text: '', action: '' };
  }
};

export const getSubmitButtonText = (mode, isSubmitting) => {
  if (isSubmitting) return 'Обработка...';
  
  switch (mode) {
    case 'login': return 'Войти';
    case 'register': return 'Зарегистрироваться';
    case 'verify': return 'Подтвердить';
    case 'forgot': return 'Отправить код';
    case 'reset': return 'Изменить пароль';
    default: return '';
  }
};

export const checkFormValidity = (mode, formData, errors, emailExists) => {
  const noErrors = Object.values(errors).every(e => !e);
  const requiredFieldsFilled = 
    (mode === 'login' && formData.email && formData.password) 
    || (mode === 'register' && formData.email && formData.password && formData.name && formData.confirmPassword) 
    || (mode === 'verify' && formData.email && formData.verificationCode) 
    || (mode === 'forgot' && formData.email) 
    || (mode === 'reset' && formData.email && formData.verificationCode && formData.newPassword && formData.confirmNewPassword);
  
  const passwordsMatch = 
    (mode !== 'register' || formData.password === formData.confirmPassword) &&
    (mode !== 'reset' || formData.newPassword === formData.confirmNewPassword);
  
  return noErrors && requiredFieldsFilled && passwordsMatch && !emailExists;
};

export const getAgeWord = (age) => {
  age = Math.abs(age) % 100;
  const lastDigit = age % 10;
  
  if (age > 10 && age < 20) return 'лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return 'года';
  return 'лет';
}

// Функция для форматирования цены
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Функция для сохранения в localStorage с обработкой ошибок
export const safeSaveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Ошибка сохранения в localStorage:', e);
    return false;
  }
};