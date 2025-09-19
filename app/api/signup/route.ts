import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { fullName, email, role, password, confirmPassword } = await req.json();

    // Define the list of valid roles
    const validRoles = ["admin", "developer", "verifier", "buyer"];

    // 1. Validate that the password and confirmPassword fields match.
    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: "Passwords do not match." }), { status: 400 });
    }

    // 2. Validate that the submitted role is a valid option.
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role provided." }), { status: 400 });
    }

    // 3. Create the user in Firebase Authentication.
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 4. Update the user's display name using the fullName field.
    await updateProfile(user, { displayName: fullName });

    // 5. Store the user's role and other data in Firestore.
    // The doc ID is set to the user's UID for easy lookup later.
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      role: role,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({
      message: "User registered successfully",
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: role
    }), { status: 201 });

  } catch (error: any) {
    // Return a specific error message if signup fails.
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}