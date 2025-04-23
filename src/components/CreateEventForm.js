import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useDraft } from '@/src/context/DraftContext';
import Input from '@/src/components/Input';

export default function CreateEventForm({ isGuest = false }) {
  const router = useRouter();
  const { updateDraftEvent } = useDraft();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    congratsCount: 1,
    congratsList: [{ name: '', age: '', avatar: null }]
  });

  const [errors, setErrors] = useState({});

  const handleCountChange = (e) => {
    const count = Math.max(1, Number(e.target.value));
    setFormData(prev => {
      const updatedList = [...prev.congratsList];
      if (count > updatedList.length) {
        while (updatedList.length < count) {
          updatedList.push({ name: '', age: '', avatar: null });
        }
      } else {
        updatedList.length = count;
      }
      return { ...prev, congratsCount: count, congratsList: updatedList };
    });
  };

  const updateCongrats = (index, field, value) => {
    setFormData(prev => {
      const updatedList = [...prev.congratsList];
      updatedList[index][field] = value;
      return { ...prev, congratsList: updatedList };
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Введите название';
    if (!formData.date) newErrors.date = 'Укажите дату';
    
    formData.congratsList.forEach((item, i) => {
      if (!item.name.trim()) newErrors[`name-${i}`] = 'Имя обязательно';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = uuidv4();
    const draftData = {
      id,
      title: formData.title,
      date: formData.date,
      wishlists: formData.congratsList.map(item => ({
        id: uuidv4(),
        celebrant: item.name,
        age: item.age,
        avatar: item.avatar,
        gifts: []
      }))
    };

    // Сохраняем в контекст и локальное хранилище
    updateDraftEvent(draftData);
    router.push(`/event/edit/${id}`);
  };

  return (
    <form 
      className="create__form" 
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        label="Название мероприятия *"
        value={formData.title}
        placeholder=''
        onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
        error={errors.title}
      />
      <Input
        type="date"
        label="Дата мероприятия *"
        value={formData.date}
        placeholder=''
        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
        error={errors.date}
      />

      <Input
        type="number"
        label="Количество поздравляемых"
        value={formData.congratsCount}
        placeholder=''
        onChange={handleCountChange}
        error={errors.count}
        min={1}
      />


        <h3 className="create__congrats-title">Информация о<br />виновник{formData.congratsList.length > 1 ? 'ах' : 'е'}&nbsp;торжества</h3>
      <div className="create__congrats-list">
        {formData.congratsList.map((item, i) => (
          <div className="create__congrats-item" key={i}>
            <Input
              label={`Имя ${formData.congratsList.length > 1 ? (i + 1) : ''}*`}
              value={item.name}
              placeholder=''
              onChange={(e) => updateCongrats(i, 'name', e.target.value)}
              error={errors[`name-${i}`]}
            />

            <Input
              type="number"
              label="Возраст"
              value={item.age}
              placeholder=''
              onChange={(e) => updateCongrats(i, 'age', e.target.value)}
            />

            <Input
              type="file"
              label="Фотография"
              placeholder=''
              onChange={(e) => updateCongrats(i, 'avatar', e.target.files[0])}
            />
          </div>
        ))}
      </div>

      <div className="create__actions">
        <button 
          className="button create__button"
          onClick={handleSubmit}
          aria-label="Создать список пожеланий"
        >
          Создать список пожеланий
        </button>
      </div>
    </form>
  );
}
