// Ключ, по которому будут сохраняться все черновики
const DRAFTS_KEY = 'event_drafts';

export function saveDraft(id, data) {
  if (typeof window === 'undefined') return;

  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  drafts[id] = {
    ...data,
    createdAt: Date.now()
  };
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function getDraft(id) {
  if (typeof window === 'undefined') return null;

  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  return drafts[id] || null;
}

export function deleteDraft(id) {
  if (typeof window === 'undefined') return;

  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  delete drafts[id];
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function getAllDrafts() {
  if (typeof window === 'undefined') return {};

  return JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
}
