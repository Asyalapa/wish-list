import Head from 'next/head';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/router';
import WishlistItem from '@/src/components/WishlistItem';
import { useState, useEffect } from 'react';
// import { GiftListEditable } from '@/src/components/event/gift-list-editable';
import { Save, Share2, FileDown, UserPlus, Trash, Plus, Pencil } from 'lucide-react';
import { useDraft } from "@/src/context/DraftContext";
import Popup from '@/src/components/Popup';
import { v4 as uuidv4 } from 'uuid';

// /event/edit/dc01baf9-4b88-4d11-b67d-df42ea5874f3
// /event/edit/72f4df7c-49f7-4dd7-838f-deb762d2bd71

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated, openAuthPopup } = useAuth();
  const { 
    draftEvent, 
    updateDraftEvent, 
    clearDraft 
  } = useDraft();
  
  const [isAddWishlistOpen, setIsAddWishlistOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState(null);
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  // Загрузка данных события при монтировании или изменении id
  useEffect(() => {
    if (id && !draftEvent) {
      // Загрузка из localStorage или API
      const savedDraft = localStorage.getItem(`draft-${id}`);
      if (savedDraft) {
        updateDraftEvent(JSON.parse(savedDraft));
      }
    }
  }, [id, draftEvent, updateDraftEvent]);

  const openModal = (gift, wishlistId, partial) => {
    setCurrentGift({...gift, wishlistId});
    setIsPartialPayment(partial);
    setIsModalOpen(true);
  };

  const handleAddWishlist = (newWishlist) => {
    const updatedEvent = {
      ...draftEvent,
      wishlists: [...(draftEvent?.wishlists || []), {
        ...newWishlist,
        id: uuidv4(),
        gifts: []
      }]
    };
    updateDraftEvent(updatedEvent);
    setIsAddWishlistOpen(false);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      openAuthPopup('register');
      return;
    }
    // Логика сохранения
    console.log('Сохранение события:', draftEvent);
  };

  const handleShare = () => {
    // Логика поделиться
    console.log('Поделиться событием:', id);
  };

  const handleExportPDF = () => {
    // Логика экспорта в PDF
    console.log('Экспорт в PDF:', id);
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      // Логика удаления
      clearDraft();
      router.push('/profile');
    }
  };

  return (
    <>
      <Head>
        <title>Список пожеланий</title>
      </Head>
      <main className="main create">
        <h2 className="create__title">Редактирование списка пожеланий</h2>
        {draftEvent?.title && <h3 className="create__title">{draftEvent.title}</h3>}
        <button
          className="button wishlist-item__edit-btn"
          onClick={() => setIsEditing(!isEditing)}
          aria-label="Редактировать название мероприятия"
          >
          <Pencil size={20} />
        </button>

        {!isAuthenticated && (
          <p className="warning create__warning">
            ⚠️ Вы создаёте список как гость. Он будет доступен только до закрытия вкладки. Чтобы сохранить его в личном кабинете,&nbsp;
            <span onClick={() => openAuthPopup('register')} className="create__warning-link">зарегистрируйтесь</span> или&nbsp;
            <span onClick={() => openAuthPopup('login')} className="create__warning-link">войдите</span>.
          </p>
        )}
        <div className="container parallel" id="mainContainer">
          {draftEvent?.wishlists?.map((wishlist) => (
            <WishlistItem
              key={wishlist.id}
              wishlistId={wishlist.id}
              celebrant={wishlist.celebrant}
              age={wishlist.age}
              avatar={wishlist.avatar}
              openModal={openModal}
            />
          ))}
        </div>
          <button 
            className="button event-edit__add-button"
            onClick={() => setIsAddWishlistOpen(true)}
          >
            <Plus size={16} /> Добавить список
          </button>

        <div className="event-edit__controls">
          {isAuthenticated ? (
            <>
              <button 
                className="button event-edit__button" 
                onClick={handleSave}
              >
                <Save size={16} />
                Сохранить
              </button>
              <button 
                className="button event-edit__button" 
                onClick={handleShare}
              >
                <Share2 size={16} />
                Поделиться
              </button>
            </>
          ) : (
            <>
              <button 
                className="button event-edit__button" 
                onClick={handleExportPDF}
              >
                <FileDown size={16} />
                Сохранить PDF
              </button>
              <button 
                className="button event-edit__button" 
                onClick={() => openAuthPopup('register')}
              >
                <UserPlus size={16} />
                Зарегистрироваться
              </button>
            </>
          )}

          <button 
            className="button event-edit__button event-edit__button--danger" 
            onClick={handleDelete}
          >
            <Trash size={16} />
            Удалить
          </button>
        </div>
        {isModalOpen && (
          <Popup onClose={() => setIsModalOpen(false)}>
            <div className="gift-modal">
              <h3>{isPartialPayment ? 'Вложение в подарок' : 'Подарок'}</h3>
              {/* Добавьте форму для работы с подарком */}
            </div>
          </Popup>
        )}
      </main>
    </>
  );
}