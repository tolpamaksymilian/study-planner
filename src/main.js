import './style.css';
import './tasks.css';
import { supabase } from './supabase.js';

const app = document.querySelector('#app');

let currentAuthView = 'login';
let currentUser = null;
let tasks = [];

let filters = {
  search: '',
  status: 'all',
  priority: 'all',
};

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

          <div class="auth-tabs">
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
                      placeholder="np. student@example.com"
                    />
                    <small
                      class="field-error"
                      data-error-for="login-email"
                    ></small>
                  </div>

                  <div class="form-group">
                    <label for="login-password">Hasło</label>

                    <div class="password-wrapper">
                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Wpisz swoje hasło"
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="login-password"
                      >
                        Pokaż
                      </button>
                    </div>

                    <small
                      class="field-error"
                      data-error-for="login-password"
                    ></small>
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
                      placeholder="Wpisz swoje imię"
                    />
                    <small
                      class="field-error"
                      data-error-for="register-name"
                    ></small>
                  </div>

                  <div class="form-group">
                    <label for="register-email">Adres e-mail</label>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="np. student@example.com"
                    />
                    <small
                      class="field-error"
                      data-error-for="register-email"
                    ></small>
                  </div>

                  <div class="form-group">
                    <label for="register-password">Hasło</label>

                    <div class="password-wrapper">
                      <input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Minimum 6 znaków"
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="register-password"
                      >
                        Pokaż
                      </button>
                    </div>

                    <small
                      class="field-error"
                      data-error-for="register-password"
                    ></small>
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
                        placeholder="Wpisz hasło ponownie"
                      />

                      <button
                        class="password-toggle"
                        type="button"
                        data-password-target="register-password-repeat"
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
            ${isLogin ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}

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

async function renderDashboard(user) {
  currentUser = user;

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

          <button
            id="logout-button"
            class="secondary-button"
            type="button"
          >
            Wyloguj się
          </button>
        </div>
      </header>

      <section class="dashboard-content">
        <div class="dashboard-top">
          <div class="dashboard-title">
            <h1>Moje zadania</h1>
            <p>
              Dodawaj zadania, kontroluj terminy i obserwuj swoje postępy.
            </p>
          </div>

          <button id="add-task-button" class="add-task-button" type="button">
            + Dodaj zadanie
          </button>
        </div>

        <section id="statistics-grid" class="statistics-grid"></section>

        <section class="filters-panel">
          <div class="filter-field">
            <label for="task-search">Wyszukaj zadanie</label>
            <input
              id="task-search"
              type="search"
              placeholder="Wpisz nazwę, opis lub przedmiot..."
            />
          </div>

          <div class="filter-field">
            <label for="status-filter">Status</label>
            <select id="status-filter">
              <option value="all">Wszystkie statusy</option>
              <option value="todo">Do zrobienia</option>
              <option value="in_progress">W trakcie</option>
              <option value="done">Wykonane</option>
            </select>
          </div>

          <div class="filter-field">
            <label for="priority-filter">Priorytet</label>
            <select id="priority-filter">
              <option value="all">Wszystkie priorytety</option>
              <option value="low">Niski</option>
              <option value="medium">Średni</option>
              <option value="high">Wysoki</option>
            </select>
          </div>
        </section>

        <section id="tasks-container" class="tasks-container">
          <div class="tasks-loader">
            <div class="loader"></div>
            <p>Pobieranie zadań...</p>
          </div>
        </section>
      </section>
    </main>

    <div id="modal-container"></div>
    <div id="toast-container"></div>
  `;

  bindDashboardEvents();
  await loadTasks();
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
      const input = document.querySelector(
        `#${button.dataset.passwordTarget}`
      );

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

function bindDashboardEvents() {
  document
    .querySelector('#logout-button')
    .addEventListener('click', handleLogout);

  document
    .querySelector('#add-task-button')
    .addEventListener('click', () => openTaskModal());

  document
    .querySelector('#task-search')
    .addEventListener('input', (event) => {
      filters.search = event.target.value.trim().toLowerCase();
      renderTasks();
    });

  document
    .querySelector('#status-filter')
    .addEventListener('change', (event) => {
      filters.status = event.target.value;
      renderTasks();
    });

  document
    .querySelector('#priority-filter')
    .addEventListener('change', (event) => {
      filters.priority = event.target.value;
      renderTasks();
    });
}

