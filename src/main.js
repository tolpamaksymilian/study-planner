import './style.css';
import { supabase } from './supabase.js';

const app = document.querySelector('#app');

let currentAuthView = 'login';

function renderLoading() {
  app.innerHTML = `
    <div class="page-loader">
      <div class="loader"></div>
      <p>Ładowanie aplikacji...</p>
    </div>
  `;
}

function renderAuth() {
  const isLogin = currentAuthView === 'login';

  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-hero">
        <div class="brand">
          <div class="brand-icon">S</div>

          <div>
            <strong>StudyPlanner</strong>
            <span>Twój osobisty planer nauki</span>
          </div>
        </div>

        <div class="hero-content">
          <span class="hero-badge">Planowanie bez chaosu</span>

          <h1>
            Zorganizuj naukę,
            <span>zadania i terminy.</span>
          </h1>

          <p>
            Dodawaj zadania, kontroluj terminy i obserwuj swoje
            postępy w jednym miejscu.
          </p>

          <div class="hero-features">
            <article>
              <div class="feature-icon">✓</div>
              <div>
                <strong>Zarządzanie zadaniami</strong>
                <span>Dodawaj, edytuj i oznaczaj zadania jako wykonane.</span>
              </div>
            </article>

            <article>
              <div class="feature-icon">⌕</div>
              <div>
                <strong>Filtrowanie i wyszukiwanie</strong>
                <span>Szybko odnajduj zadania według statusu i priorytetu.</span>
              </div>
            </article>

            <article>
              <div class="feature-icon">◷</div>
              <div>
                <strong>Kontrola terminów</strong>
                <span>Sprawdzaj najbliższe oraz zaległe zadania.</span>
              </div>
            </article>
          </div>
        </div>

        <p class="hero-footer">
          Projekt zaliczeniowy – współczesne technologie internetowe
        </p>
      </section>

      <section class="auth-panel">
        <div class="auth-card">
          <div class="auth-heading">
            <span class="mobile-brand">StudyPlanner</span>

            <h2>${isLogin ? 'Witaj ponownie' : 'Utwórz konto'}</h2>

            <p>
              ${
                isLogin
                  ? 'Zaloguj się, aby przejść do swojego planera.'
                  : 'Zarejestruj się i rozpocznij planowanie nauki.'
              }
            </p>
          </div>

          <div class="auth-tabs" role="tablist">
            <button
              id="show-login"
              class="${isLogin ? 'active' : ''}"
              type="button"
            >
              Logowanie
            </button>

            <button
              id="show-register"
              class="${!isLogin ? 'active' : ''}"
              type="button"
            >
              Rejestracja
            </button>
          </div>

          <div
            id="auth-message"
            class="message hidden"
            role="alert"
          ></div>

          ${
            isLogin
              ? `
                <form id="login-form" class="auth-form" novalidate>
                  <div class="form-group">
                    <label for="login-email">Adres e-mail</label>
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      placeholder="np. student@example.com"
                      required
                    />
                    <small class="field-error" data-error-for="login-email"></small>
                  </div>

                  <div class="form-group">
                    <label for="login-password">Hasło</label>

                    <div class="password-wrapper">
                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="Wpisz swoje hasło"
                        required
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="login-password"
                        aria-label="Pokaż lub ukryj hasło"
                      >
                        Pokaż
                      </button>
                    </div>

                    <small class="field-error" data-error-for="login-password"></small>
                  </div>

                  <button class="primary-button" type="submit">
                    <span>Zaloguj się</span>
                  </button>
                </form>
              `
              : `
                <form id="register-form" class="auth-form" novalidate>
                  <div class="form-group">
                    <label for="register-name">Imię</label>
                    <input
                      id="register-name"
                      name="name"
                      type="text"
                      autocomplete="given-name"
                      placeholder="Wpisz swoje imię"
                      required
                    />
                    <small class="field-error" data-error-for="register-name"></small>
                  </div>

                  <div class="form-group">
                    <label for="register-email">Adres e-mail</label>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      placeholder="np. student@example.com"
                      required
                    />
                    <small class="field-error" data-error-for="register-email"></small>
                  </div>

                  <div class="form-group">
                    <label for="register-password">Hasło</label>

                    <div class="password-wrapper">
                      <input
                        id="register-password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Minimum 6 znaków"
                        required
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="register-password"
                        aria-label="Pokaż lub ukryj hasło"
                      >
                        Pokaż
                      </button>
                    </div>

                    <small class="field-error" data-error-for="register-password"></small>
                  </div>

                  <div class="form-group">
                    <label for="register-password-repeat">
                      Powtórz hasło
                    </label>

                    <div class="password-wrapper">
                      <input
                        id="register-password-repeat"
                        name="passwordRepeat"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Wpisz hasło ponownie"
                        required
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="register-password-repeat"
                        aria-label="Pokaż lub ukryj hasło"
                      >
                        Pokaż
                      </button>
                    </div>

                    <small
                      class="field-error"
                      data-error-for="register-password-repeat"
                    ></small>
                  </div>

                  <button class="primary-button" type="submit">
                    <span>Utwórz konto</span>
                  </button>
                </form>
              `
          }

          <p class="auth-switch">
            ${
              isLogin
                ? 'Nie masz jeszcze konta?'
                : 'Masz już konto?'
            }

            <button id="auth-switch-button" type="button">
              ${isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
          </p>
        </div>
      </section>
    </main>
  `;

  bindAuthEvents();
}

function renderDashboard(user) {
  const displayName =
    user.user_metadata?.display_name ||
    user.email?.split('@')[0] ||
    'Użytkownik';

  app.innerHTML = `
    <main class="dashboard-page">
      <header class="dashboard-header">
        <div class="dashboard-brand">
          <div class="brand-icon">S</div>

          <div>
            <strong>StudyPlanner</strong>
            <span>Panel użytkownika</span>
          </div>
        </div>

        <div class="user-actions">
          <div class="user-details">
            <strong>${escapeHtml(displayName)}</strong>
            <span>${escapeHtml(user.email || '')}</span>
          </div>

          <button id="logout-button" class="secondary-button" type="button">
            Wyloguj się
          </button>
        </div>
      </header>

      <section class="dashboard-content">
        <div class="welcome-card">
          <span class="hero-badge">Logowanie działa poprawnie</span>

          <h1>Witaj, ${escapeHtml(displayName)}!</h1>

          <p>
            Twoje konto jest aktywne. W następnym etapie dodamy
            dashboard, formularz zadania oraz listę danych z Supabase.
          </p>
        </div>

        <div class="dashboard-placeholder">
          <article>
            <span>0</span>
            <p>Wszystkie zadania</p>
          </article>

          <article>
            <span>0</span>
            <p>Do zrobienia</p>
          </article>

          <article>
            <span>0</span>
            <p>Wykonane</p>
          </article>

          <article>
            <span>0</span>
            <p>Po terminie</p>
          </article>
        </div>
      </section>
    </main>
  `;

  document
    .querySelector('#logout-button')
    .addEventListener('click', handleLogout);
}

function bindAuthEvents() {
  document.querySelector('#show-login')?.addEventListener('click', () => {
    currentAuthView = 'login';
    renderAuth();
  });

  document.querySelector('#show-register')?.addEventListener('click', () => {
    currentAuthView = 'register';
    renderAuth();
  });

  document
    .querySelector('#auth-switch-button')
    ?.addEventListener('click', () => {
      currentAuthView =
        currentAuthView === 'login' ? 'register' : 'login';

      renderAuth();
    });

  document.querySelectorAll('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.passwordTarget;
      const input = document.querySelector(`#${targetId}`);

      if (!input) {
        return;
      }

      const isPassword = input.type === 'password';

      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Ukryj' : 'Pokaż';
    });
  });

  document
    .querySelector('#login-form')
    ?.addEventListener('submit', handleLogin);

  document
    .querySelector('#register-form')
    ?.addEventListener('submit', handleRegister);
}

