import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyA1ap-K-ii2Zo7FOqL_lNXC2kYKew3Ke4k',
  authDomain: 'blog-eab5b.firebaseapp.com',
  projectId: 'blog-eab5b',
  storageBucket: 'blog-eab5b.appspot.com',
  messagingSenderId: '544280523270',
  appId: '1:544280523270:web:2bb29caffe4329c5e70987',
  measurementId: 'G-GJ5XSS9S0R',
}
const app = initializeApp(firebaseConfig)
getAnalytics(app)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const timestamp = Timestamp.now
export { db, auth, storage, timestamp }