async function loadTasks() {
  const container = document.querySelector('#tasks-container');

  container.innerHTML = `
    <div class="tasks-loader">
      <div class="loader"></div>
      <p>Pobieranie zadań...</p>
    </div>
  `;

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('deadline', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    container.innerHTML = `
      <div class="tasks-error">
        <div>
          <h3>Nie udało się pobrać zadań</h3>
          <p>${escapeHtml(error.message)}</p>
        </div>
      </div>
    `;

    return;
  }

  tasks = data || [];

  renderStatistics();
  renderTasks();
}

function renderStatistics() {
  const statistics = document.querySelector('#statistics-grid');

  if (!statistics) {
    return;
  }

  const today = getTodayDate();

  const allCount = tasks.length;
  const todoCount = tasks.filter((task) => task.status === 'todo').length;
  const progressCount = tasks.filter(
    (task) => task.status === 'in_progress'
  ).length;
  const doneCount = tasks.filter((task) => task.status === 'done').length;

  const overdueCount = tasks.filter(
    (task) => task.status !== 'done' && task.deadline < today
  ).length;

  statistics.innerHTML = `
    <article class="stat-card">
      <span>${allCount}</span>
      <p>Wszystkie zadania</p>
    </article>

    <article class="stat-card">
      <span>${todoCount}</span>
      <p>Do zrobienia</p>
    </article>

    <article class="stat-card">
      <span>${progressCount}</span>
      <p>W trakcie</p>
    </article>

    <article class="stat-card">
      <span>${doneCount}</span>
      <p>Wykonane</p>
    </article>

    <article class="stat-card">
      <span>${overdueCount}</span>
      <p>Po terminie</p>
    </article>
  `;
}