async function handleLogin(event) {
  event.preventDefault();
  clearValidation();

  const form = event.currentTarget;
  const email = form.email.value.trim();
  const password = form.password.value;

  let hasError = false;

  if (!isValidEmail(email)) {
    showFieldError('login-email', 'Podaj poprawny adres e-mail.');
    hasError = true;
  }

  if (!password) {
    showFieldError('login-password', 'Hasło jest wymagane.');
    hasError = true;
  }

  if (hasError) {
    showMessage('Popraw zaznaczone pola formularza.', 'error');
    return;
  }

  setFormLoading(form, true, 'Logowanie...');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    showMessage(
      translateAuthError(error.message, 'login'),
      'error'
    );

    setFormLoading(form, false, 'Zaloguj się');
    return;
  }

  showMessage('Zalogowano poprawnie.', 'success');
}

async function handleRegister(event) {
  event.preventDefault();
  clearValidation();

  const form = event.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const passwordRepeat = form.passwordRepeat.value;

  let hasError = false;

  if (name.length < 2) {
    showFieldError(
      'register-name',
      'Imię musi mieć minimum 2 znaki.'
    );
    hasError = true;
  }

  if (!isValidEmail(email)) {
    showFieldError(
      'register-email',
      'Podaj poprawny adres e-mail.'
    );
    hasError = true;
  }

  if (password.length < 6) {
    showFieldError(
      'register-password',
      'Hasło musi mieć minimum 6 znaków.'
    );
    hasError = true;
  }

  if (password !== passwordRepeat) {
    showFieldError(
      'register-password-repeat',
      'Podane hasła nie są takie same.'
    );
    hasError = true;
  }

  if (hasError) {
    showMessage('Popraw zaznaczone pola formularza.', 'error');
    return;
  }

  setFormLoading(form, true, 'Tworzenie konta...');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    showMessage(
      translateAuthError(error.message, 'register'),
      'error'
    );

    setFormLoading(form, false, 'Utwórz konto');
    return;
  }

  if (!data.session) {
    showMessage(
      'Konto zostało utworzone. Sprawdź skrzynkę e-mail i potwierdź rejestrację.',
      'success'
    );

    setFormLoading(form, false, 'Utwórz konto');
    return;
  }

  showMessage('Konto zostało utworzone poprawnie.', 'success');
}

