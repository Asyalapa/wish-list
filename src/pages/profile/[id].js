import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Popup from '@/src/components/Popup';
import SettingsForm from '@/src/components/SettingsForm';
import Head from 'next/head';
import { useAuth } from '@/src/context/AuthContext';
import { Settings } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, openAuthPopup } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [events, setEvents] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [greeting, setGreeting] = useState('Привет');
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) setGreeting('Доброе утро');
    else if (hour < 18) setGreeting('Добрый день');
    else setGreeting('Добрый вечер');
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      openAuthPopup('login');
    }
  }, [isAuthenticated, openAuthPopup]);
  
  const handleOpenSettings = () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      openAuthPopup('login');
      return;
    }
    setIsSettingsOpen(true);
  };
  
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleCloseAuthPopup = () => setShowAuthPopup(false);
  
  const handleEventClick = (eventId) => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      openAuthPopup('login');
      return;
    }
    router.push(`/events/edit/${eventId}`);
  };
  
  const handleCreateEvent = () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      openAuthPopup('login');
      return;
    }
    router.push('/events/create');
  };

  return (
    <>
      <Head>
        <title>Профиль | {user?.name || 'Пользователь'}</title>
      </Head>
      
      <main className="profile">
        {console.log(user, isAuthenticated)}
        <div className="profile__header">
          <h1 className="profile__greeting">
            {greeting}, {user?.name || 'Гость'}!
          </h1>
          <button
            className="profile__settings-button"
            onClick={handleOpenSettings}
            aria-label="Открыть настройки"
          >
            <Settings size={24} strokeWidth={2} />
          </button>
        </div>

        {isAuthenticated ? (
          <section className="profile__events">
            {events.map((event) => (
              <div
                key={event.id}
                className="profile__event-card"
                onClick={() => handleEventClick(event.id)}
              >
                <h3 className="profile__event-title">{event.title}</h3>
                <p className="profile__event-date">
                  Создано: {new Date(event.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}

            <div
              className="profile__event-card profile__event-card--new"
              onClick={handleCreateEvent}
            >
              <span className="profile__event-plus">+</span>
              <p className="profile__event-text">Новое мероприятие</p>
            </div>
          </section>
        ) : (
          <div className="profile__guest-message">
            <p>Войдите, чтобы увидеть свои мероприятия</p>
          </div>
        )}

        {/* {isAuthenticated && (
          <Popup
            isOpen={isSettingsOpen}
            onClose={handleCloseSettings}
            title="Настройки профиля"
          >
            <SettingsForm user={user} />
          </Popup>
        )} */}

        {!isAuthenticated && (
          <Popup
            isOpen={showAuthPopup}
            onClose={handleCloseAuthPopup}
            title="Вход в систему"
            initialMode="login"
          />
        )}

      </main>
    </>
  );
}