function renderTasks() {
  const container = document.querySelector('#tasks-container');

  if (!container) {
    return;
  }

  const filteredTasks = tasks.filter((task) => {
    const searchableText = `
      ${task.title}
      ${task.description || ''}
      ${task.subject}
    `.toLowerCase();

    const matchesSearch =
      !filters.search || searchableText.includes(filters.search);

    const matchesStatus =
      filters.status === 'all' || task.status === filters.status;

    const matchesPriority =
      filters.priority === 'all' ||
      task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (!filteredTasks.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div>
          <h3>Brak zadań</h3>
          <p>
            Nie znaleziono zadań pasujących do wybranych filtrów.
            Dodaj pierwsze zadanie albo zmień kryteria wyszukiwania.
          </p>
        </div>
      </div>
    `;

    return;
  }

  container.innerHTML = `
    <div class="tasks-list">
      ${filteredTasks.map(createTaskCard).join('')}
    </div>
  `;

  container.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      const task = tasks.find((item) => item.id === button.dataset.id);
      openTaskModal(task);
    });
  });

  container.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => {
      deleteTask(button.dataset.id);
    });
  });

  container.querySelectorAll('[data-action="toggle"]').forEach((button) => {
    button.addEventListener('click', () => {
      toggleTaskStatus(button.dataset.id);
    });
  });
}

function createTaskCard(task) {
  const today = getTodayDate();
  const isOverdue = task.status !== 'done' && task.deadline < today;
  const isDone = task.status === 'done';

  return `
    <article
      class="task-card ${isOverdue ? 'overdue' : ''} ${
        isDone ? 'done' : ''
      }"
    >
      <div class="task-main">
        <div class="task-top-row">
          <h3>${escapeHtml(task.title)}</h3>

          <span class="badge badge-priority-${task.priority}">
            ${getPriorityLabel(task.priority)}
          </span>

          <span class="badge badge-status-${toClassName(task.status)}">
            ${getStatusLabel(task.status)}
          </span>
        </div>

        ${
          task.description
            ? `
              <p class="task-description">
                ${escapeHtml(task.description)}
              </p>
            `
            : ''
        }

        <div class="task-meta">
          <span>
            <strong>Przedmiot:</strong>
            ${escapeHtml(task.subject)}
          </span>

          <span>
            <strong>Termin:</strong>
            ${formatDate(task.deadline)}
          </span>

          ${
            isOverdue
              ? `
                <span>
                  <strong>Uwaga:</strong>
                  zadanie po terminie
                </span>
              `
              : ''
          }
        </div>
      </div>

      <div class="task-actions">
        <button
          class="task-action-button complete"
          type="button"
          data-action="toggle"
          data-id="${task.id}"
        >
          ${isDone ? 'Przywróć' : 'Wykonane'}
        </button>

        <button
          class="task-action-button"
          type="button"
          data-action="edit"
          data-id="${task.id}"
        >
          Edytuj
        </button>

        <button
          class="task-action-button delete"
          type="button"
          data-action="delete"
          data-id="${task.id}"
        >
          Usuń
        </button>
      </div>
    </article>
  `;
}

function openTaskModal(task = null) {
  const modalContainer = document.querySelector('#modal-container');

  const isEdit = Boolean(task);

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="task-modal-overlay">
      <section class="modal">
        <div class="modal-header">
          <div>
            <h2>${isEdit ? 'Edytuj zadanie' : 'Dodaj zadanie'}</h2>
            <p>
              ${
                isEdit
                  ? 'Zmień dane wybranego zadania.'
                  : 'Uzupełnij formularz i zapisz nowe zadanie.'
              }
            </p>
          </div>

          <button id="modal-close" class="modal-close" type="button">
            ×
          </button>
        </div>

        <form id="task-form" class="task-form" novalidate>
          <div class="form-group">
            <label for="task-title">Nazwa zadania</label>
            <input
              id="task-title"
              name="title"
              type="text"
              maxlength="120"
              value="${escapeAttribute(task?.title || '')}"
              placeholder="Np. Przygotować prezentację"
            />
            <small
              class="field-error"
              data-error-for="task-title"
            ></small>
          </div>

          <div class="form-group">
            <label for="task-description">Opis</label>
            <textarea
              id="task-description"
              name="description"
              maxlength="1000"
              placeholder="Opcjonalny opis zadania"
            >${escapeHtml(task?.description || '')}</textarea>
          </div>

          <div class="form-group">
            <label for="task-subject">Przedmiot</label>
            <input
              id="task-subject"
              name="subject"
              type="text"
              maxlength="100"
              value="${escapeAttribute(task?.subject || '')}"
              placeholder="Np. Technologie internetowe"
            />
            <small
              class="field-error"
              data-error-for="task-subject"
            ></small>
          </div>

          <div class="task-form-row">
            <div class="form-group">
              <label for="task-deadline">Termin</label>
              <input
                id="task-deadline"
                name="deadline"
                type="date"
                value="${task?.deadline || ''}"
              />
              <small
                class="field-error"
                data-error-for="task-deadline"
              ></small>
            </div>

            <div class="form-group">
              <label for="task-priority">Priorytet</label>
              <select id="task-priority" name="priority">
                <option
                  value="low"
                  ${task?.priority === 'low' ? 'selected' : ''}
                >
                  Niski
                </option>

                <option
                  value="medium"
                  ${!task || task.priority === 'medium' ? 'selected' : ''}
                >
                  Średni
                </option>

                <option
                  value="high"
                  ${task?.priority === 'high' ? 'selected' : ''}
                >
                  Wysoki
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="task-status">Status</label>
            <select id="task-status" name="status">
              <option
                value="todo"
                ${!task || task.status === 'todo' ? 'selected' : ''}
              >
                Do zrobienia
              </option>

              <option
                value="in_progress"
                ${task?.status === 'in_progress' ? 'selected' : ''}
              >
                W trakcie
              </option>

              <option
                value="done"
                ${task?.status === 'done' ? 'selected' : ''}
              >
                Wykonane
              </option>
            </select>
          </div>

          <div class="modal-actions">
            <button
              id="modal-cancel"
              class="cancel-button"
              type="button"
            >
              Anuluj
            </button>

            <button class="primary-button" type="submit">
              ${isEdit ? 'Zapisz zmiany' : 'Dodaj zadanie'}
            </button>
          </div>
        </form>
      </section>
    </div>
  `;

  document
    .querySelector('#modal-close')
    .addEventListener('click', closeTaskModal);

  document
    .querySelector('#modal-cancel')
    .addEventListener('click', closeTaskModal);

  document
    .querySelector('#task-modal-overlay')
    .addEventListener('click', (event) => {
      if (event.target.id === 'task-modal-overlay') {
        closeTaskModal();
      }
    });

  document
    .querySelector('#task-form')
    .addEventListener('submit', (event) => {
      handleTaskSubmit(event, task?.id || null);
    });
}

function closeTaskModal() {
  const modalContainer = document.querySelector('#modal-container');

  if (modalContainer) {
    modalContainer.innerHTML = '';
  }
}

async function handleTaskSubmit(event, taskId) {
  event.preventDefault();

  const form = event.currentTarget;
  clearTaskValidation();

  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const subject = form.subject.value.trim();
  const deadline = form.deadline.value;
  const priority = form.priority.value;
  const status = form.status.value;

  let hasError = false;

  if (title.length < 3) {
    showTaskFieldError(
      'task-title',
      'Nazwa zadania musi mieć minimum 3 znaki.'
    );

    hasError = true;
  }

  if (subject.length < 2) {
    showTaskFieldError(
      'task-subject',
      'Podaj nazwę przedmiotu.'
    );

    hasError = true;
  }

  if (!deadline) {
    showTaskFieldError(
      'task-deadline',
      'Wybierz termin wykonania.'
    );

    hasError = true;
  }

  if (hasError) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Zapisywanie...';

  const taskData = {
    user_id: currentUser.id,
    title,
    description: description || null,
    subject,
    deadline,
    priority,
    status,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (taskId) {
    const response = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', taskId);

    error = response.error;
  } else {
    const response = await supabase
      .from('tasks')
      .insert(taskData);

    error = response.error;
  }

  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = taskId
      ? 'Zapisz zmiany'
      : 'Dodaj zadanie';

    showToast(`Nie udało się zapisać zadania: ${error.message}`, 'error');
    return;
  }

  closeTaskModal();

  showToast(
    taskId
      ? 'Zadanie zostało zaktualizowane.'
      : 'Zadanie zostało dodane.',
    'success'
  );

  await loadTasks();
}

async function toggleTaskStatus(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  const nextStatus = task.status === 'done' ? 'todo' : 'done';

  const { error } = await supabase
    .from('tasks')
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', taskId);

  if (error) {
    showToast(
      `Nie udało się zmienić statusu: ${error.message}`,
      'error'
    );

    return;
  }

  showToast('Status zadania został zmieniony.', 'success');
  await loadTasks();
}

async function deleteTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  const confirmed = window.confirm(
    `Czy na pewno usunąć zadanie „${task?.title || 'zadanie'}”?`
  );

  if (!confirmed) {
    return;
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    showToast(
      `Nie udało się usunąć zadania: ${error.message}`,
      'error'
    );

    return;
  }

  showToast('Zadanie zostało usunięte.', 'success');
  await loadTasks();
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
    showMessage('Nieprawidłowy adres e-mail lub hasło.', 'error');
    setFormLoading(form, false, 'Zaloguj się');
  }
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
    showMessage(`Wystąpił błąd: ${error.message}`, 'error');
    setFormLoading(form, false, 'Utwórz konto');
    return;
  }

  if (!data.session) {
    showMessage(
      'Konto zostało utworzone. Sprawdź pocztę i potwierdź rejestrację.',
      'success'
    );

    setFormLoading(form, false, 'Utwórz konto');
  }
}

