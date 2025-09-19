export async function login(email, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Check if a token exists in the response and store it
      if (data.token) {
        localStorage.setItem('user-token', data.token);
      }
      return { success: true, data };
    } else {
      // Return the error message from the API
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
