import React, { useState, useEffect, useRef } from 'react';

export default function Input({
  type = 'text',      // Тип инпута по умолчанию
  label,             // Заголовок/метка для инпута
  value,             // Значение инпута
  onChange,          // Функция для изменения значения
  error,             // Ошибка для отображения
  min,               // Для input type="number", минимальное значение
  max,               // Для input type="number", максимальное значение
  placeholder,       // Плейсхолдер
  className = '',    // Классы для инпута
  errorTimeout = 5000,
  ...rest            // Остальные props (например, "name", "required", и т.д.)
}) {
  const [visibleError, setVisibleError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Если есть новая ошибка
    if (error) {
      setVisibleError({ text: error, hiding: false });
      
      // Устанавливаем новый таймер
      timeoutRef.current = setTimeout(() => {
        setVisibleError(prev => prev ? { ...prev, hiding: true } : null);
        timeoutRef.current = setTimeout(() => {
          setVisibleError(null);
        }, 300);
      }, errorTimeout - 300); // 15 секунд
    } else {
      setVisibleError(null);
    }

    // Очистка при размонтировании
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, errorTimeout]); // Зависимость от error

  return (
    <div className="form__field">
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`form__input ${error ? 'error' : ''}`}
        {...rest}
      />
      {label && <span className="form__field-name">{label}</span>}
      {visibleError && (
        <p className={`form__error ${visibleError.hiding ? 'hiding' : ''}`}>
          {visibleError.text}
        </p>
      )}
    </div>
  );
}