import { useState } from 'react';

export default function SettingsForm({ user }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: отправка данных
    console.log('Сохранить:', formData);
  };

  const handleDelete = () => {
    // TODO: обработка удаления
    alert('Профиль будет удалён');
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label className="settings-form__label">
        Имя:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="settings-form__input"
        />
      </label>

      <label className="settings-form__label">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="settings-form__input"
        />
      </label>

      <label className="settings-form__label">
        Новый пароль:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="settings-form__input"
        />
      </label>

      <div className="settings-form__footer">
        <button type="submit" className="settings-form__submit">
          Сохранить
        </button>
        <button type="button" onClick={handleDelete} className="settings-form__delete">
          Удалить профиль
        </button>
      </div>
    </form>
  );
}
