// ─────────────────────────────────────────────────────────────
//  BugSlayers Auth Web UI
//  Flow:
//    1. User signs in via Firebase (Google or email/password)
//    2. App gets the Firebase ID token
//    3. App POSTs it to POST /api/auth/token on our Express server
//    4. Server verifies the Firebase token and returns a server JWT (idToken)
//    5. idToken is stored in localStorage and shown in the UI
// ─────────────────────────────────────────────────────────────

// ── Init Firebase ────────────────────────────────────────────
firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ── DOM refs ─────────────────────────────────────────────────
const loginCard    = document.getElementById('loginCard');
const successCard  = document.getElementById('successCard');
const googleBtn    = document.getElementById('googleBtn');
const emailForm    = document.getElementById('emailForm');
const emailInput   = document.getElementById('email');
const passwordInput= document.getElementById('password');
const errorMsg     = document.getElementById('errorMsg');
const switchLink   = document.getElementById('switchToRegister');
const tokenDisplay = document.getElementById('tokenDisplay');
const testAuthBtn  = document.getElementById('testAuthBtn');
const apiResponse  = document.getElementById('apiResponse');
const signOutBtn   = document.getElementById('signOutBtn');

let isRegisterMode = false;

// ── Helpers ──────────────────────────────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}
function setLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? 'Please wait…' : btn.dataset.label;
}

// ── Exchange Firebase token → server JWT ─────────────────────
async function exchangeFirebaseToken(firebaseToken) {
  const res = await fetch(`${API_BASE}/api/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firebaseToken }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Server error during token exchange');
  }

  const { idToken } = await res.json();
  return idToken;
}

// ── Show success state ────────────────────────────────────────
function showSuccess(idToken) {
  localStorage.setItem('idToken', idToken);
  tokenDisplay.value = idToken;
  loginCard.classList.add('hidden');
  successCard.classList.remove('hidden');
}

// ── Handle auth result (any provider) ────────────────────────
async function handleAuthResult(userCredential) {
  try {
    const firebaseToken = await userCredential.user.getIdToken();
    const idToken = await exchangeFirebaseToken(firebaseToken);
    showSuccess(idToken);
  } catch (err) {
    showError(err.message);
  }
}

// ── Google Sign-In ────────────────────────────────────────────
googleBtn.dataset.label = 'Continue with Google';
googleBtn.addEventListener('click', async () => {
  clearError();
  try {
    const result = await auth.signInWithPopup(googleProvider);
    await handleAuthResult(result);
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      showError(err.message);
    }
  }
});

// ── Email / Password ──────────────────────────────────────────
const submitBtn = emailForm.querySelector('button[type="submit"]');
submitBtn.dataset.label = 'Sign in';

emailForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();
  setLoading(submitBtn, true);
  const email    = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    let result;
    if (isRegisterMode) {
      result = await auth.createUserWithEmailAndPassword(email, password);
    } else {
      result = await auth.signInWithEmailAndPassword(email, password);
    }
    await handleAuthResult(result);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(submitBtn, false);
  }
});

// ── Toggle register ───────────────────────────────────────────
switchLink.addEventListener('click', (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  submitBtn.textContent = isRegisterMode ? 'Create account' : 'Sign in';
  submitBtn.dataset.label = submitBtn.textContent;
  switchLink.textContent  = isRegisterMode ? 'Back to sign in' : 'Create one';
  document.querySelector('.switch-mode').firstChild.textContent =
    isRegisterMode ? 'Already have an account? ' : 'No account? ';
  clearError();
});

// ── Test GET /api/auth ────────────────────────────────────────
testAuthBtn.addEventListener('click', async () => {
  const idToken = localStorage.getItem('idToken');
  apiResponse.classList.add('hidden');

  try {
    const res = await fetch(`${API_BASE}/api/auth`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    const data = await res.json();
    apiResponse.textContent = JSON.stringify(data, null, 2);
    apiResponse.classList.remove('hidden');
  } catch (err) {
    apiResponse.textContent = 'Error: ' + err.message;
    apiResponse.classList.remove('hidden');
  }
});

// ── Sign out ──────────────────────────────────────────────────
signOutBtn.addEventListener('click', async () => {
  await auth.signOut();
  localStorage.removeItem('idToken');
  successCard.classList.add('hidden');
  loginCard.classList.remove('hidden');
  emailInput.value = '';
  passwordInput.value = '';
  clearError();
});

// ── Persist session on reload ─────────────────────────────────
auth.onAuthStateChanged(async (user) => {
  if (user && !successCard.classList.contains('hidden')) return; // already shown
  const stored = localStorage.getItem('idToken');
  if (user && stored) {
    tokenDisplay.value = stored;
    loginCard.classList.add('hidden');
    successCard.classList.remove('hidden');
  }
});
