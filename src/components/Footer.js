export default function Footer({ isEventPage = false }) {
  return (
    <footer className="footer">
      <div className="footer__content">
        {isEventPage && (
          <p className="footer__text">
            Этот список — не приказ, а дружеская подсказка! 😊 Мы будем счастливы видеть вас и без подарков (просто любовь к вам может стать… чуточку условной 😆). А если всё же решите порадовать — помните: цены в магазине могут слегка отличаться от тех, что видел составитель списка. Да и ссылки — это всего лишь примеры, так что можно проявить фантазию! 🎁✨
          </p>
        )}
        <div className="footer__copyright">
          <span>© 2025 </span>
          <a href="https://t.me/Asyalapa" target="_blank" rel="noopener noreferrer">
            Анастасия Макарова
          </a>
          <span> — идея, дизайн и реализация данного приложения.</span>
        </div>
      </div>
    </footer>
  );
}