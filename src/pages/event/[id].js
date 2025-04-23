// pages/event/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ScrollToTop, ScrollToBottom } from '@/components/scroll-buttons';
import { Footer } from '@/components/layout/footer';
import { EventCard } from '@/components/event/event-card';
import { Pencil } from 'lucide-react';
import clsx from 'clsx';

import '@/styles/pages/event.scss';

export default function EventPage() {
  const { query } = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Здесь должна быть проверка на владельца по ID события и авторизации
    setIsOwner(true); // для примера
  }, []);

  return (
    <main className="event">
      <section className="event__content">
        <EventCard />

        {isOwner && (
          <Button
            className="event__edit-button"
            variant="outline"
            onClick={() => router.push(`/event/edit/${query.id}`)}
          >
            <Pencil size={16} />
            Редактировать
          </Button>
        )}
      </section>

      <ScrollToTop />
      <ScrollToBottom />

      <Footer extraText="Спасибо, что дарите радость вместе с нами!" />
    </main>
  );
}
