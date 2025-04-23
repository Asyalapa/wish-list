export const isRequired = (value) => {
  return value?.trim().length > 0;
}

// Валидация email
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Форматирование имени
export const formatName = (name) => {
  return name
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Валидация пароля
export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};

// Валидация поля
export const validateField = (name, value, formData) => {
  let error = '';
  switch (name) {
    case 'email':
      if (!value) {
        error = 'Email обязателен';
      } else if (!validateEmail(value)) {
        error = 'Некорректный email';
      }
      break;
    case 'name':
      if (!value) {
        error = 'Имя обязательно';
      } else if (value.length < 2) {
        error = 'Имя слишком короткое';
      }
      break;
    case 'password':
      if (!value) {
        error = 'Пароль обязателен';
      } else if (!validatePassword(value)) {
        error = 'Некорректный пароль';
      }
      break;
    case 'confirmPassword':
      if (value !== formData?.password) {
        error = 'Пароли не совпадают';
      }
      break;
    case 'newPassword':
      if (!value) {
        error = 'Новый пароль обязателен';
      } else if (!validatePassword(value)) {
        error = 'Пароль должен содержать минимум 8 символов, включая заглавные, строчные буквы и цифры';
      }
      break;
    case 'confirmNewPassword':
      if (value !== formData?.newPassword) {
        error = 'Пароли не совпадают';
      }
      break;
    case 'verificationCode':
      if (!value) {
        error = 'Введите код подтверждения';
      }
      break;
    default:
      break;
  }
  return error;
};