async function handleLogout() {
  const button = document.querySelector('#logout-button');

  if (button) {
    button.disabled = true;
    button.textContent = 'Wylogowywanie...';
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(`Nie udało się wylogować: ${error.message}`);

    if (button) {
      button.disabled = false;
      button.textContent = 'Wyloguj się';
    }
  }
}

function showFieldError(inputId, message) {
  const input = document.querySelector(`#${inputId}`);
  const errorElement = document.querySelector(
    `[data-error-for="${inputId}"]`
  );

  input?.classList.add('invalid');

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearValidation() {
  document.querySelectorAll('.invalid').forEach((element) => {
    element.classList.remove('invalid');
  });

  document.querySelectorAll('.field-error').forEach((element) => {
    element.textContent = '';
  });

  const message = document.querySelector('#auth-message');

  if (message) {
    message.textContent = '';
    message.className = 'message hidden';
  }
}

function showMessage(text, type) {
  const message = document.querySelector('#auth-message');

  if (!message) {
    return;
  }

  message.textContent = text;
  message.className = `message ${type}`;
}

function setFormLoading(form, isLoading, label) {
  const submitButton = form.querySelector('button[type="submit"]');

  form.querySelectorAll('input, button').forEach((element) => {
    element.disabled = isLoading;
  });

  if (submitButton) {
    submitButton.innerHTML = `<span>${label}</span>`;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function translateAuthError(message, context) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes('invalid login credentials') ||
    normalizedMessage.includes('email not confirmed')
  ) {
    return context === 'login'
      ? 'Nieprawidłowy adres e-mail lub hasło.'
      : 'Nie udało się utworzyć konta.';
  }

  if (
    normalizedMessage.includes('user already registered') ||
    normalizedMessage.includes('already been registered')
  ) {
    return 'Konto z tym adresem e-mail już istnieje.';
  }

  if (normalizedMessage.includes('password')) {
    return 'Hasło nie spełnia wymagań bezpieczeństwa.';
  }

  if (
    normalizedMessage.includes('rate limit') ||
    normalizedMessage.includes('too many')
  ) {
    return 'Wykonano zbyt wiele prób. Spróbuj ponownie później.';
  }

  return `Wystąpił błąd: ${message}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function initializeApp() {
  renderLoading();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Błąd pobierania sesji:', error.message);
    renderAuth();
    return;
  }

  if (session?.user) {
    renderDashboard(session.user);
  } else {
    renderAuth();
  }

  supabase.auth.onAuthStateChange((event, nextSession) => {
    if (event === 'SIGNED_IN' && nextSession?.user) {
      renderDashboard(nextSession.user);
    }

    if (event === 'SIGNED_OUT') {
      currentAuthView = 'login';
      renderAuth();
    }
  });
}

initializeApp();