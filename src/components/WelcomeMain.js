import React from "react";
import Link from "next/link";
import AuthButton from "./AuthButton";

export default function WelcomeMain() {
  return (
      <main className="main">
        <h1 className="welcome-title">Составьте свой <span className='title-wrap'>список подарков!</span></h1>
        <h2 className="welcome-subtitle">Создайте праздник без лишних хлопот с нашим приложением для пожеланий подарков!</h2>
        <p className="welcome-description">Забудьте о неловких моментах, когда вы дарите то, что уже подарили другие, или выбираете подарок {'"'}наугад{'"'}. Наше приложение создано, чтобы сделать подготовку к праздникам легкой, увлекательной и организованной — для вас и ваших близких!</p>
        <h2 className="welcome-subtitle">Почему это работает?</h2>
        <ul className="welcome-list">
          <li className="welcome-item"><span className='text-bold'>Удобный список желаний:</span> Составьте перечень подарков, которые действительно сделают ваш праздник особенным. Просто добавьте идеи, и ваши друзья или родные будут точно знать, что вам понравится.</li>
          <li className="welcome-item"><span className='text-bold'>Коллективные подарки:</span> Если вы отмечаете день рождения, свадьбу или любой другой праздник в компании, больше не нужно догадываться, кто что дарит. Каждый участник может выбрать свой подарок или вложиться в общий — всё на одной странице!</li>
          <li className="welcome-item"><span className='text-bold'>Прозрачность и ясность:</span> Увидели, что кто-то уже выбрал подарок из вашего списка? Отлично! Больше никаких дублей или недоразумений.</li>
        </ul>
        <h2 className="welcome-subtitle">Как это поможет вам?</h2>
        <ul className="welcome-list">
          <li className="welcome-item"><span className='text-bold'>Для именинников:</span> Получайте именно то, о чем мечтали! Просто создайте список желаний, поделитесь ссылкой с друзьями — и пусть они решают, как порадовать вас.</li>
          <li className="welcome-item"><span className='text-bold'>Для гостей:</span> Не тратьте время на поиски идеального подарка. Всё, что нужно, уже собрано в одном месте. Выберите, что подарить, или внесите свою часть в общий сюрприз.</li>
          <li className="welcome-item"><span className='text-bold'>Для больших компаний:</span> Организуйте совместные подарки без лишних звонков и сообщений. Все решения принимаются онлайн, а статус каждого подарка виден сразу.</li>
        </ul>
        <h2 className="welcome-subtitle">Что внутри?</h2>
        <ul className="welcome-list">
          <li className="welcome-item"><span className='text-bold'>Интуитивный интерфейс:</span> Добавляйте подарки одним кликом, загружайте фото и описания — всё просто и понятно.</li>
          <li className="welcome-item"><span className='text-bold'>Гибкая настройка:</span> Укажите бюджет, приоритеты или даже несколько вариантов одного подарка.</li>
          <li className="welcome-item"><span className='text-bold'>Автоматические уведомления:</span> Когда кто-то выберет или зарезервирует подарок, вы получите уведомление. Больше никакой путаницы!</li>
        </ul>
        <h2 className="welcome-subtitle">Подарки — это про радость, а не про стресс</h2>
        <p className="welcome-description">Наше приложение создано для тех, кто ценит время, комфорт и настоящие эмоции. Пусть каждый праздник станет особенным, а подарки — запоминающимися.</p>
        <p className="welcome-description"><span className='text-bold'>Начните прямо сейчас!</span> Создайте свой первый список желаний и поделитесь им с близкими. Сделайте подготовку к праздникам приятной, а подарки — идеальными.</p>
        <h2 className="welcome-subtitle">Попробуйте сами — это бесплатно!</h2>
        <p className="welcome-description">Ваш праздник начинается здесь. Присоединяйтесь к тысячам пользователей, которые уже убедились: подарки могут быть простыми, удобными и невероятно приятными.</p>

        <div className="welcome-buttons">
          <Link href="/event/create" passHref>
            <button className="button title-wrap" title="Создать мероприятие" aria-label="Открыть страницу создания мероприятия">Создать мероприятие</button>
          </Link>
          <AuthButton variant="register" />
        </div>
      </main>
  );
}