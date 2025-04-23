"use client";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Popup from './Popup';
import { LogIn, Settings, LogOut } from 'lucide-react';
import SettingsForm from './SettingsForm';


export default function AuthButton({ variant = 'login' }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isPopupOpen]);

  // Определяем текст кнопки в зависимости от состояния и пропсов
  const getButtonText = () => {
    if (isAuthenticated) return <LogOut size={24} />;
    return variant === 'login' ? <LogIn size={24} /> : 'Зарегистрироваться';
  };

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <>
      <button 
        className="button"
        title={isAuthenticated ? 'Выйти из аккаунта' : (variant === 'login') ? 'Авторизоваться' : 'Зарегистрироваться'}
        onClick={handleClick}
        aria-label={isAuthenticated ? 'Выйти из аккаунта' : (variant === 'login') ? 'Открыть форму авторизации' : 'Открыть форму регистрации'}
      >
        {getButtonText()}
      </button>

      {isPopupOpen && (
        <Popup 
          initialMode={variant}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
}