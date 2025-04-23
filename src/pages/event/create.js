import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CreateEventForm from '@/src/components/CreateEventForm';
import { useAuth } from '@/src/context/AuthContext';
import { saveDraft } from '@/src/utils/storage';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, isAuthenticated, openAuthPopup } = useAuth();

  const handleCreate = (eventData) => {
    const id = uuidv4();
    saveDraft(id, eventData);
    router.push(`/event/edit/${id}`);
  };

  return (
    <>
      <Head>
        <title>Создание мероприятия</title>
      </Head>
      <main className="main create">
        <h2 className="create__title">Создание мероприятия</h2>

        {!isAuthenticated && (
          <p className="warning create__warning">
          ⚠️ Вы создаёте список как гость. Он будет доступен только до закрытия вкладки. Чтобы сохранить его в личном кабинете,
          <span 
            onClick={() => openAuthPopup('register')} 
            className="create__warning-link"
          > зарегистрируйтесь</span> или 
          <span 
            onClick={() => openAuthPopup('login')} 
            className="create__warning-link"
          >&nbsp;войдите</span>.
        </p>
        )}

        <CreateEventForm 
          isGuest={!user} 
          onSubmit={handleCreate} 
        />
      </main>
    </>
  );
}
