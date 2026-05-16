// ══════════════════════════════════════════════════
//  Kitob Studio — Firebase Configuration
// ══════════════════════════════════════════════════
const firebaseConfig = {
  apiKey:            "AIzaSyATm04fB8x7ixwcj6TaF2DtY9D3e-c-Pz0",
  authDomain:        "kitob-studio.firebaseapp.com",
  projectId:         "kitob-studio",
  storageBucket:     "kitob-studio.firebasestorage.app",
  messagingSenderId: "572300481334",
  appId:             "1:572300481334:web:42dbbed4f7673507885997",
  measurementId:     "G-6N3EB2W12Y"
};

firebase.initializeApp(firebaseConfig);

window.ksAuth = firebase.auth();
window.ksDb   = firebase.firestore();
