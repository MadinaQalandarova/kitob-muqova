// ══════════════════════════════════════════════════════════════
//  Kitob Studio — Firebase Configuration
//  Setup qilish uchun:
//  1. https://console.firebase.google.com — yangi project yarating
//  2. Project sozlamalari → Web app qo'shing
//  3. Authentication → Email/Password va Google yoqing
//  4. Firestore Database → "test mode"da yarating
//  5. Quyidagi qiymatlarni o'z loyihangiz bilan almashtiring
// ══════════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

window.ksAuth = firebase.auth();
window.ksDb   = firebase.firestore();
