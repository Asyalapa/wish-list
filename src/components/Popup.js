import { useState, useEffect, useRef } from 'react';
import Input from '@/src/components/Input';
// import axios from 'axios';
import {
  isRequired,
  validateEmail,
  validatePassword,
  formatName,
  validateField
} from '@/src/utils/validation';
import {
  getModeTitle,
  getSwitchModeText,
  getSubmitButtonText,
  checkFormValidity
} from '@/src/utils/helpers';

const useDebouncedEffect = (callback, delay, deps) => {
  const handler = useRef();

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay]);
};

const Popup = ({ onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // login | register | verify | forgot | reset
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const res = await axios.post('/api/auth/check-email', { email });
      return res.data.exists;
    } catch {
      return false;
    }
  };

  useDebouncedEffect(() => {
    const run = async () => {
      if (mode === 'register' && formData.email && validateEmail(formData.email)) {
        const exists = await checkEmailExists(formData.email);
        if (exists) {
          setErrors((prev) => ({ ...prev, email: 'Этот email уже занят' }));
          setEmailExists(true);
        } else {
          setErrors((prev) => ({ ...prev, email: '' }));
          setEmailExists(false);
        }
      }
    };
    run();
  }, 500, [formData.email]);
  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'name' && value ? formatName(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
    const error = validateField(name, formattedValue, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => checkFormValidity(mode, formData, errors, emailExists);

  const validateForm = async () => {
    const newErrors = {};
    for (const name of Object.keys(formData)) {
      const error = validateField(name, formData[name], formData);
      if (error) newErrors[name] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);

    try {
      switch (mode) {
        case 'login':
          await axios.post('/api/auth/login', {
            email: formData.email,
            password: formData.password
          });
          onClose();
          break;
          
        case 'register':
          await axios.post('/api/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
          setMode('verify');
          break;
          
        case 'verify':
          await axios.post('/api/auth/verify', {
            email: formData.email,
            code: formData.verificationCode
          });
          onClose();
          break;
          
        case 'forgot':
          await axios.post('/api/auth/forgot-password', {
            email: formData.email
          });
          setMode('reset');
          break;
          
        case 'reset':
          await axios.post('/api/auth/reset-password', {
            email: formData.email,
            code: formData.verificationCode,
            newPassword: formData.newPassword
          });
          onClose();
          break;
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: err.response?.data?.message || 'Произошла ошибка'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <>
            <div className="form__content">
              <Input
                type="email"
                label="E-mail"
                name="email"
                value={formData.email}
                placeholder=""
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                type="password"
                label="Пароль"
                name="password"
                value={formData.password}
                placeholder=""
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="button modal__opacity-button"
            >
              Забыли пароль?
            </button>
          </>
        );

      case 'register':
        return (
          <div className="form__content">
            <Input
              type="text"
              label="Ваше имя"
              name="name"
              value={formData.name}
              placeholder=""
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              type="email"
              label="E-mail"
              name="email"
              value={formData.email}
              placeholder=""
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              type="password"
              label="Пароль"
              name="password"
              value={formData.password}
              placeholder=""
              onChange={handleChange}
              error={errors.password}
            />
            <p className="modal__requirement">
              Минимум 8 символов, заглавные и строчные буквы, цифры
            </p>
            <Input
              type="password"
              label="Повторите пароль"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder=""
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        );

      case 'verify':
        return (
          <div className="form__content">
            <p className="form__text">
              На {formData.email} был отправлен код подтверждения. Введите его ниже:
            </p>
            <Input
              type="text"
              label="Код подтверждения"
              name="verificationCode"
              value={formData.verificationCode}
              placeholder=""
              onChange={handleChange}
              error={errors.verificationCode}
            />
          </div>
        );

      case 'forgot':
        return (
          <div className="form__content">
            <p className="form__text">
              Введите email вашего аккаунта для восстановления пароля:
            </p>
            <Input
              type="email"
              label="E-mail"
              name="email"
              value={formData.email}
              placeholder=""
              onChange={handleChange}
              error={errors.email}
            />
          </div>
        );

      case 'reset':
        return (
          <div className="form__content">
            <p className="form__text">
              На {formData.email} был отправлен код подтверждения. Введите его и новый пароль:
            </p>
            <Input
              type="text"
              label="Код подтверждения"
              name="verificationCode"
              value={formData.verificationCode}
              placeholder=""
              onChange={handleChange}
              error={errors.verificationCode}
            />
            <Input
              type="password"
              label="Новый пароль"
              name="newPassword"
              value={formData.newPassword}
              placeholder=""
              onChange={handleChange}
              error={errors.newPassword}
            />
            <Input
              type="password"
              label="Повторите новый пароль"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              placeholder=""
              onChange={handleChange}
              error={errors.confirmNewPassword}
            />
          </div>
        );
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'login': return 'Вход';
      case 'register': return 'Регистрация';
      case 'verify': return 'Подтверждение Email';
      case 'forgot': return 'Восстановление пароля';
      case 'reset': return 'Смена пароля';
      default: return '';
    }
  };

  const getSwitchModeText = () => {
    switch (mode) {
      case 'login':
        return { text: 'Нет аккаунта? Зарегистрироваться', action: () => setMode('register') };
      case 'register':
        return { text: 'Уже есть аккаунт? Войти', action: () => setMode('login') };
      case 'forgot':
        return { text: 'Вернуться к входу', action: () => setMode('login') };
      case 'verify':
      case 'reset':
        return { text: 'Назад', action: () => setMode(mode === 'verify' ? 'register' : 'forgot') };
      default:
        return { text: '', action: () => {} };
    }
  };

  return (
    <div className='modal' onClick={onClose}>
      <article 
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
        >
        <div className="modal__content-box">
          <button onClick={onClose} className="modal__close">
          <span className="modal__close-line"></span>
          <span className="modal__close-line"></span>
          </button>

          <h2 className="modal__title">{getModeTitle(mode)}</h2>

          {errors.form && (
            <div className="modal__error">
              {errors.form}
            </div>
          )}

          <form className='modal__form' onSubmit={handleSubmit}>
            {renderForm()}

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`button modal__button ${!isFormValid() || isSubmitting ? 'button--disabled' : ''}`}
            >
              {getSubmitButtonText(mode, isSubmitting)}
            </button>
          </form>

          {getSwitchModeText().text && (
            <div className="modal__switch">
              <button
                onClick={() => setMode(getSwitchModeText(mode).action)}
                className="button modal__opacity-button"
              >
                {getSwitchModeText(mode).text}
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default Popup;