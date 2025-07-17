// Zustand store for authentication and chatroom state
import { create } from 'zustand';

const STORAGE_KEY = 'gemini-app-state';

function loadState() {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

const initial = {
  user: null,
  chatrooms: [],
  messages: {},
  darkMode: false,
  toast: '',
};

const useStore = create((set, get) => ({
  ...initial,
  ...loadState(),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ ...initial });
  },
  setUser: (user) => set((state) => {
    const next = { ...state, user };
    saveState(next);
    return { user };
  }),
  setChatrooms: (chatrooms) => set((state) => {
    const next = { ...state, chatrooms };
    saveState(next);
    return { chatrooms };
  }),
  addChatroom: (chatroom) => set((state) => {
    const chatrooms = [...state.chatrooms, chatroom];
    const next = { ...state, chatrooms };
    saveState(next);
    return { chatrooms };
  }),
  removeChatroom: (id) => set((state) => {
    const chatrooms = state.chatrooms.filter((c) => c.id !== id);
    const next = { ...state, chatrooms };
    saveState(next);
    return { chatrooms };
  }),
  setMessages: (chatroomId, messages) => set((state) => {
    const allMessages = { ...state.messages, [chatroomId]: messages };
    const next = { ...state, messages: allMessages };
    saveState(next);
    return { messages: allMessages };
  }),
  addMessage: (chatroomId, message) => set((state) => {
    const allMessages = { ...state.messages, [chatroomId]: [...(state.messages[chatroomId] || []), message] };
    const next = { ...state, messages: allMessages };
    saveState(next);
    return { messages: allMessages };
  }),
  toggleDarkMode: () => set((state) => {
    const darkMode = !state.darkMode;
    const next = { ...state, darkMode };
    saveState(next);
    return { darkMode };
  }),
  setToast: (toast) => set({ toast }),
}));

function saveState(state) {
  if (typeof window === 'undefined') return;
  const { user, chatrooms, messages, darkMode } = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, chatrooms, messages, darkMode }));
  } catch {}
}

export default useStore;
