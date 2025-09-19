import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import jwt from 'jsonwebtoken';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if it hasn't been already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Authenticate the user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      return NextResponse.json({ error: 'User data not found in database' }, { status: 404 });
    }
    const userData = userDocSnap.data();
    const role = userData.role;

    // Create a payload for the JWT
    const tokenPayload = {
      uid: user.uid,
      email: user.email,
      role: role,
    };

    // Use a secure JWT secret from environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Generate the JWT
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token, user: { uid: user.uid, email: user.email, role } }, { status: 200 });

  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred.';
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password.';
    } else if (error.message.includes('JWT_SECRET')) {
      errorMessage = error.message;
    } else {
      console.error('Login error:', error);
    }
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
