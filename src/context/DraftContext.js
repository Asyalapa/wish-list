import { createContext, useContext, useState } from 'react';

// Создаём контекст
const DraftContext = createContext();

// Хук для доступа к контексту
export const useDraft = () => useContext(DraftContext);

// Провайдер контекста
export const DraftProvider = ({ children }) => {
  const [draftEvent, setDraftEvent] = useState(null);        // например, { title: '', date: '', ... }
  const [draftGifts, setDraftGifts] = useState([]);          // например, массив подарков

  const updateDraftEvent = (data) => {
    setDraftEvent(data);
    // Дополнительно можно сохранять в localStorage
    localStorage.setItem(`draft-${data.id}`, JSON.stringify(data));
  };

  const addGiftToDraft = (gift) => {
    setDraftGifts((prev) => [...prev, gift]);
  };

  const removeGiftFromDraft = (id) => {
    setDraftGifts((prev) => prev.filter((gift) => gift.id !== id));
  };

  const clearDraft = () => {
    setDraftEvent(null);
    setDraftGifts([]);
  };

  return (
    <DraftContext.Provider
      value={{
        draftEvent,
        draftGifts,
        updateDraftEvent,
        addGiftToDraft,
        removeGiftFromDraft,
        clearDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};