async function handleLogout() {
  const button = document.querySelector('#logout-button');

  if (button) {
    button.disabled = true;
    button.textContent = 'Wylogowywanie...';
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    showToast(`Nie udało się wylogować: ${error.message}`, 'error');

    if (button) {
      button.disabled = false;
      button.textContent = 'Wyloguj się';
    }
  }
}

function showTaskFieldError(inputId, message) {
  const input = document.querySelector(`#${inputId}`);
  const errorElement = document.querySelector(
    `[data-error-for="${inputId}"]`
  );

  input?.classList.add('invalid');

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearTaskValidation() {
  document
    .querySelectorAll('#task-form .invalid')
    .forEach((element) => {
      element.classList.remove('invalid');
    });

  document
    .querySelectorAll('#task-form .field-error')
    .forEach((element) => {
      element.textContent = '';
    });
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

function showToast(text, type) {
  const container = document.querySelector('#toast-container');

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="toast ${type}">
      ${escapeHtml(text)}
    </div>
  `;

  window.setTimeout(() => {
    container.innerHTML = '';
  }, 3500);
}

function getPriorityLabel(priority) {
  const labels = {
    low: 'Niski',
    medium: 'Średni',
    high: 'Wysoki',
  };

  return labels[priority] || priority;
}

function getStatusLabel(status) {
  const labels = {
    todo: 'Do zrobienia',
    in_progress: 'W trakcie',
    done: 'Wykonane',
  };

  return labels[status] || status;
}

function toClassName(value) {
  return value.replaceAll('_', '-');
}

function formatDate(dateValue) {
  if (!dateValue) {
    return 'Brak terminu';
  }

  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${dateValue}T12:00:00`));
}

function getTodayDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
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
    await renderDashboard(session.user);
  } else {
    renderAuth();
  }

  supabase.auth.onAuthStateChange((event, nextSession) => {
    if (event === 'SIGNED_IN' && nextSession?.user) {
      renderDashboard(nextSession.user);
    }

    if (event === 'SIGNED_OUT') {
      currentUser = null;
      tasks = [];
      currentAuthView = 'login';
      renderAuth();
    }
  });
}

initializeApp();