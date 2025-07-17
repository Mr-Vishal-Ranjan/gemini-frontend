
# Gemini Chat - Modern Next.js Chatroom App

## Project Overview

Gemini Chat is a modern, responsive chatroom application built with Next.js (App Router), React, Zustand, and raw CSS. It features OTP-based authentication, global state management, dark mode, toast notifications, infinite scroll, and robust form validation. The UI is inspired by ChatGPT and designed for a seamless, mobile-friendly experience.

link : https://gemini-frontend-vishal.netlify.app/

---

## Setup & Run Instructions

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder & Component Structure

```
src/
  app/
    page.js         # Main entry, handles auth, dashboard, toast, dark mode, logout
    globals.css      # Global styles, CSS variables, blue/dark theme
  components/
    Toast.js         # Global toast notification system
    DarkModeToggle.js# Dark mode toggle button
    ThemeProvider.js # Applies dark mode class
  features/
    auth/
      OtpForm.js     # OTP login form, validation, toast on OTP
      CountrySelect.js# Country/calling code select (local constants)
    dashboard/
      ChatroomList.js# List of chatrooms, search, select
      CreateChatroom.js# Create new chatroom
    chatroom/
      Chatroom.js    # Main chat UI, infinite scroll, copy, GPT-style avatar
  store.js           # Zustand global state, persistence, logout, toast
  utils/
    countries.js     # Local country/calling code data
```

---

## Implementation Details

### Throttling
- **Message sending** is debounced by disabling the input and send button while a message is being processed (simulated with a timeout). This prevents spamming and accidental double sends.

### Pagination & Infinite Scroll
- **Chatroom.js** implements infinite scroll for chat messages:
  - Messages are paginated in memory (PAGE_SIZE = 20).
  - When the user scrolls to the top, more messages are loaded by increasing the `page` state.
  - The chat view auto-scrolls to the bottom on new messages.

### Form Validation
- **OtpForm.js** uses [zod](https://zod.dev/) and [react-hook-form](https://react-hook-form.com/) for robust validation:
  - Phone number: must be exactly 10 digits, numeric only.
  - Country: required.
  - OTP: required only after sending.
- Input fields are restricted to prevent invalid input.
- Errors are shown inline and via toast notifications.

### Copy, Toast, and UI Details
- **Copy to clipboard:** Hovering over any message shows a copy icon at the bottom center (like ChatGPT). Clicking copies the message text.
- **Toast notifications:** All user feedback (login, OTP, errors, copy, etc.) uses a global toast system (Zustand + Toast.js).
- **Dark mode:** Toggle with a button, persists via Zustand/localStorage, uses CSS variables for theming.
- **Responsive design:** All layouts and components are mobile-friendly and adapt to screen size.

---



---

## Credits
- Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Zustand](https://zustand-demo.pmnd.rs/), [zod](https://zod.dev/), and [react-hook-form](https://react-hook-form.com/).
