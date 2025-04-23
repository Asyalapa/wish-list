import { ArrowUp, ArrowDown } from 'lucide-react';

export function ScrollToTop() {
  return (
    <button
      className="scroll-button scroll-button--top"
      aria-label="Прокрутить вверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={20} />
    </button>
  );
}

export function ScrollToBottom() {
  return (
    <button
      className="scroll-button scroll-button--bottom"
      aria-label="Прокрутить вниз"
      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
    >
      <ArrowDown size={20} />
    </button>
  );
}
