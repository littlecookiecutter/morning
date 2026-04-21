// ===== STATE MANAGEMENT =====
const state = {
  tasks: [],
  plans: [],
  events: [],
  currentScreen: 'calm',
  breathingPhase: 'in'
};

// ===== MOCK DATA =====
function initMockData() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);
  const in5Days = new Date(today);
  in5Days.setDate(in5Days.getDate() + 5);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  // Tasks
  state.tasks = [
    {
      id: 'task-1',
      title: 'Prepare presentation for team meeting',
      deadline: formatDateForInput(tomorrow),
      important: true,
      tags: ['work', 'urgent'],
      status: 'todo',
      estimatedTime: 90,
      deltaTime: 0,
      completedAt: null
    },
    {
      id: 'task-2',
      title: 'Review project documentation',
      deadline: formatDateForInput(in3Days),
      important: false,
      tags: ['work'],
      status: 'partial',
      estimatedTime: 60,
      deltaTime: 0,
      completedAt: null
    },
    {
      id: 'task-3',
      title: 'Call insurance company',
      deadline: formatDateForInput(in5Days),
      important: false,
      tags: ['personal'],
      status: 'todo',
      estimatedTime: 30,
      deltaTime: 0,
      completedAt: null
    },
    {
      id: 'task-4',
      title: 'Buy groceries for the week',
      deadline: formatDateForInput(today),
      important: false,
      tags: ['personal'],
      status: 'done',
      estimatedTime: 45,
      deltaTime: 0,
      completedAt: new Date().toISOString()
    },
    {
      id: 'task-5',
      title: 'Long-term research task',
      deadline: formatDateForInput(nextWeek),
      important: false,
      tags: ['research'],
      status: 'todo',
      estimatedTime: 180,
      deltaTime: 0,
      completedAt: null
    }
  ];
  
  // Plans
  state.plans = [
    {
      id: 'plan-1',
      title: 'Launch new product feature',
      deadline: formatDateForInput(in5Days),
      important: true,
      tags: ['work', 'product'],
      steps: [
        { title: 'Design mockups', done: true, completedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
        { title: 'Development sprint', done: false, completedAt: null },
        { title: 'QA testing', done: false, completedAt: null },
        { title: 'Deploy to production', done: false, completedAt: null }
      ],
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 'plan-2',
      title: 'Home renovation planning',
      deadline: formatDateForInput(nextWeek),
      important: false,
      tags: ['personal', 'home'],
      steps: [
        { title: 'Research contractors', done: true, completedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
        { title: 'Get quotes', done: true, completedAt: new Date(Date.now() - 86400000).toISOString() },
        { title: 'Select contractor', done: false, completedAt: null },
        { title: 'Schedule start date', done: false, completedAt: null }
      ],
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
    },
    {
      id: 'plan-3',
      title: 'Completed fitness challenge',
      deadline: formatDateForInput(new Date(Date.now() - 86400000 * 2)),
      important: false,
      tags: ['health'],
      steps: [
        { title: 'Week 1 workouts', done: true, completedAt: new Date(Date.now() - 86400000 * 7).toISOString() },
        { title: 'Week 2 workouts', done: true, completedAt: new Date(Date.now() - 86400000 * 3).toISOString() }
      ],
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
    }
  ];
  
  // Events
  state.events = [
    {
      id: 'event-1',
      title: 'Team standup',
      date: formatDateForInput(today),
      recurring: true
    },
    {
      id: 'event-2',
      title: 'Doctor appointment',
      date: formatDateForInput(tomorrow),
      recurring: false
    },
    {
      id: 'event-3',
      title: 'Product review meeting',
      date: formatDateForInput(in3Days),
      recurring: false
    },
    {
      id: 'event-4',
      title: 'Weekly team sync',
      date: formatDateForInput(in5Days),
      recurring: true
    }
  ];
}

// ===== UTILITY FUNCTIONS =====
function formatDateForInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function getDayNumber(dateStr) {
  const date = new Date(dateStr);
  return date.getDate();
}

function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return today.toDateString() === date.toDateString();
}

function isWithin7Days(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 7;
}

function formatTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = minutes / 60;
  if (hours === Math.floor(hours)) return `${hours}h`;
  return `${hours.toFixed(1)}h`;
}

function generateId(type) {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getPlanProgress(plan) {
  if (!plan.steps || plan.steps.length === 0) return 0;
  const completed = plan.steps.filter(s => s.done).length;
  return (completed / plan.steps.length) * 100;
}

function getWeeklyProgress(plan) {
  if (!plan.steps || plan.steps.length === 0) return 0;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const completedThisWeek = plan.steps.filter(s => 
    s.done && s.completedAt && new Date(s.completedAt) >= weekAgo
  ).length;
  return (completedThisWeek / plan.steps.length) * 100;
}

function isArchived(task) {
  if (task.status === 'done') return true;
  if (task.deadline) {
    const deadline = new Date(task.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    if (deadline < today) return true;
  }
  return false;
}

function isPlanArchived(plan) {
  if (plan.steps.every(s => s.done)) return true;
  if (plan.deadline) {
    const deadline = new Date(plan.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    if (deadline < today) return true;
  }
  return false;
}

function shouldBeOnMain(task) {
  if (isArchived(task)) return false;
  if (task.important) return true;
  if (task.deadline && isWithin7Days(task.deadline)) return true;
  return false;
}

function shouldBeOnMainPlan(plan) {
  if (isPlanArchived(plan)) return false;
  if (plan.important) return true;
  if (plan.deadline && isWithin7Days(plan.deadline)) return true;
  return false;
}

// ===== NAVIGATION =====
function navigateTo(screenId) {
  // Update screen visibility
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(`screen-${screenId}`).classList.add('active');
  
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.screen === screenId) {
      link.classList.add('active');
    }
  });
  
  state.currentScreen = screenId;
  
  // Refresh content based on screen
  if (screenId === 'today') {
    renderSchedule();
    renderTodayTasks();
    renderTodayPlans();
  } else if (screenId === 'system') {
    renderSystemTasks();
    renderSystemPlans();
    renderArchive();
  } else if (screenId === 'learn') {
    renderArticles();
  } else if (screenId === 'calm') {
    renderQuote();
  }
}

// ===== BREATHING ANIMATION =====
function initBreathing() {
  const textEl = document.querySelector('.breathing-text');
  setInterval(() => {
    state.breathingPhase = state.breathingPhase === 'in' ? 'out' : 'in';
    textEl.textContent = state.breathingPhase === 'in' ? 'Breathe in...' : 'Breathe out...';
  }, 4000);
}

// ===== QUOTES =====
function renderQuote() {
  const quote = getDailyQuote();
  document.getElementById('daily-quote').textContent = `"${quote.text}"`;
  document.getElementById('quote-author').textContent = `— ${quote.author}`;
}

// ===== ARTICLES WITH API & FILTERING =====
let currentFilter = 'all';
let allArticles = [];

async function fetchArticles() {
  try {
    // Using a mock API response for now - can be replaced with real API
    const mockArticles = [
      {
        title: 'Mental Health Awareness Month: A Toolkit for HR Leaders',
        excerpt: 'How organizations can support employees in managing work stress and burnout effectively.',
        tag: 'White Paper',
        gradient: 'gradient-1',
        url: '#'
      },
      {
        title: 'The Workforce State of Mind in 2025',
        excerpt: 'Exploring the shifting landscape of employee wellbeing and the role of AI in mental health.',
        tag: 'Research Report',
        gradient: 'gradient-2',
        url: '#'
      },
      {
        title: 'Sam Altman on the Future of AI and Creativity',
        excerpt: 'A deep dive into how generative models are reshaping the way we think about human potential.',
        tag: 'Inspiration',
        gradient: 'gradient-5',
        url: '#'
      },
      {
        title: 'Why professional AI coding tools need purpose-built solutions',
        excerpt: 'Moving beyond generic LLMs to create tools that truly understand developer workflows.',
        tag: 'ML Insight',
        gradient: 'gradient-4',
        url: '#'
      },
      {
        title: 'Building Resilience in Uncertain Times',
        excerpt: 'Practical strategies for maintaining mental wellness during periods of change.',
        tag: 'White Paper',
        gradient: 'gradient-6',
        url: '#'
      },
      {
        title: 'The Science of Mindful Leadership',
        excerpt: 'How mindfulness practices can transform your approach to management and decision-making.',
        tag: 'Inspiration',
        gradient: 'gradient-3',
        url: '#'
      }
    ];
    
    allArticles = mockArticles;
    renderArticles();
  } catch (error) {
    console.error('Error fetching articles:', error);
    document.getElementById('articles-grid').innerHTML = '<p style="text-align:center;color:var(--hs-text-grey);">Failed to load articles. Please try again.</p>';
  }
}

function renderArticles() {
  const container = document.getElementById('articles-grid');
  
  let filtered = allArticles;
  if (currentFilter !== 'all') {
    filtered = allArticles.filter(a => a.tag === currentFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--hs-text-grey);grid-column:1/-1;">No articles found for this category.</p>';
    return;
  }
  
  container.innerHTML = filtered.map(article => `
    <article class="card">
      <div class="card-image ${article.gradient}"></div>
      <div class="card-content">
        <span class="tag">${article.tag}</span>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="${article.url}" class="read-more" onclick="event.preventDefault(); alert('Opening: ${article.title}')">Read article →</a>
      </div>
    </article>
  `).join('');
}

function setupArticleFilters() {
  const filterContainer = document.getElementById('article-filters');
  if (!filterContainer) return;
  
  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      // Update active state
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      
      // Update filter and re-render
      currentFilter = e.target.dataset.category;
      renderArticles();
    }
  });
}

// ===== SCHEDULE (7-DAY VIEW) =====
function renderSchedule() {
  const container = document.getElementById('schedule-grid');
  const today = new Date();
  let html = '';
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = formatDateForInput(date);
    const isTodayDate = isToday(dateStr);
    
    // Get items for this day
    const dayEvents = state.events.filter(e => e.date === dateStr);
    const dayTaskDeadlines = state.tasks.filter(t => t.deadline === dateStr && !isArchived(t));
    const dayPlanDeadlines = state.plans.filter(p => p.deadline === dateStr && !isPlanArchived(p));
    
    html += `
      <div class="day-card ${isTodayDate ? 'today' : ''}">
        <div class="day-name">${getDayName(dateStr)}</div>
        <div class="day-date">${getDayNumber(dateStr)}</div>
        <div class="day-items">
          ${dayEvents.map(e => `<div class="day-item event">📅 ${e.title}</div>`).join('')}
          ${dayTaskDeadlines.map(t => `<div class="day-item deadline">✓ ${t.title}</div>`).join('')}
          ${dayPlanDeadlines.map(p => `<div class="day-item deadline">★ ${p.title}</div>`).join('')}
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// ===== TASKS RENDERING =====
function renderTodayTasks() {
  const container = document.getElementById('today-tasks');
  const tasks = state.tasks.filter(shouldBeOnMain);
  
  if (tasks.length === 0) {
    container.innerHTML = '<p style="color: var(--hs-text-grey); text-align: center; padding: 20px;">No tasks for this week</p>';
    return;
  }
  
  container.innerHTML = tasks.map(task => `
    <div class="task-item">
      <div class="task-checkbox ${task.status === 'done' ? 'checked' : ''}" 
           onclick="toggleTaskStatus('${task.id}')"></div>
      <div class="task-info">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
          ${task.deadline ? `<span>📅 ${formatDateDisplay(task.deadline)}</span>` : ''}
          ${task.estimatedTime ? `<span>⏱ ${formatTime(task.estimatedTime)}</span>` : ''}
          ${task.important ? '<span class="task-important">★ Important</span>' : ''}
        </div>
      </div>
      <button class="task-edit" onclick="openEditModal('task', '${task.id}')">✎ Edit</button>
    </div>
  `).join('');
}

function renderSystemTasks() {
  const container = document.getElementById('system-tasks');
  const tasks = state.tasks.filter(t => !shouldBeOnMain(t) && !isArchived(t));
  
  if (tasks.length === 0) {
    container.innerHTML = '<p style="color: var(--hs-text-grey); text-align: center; padding: 20px;">No active tasks</p>';
    return;
  }
  
  container.innerHTML = tasks.map(task => `
    <div class="task-item">
      <div class="task-checkbox ${task.status === 'done' ? 'checked' : ''}" 
           onclick="toggleTaskStatus('${task.id}')"></div>
      <div class="task-info">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
          ${task.deadline ? `<span>📅 ${formatDateDisplay(task.deadline)}</span>` : ''}
          ${task.estimatedTime ? `<span>⏱ ${formatTime(task.estimatedTime)}</span>` : ''}
        </div>
      </div>
      <button class="task-edit" onclick="openEditModal('task', '${task.id}')">✎ Edit</button>
    </div>
  `).join('');
}

function toggleTaskStatus(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = task.status === 'done' ? 'todo' : 'done';
    if (task.status === 'done') {
      task.completedAt = new Date().toISOString();
    } else {
      task.completedAt = null;
    }
    refreshCurrentScreen();
  }
}

// ===== PLANS RENDERING =====
function renderTodayPlans() {
  const container = document.getElementById('today-plans');
  const plans = state.plans.filter(shouldBeOnMainPlan);
  
  if (plans.length === 0) {
    container.innerHTML = '<p style="color: var(--hs-text-grey); text-align: center; padding: 20px;">No plans for this week</p>';
    return;
  }
  
  container.innerHTML = plans.map(plan => {
    const progress = getPlanProgress(plan);
    const completedSteps = plan.steps.filter(s => s.done).length;
    
    return `
      <div class="plan-item">
        <div class="plan-header">
          <div class="plan-title">${plan.title}</div>
          <div class="plan-steps">${completedSteps}/${plan.steps.length} steps</div>
        </div>
        <div class="plan-progress">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="plan-meta">
          ${plan.deadline ? `<span>📅 ${formatDateDisplay(plan.deadline)}</span>` : ''}
          <span>${plan.important ? '★ Important' : ''}</span>
        </div>
        <button style="margin-top: 12px; background: none; border: none; color: var(--hs-orange); cursor: pointer; font-weight: 600;" onclick="openEditModal('plan', '${plan.id}')">✎ Edit Plan</button>
      </div>
    `;
  }).join('');
}

function renderSystemPlans() {
  const container = document.getElementById('system-plans');
  const plans = state.plans.filter(p => !shouldBeOnMainPlan(p) && !isPlanArchived(p));
  
  if (plans.length === 0) {
    container.innerHTML = '<p style="color: var(--hs-text-grey); text-align: center; padding: 20px;">No active plans</p>';
    return;
  }
  
  container.innerHTML = plans.map(plan => {
    const progress = getPlanProgress(plan);
    const completedSteps = plan.steps.filter(s => s.done).length;
    
    return `
      <div class="plan-item">
        <div class="plan-header">
          <div class="plan-title">${plan.title}</div>
          <div class="plan-steps">${completedSteps}/${plan.steps.length} steps</div>
        </div>
        <div class="plan-progress">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="plan-meta">
          ${plan.deadline ? `<span>📅 ${formatDateDisplay(plan.deadline)}</span>` : ''}
        </div>
        <button style="margin-top: 12px; background: none; border: none; color: var(--hs-orange); cursor: pointer; font-weight: 600;" onclick="openEditModal('plan', '${plan.id}')">✎ Edit Plan</button>
      </div>
    `;
  }).join('');
}

// ===== ARCHIVE =====
function toggleArchive() {
  const content = document.getElementById('archive-content');
  const icon = document.getElementById('archive-toggle');
  content.classList.toggle('show');
  icon.textContent = content.classList.contains('show') ? '▲' : '▼';
}

function renderArchive() {
  const tasksContainer = document.getElementById('archive-tasks');
  const plansContainer = document.getElementById('archive-plans');
  
  const archivedTasks = state.tasks.filter(isArchived);
  const archivedPlans = state.plans.filter(isPlanArchived);
  
  tasksContainer.innerHTML = archivedTasks.length > 0 
    ? archivedTasks.map(task => `
        <div class="task-item" style="opacity: 0.6;">
          <div class="task-checkbox checked"></div>
          <div class="task-info">
            <div class="task-title" style="text-decoration: line-through;">${task.title}</div>
            <div class="task-meta">Archived</div>
          </div>
        </div>
      `).join('')
    : '<p style="color: var(--hs-text-grey); padding: 20px; text-align: center;">No archived tasks</p>';
  
  plansContainer.innerHTML = archivedPlans.length > 0
    ? archivedPlans.map(plan => `
        <div class="plan-item" style="opacity: 0.6;">
          <div class="plan-header">
            <div class="plan-title" style="text-decoration: line-through;">${plan.title}</div>
            <div class="plan-steps">${plan.steps.length}/${plan.steps.length} steps</div>
          </div>
          <div class="plan-progress">
            <div class="progress-bar" style="width: 100%"></div>
          </div>
          <div class="plan-meta">Archived</div>
        </div>
      `).join('')
    : '<p style="color: var(--hs-text-grey); padding: 20px; text-align: center;">No archived plans</p>';
}

// ===== COMPLETED ACTIVITY MODAL =====
function showCompletedModal() {
  document.getElementById('completed-modal').classList.add('show');
  showCompletedPeriod(7);
}

function closeCompletedModal() {
  document.getElementById('completed-modal').classList.remove('show');
}

function showCompletedPeriod(days) {
  // Update toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const container = document.getElementById('completed-list');
  
  const completedTasks = state.tasks.filter(t => 
    t.status === 'done' && t.completedAt && new Date(t.completedAt) >= cutoff
  );
  
  const completedPlans = state.plans.filter(p => 
    p.steps.some(s => s.done && s.completedAt && new Date(s.completedAt) >= cutoff)
  );
  
  // Group by date
  const grouped = {};
  
  completedTasks.forEach(task => {
    const date = new Date(task.completedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push({ type: 'task', title: task.title });
  });
  
  completedPlans.forEach(plan => {
    plan.steps.filter(s => s.done && s.completedAt && new Date(s.completedAt) >= cutoff).forEach(step => {
      const date = new Date(step.completedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push({ type: 'plan', title: `${plan.title}: ${step.title}` });
    });
  });
  
  const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
  
  if (dates.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--hs-text-grey); padding: 40px;">No completed activity in this period</p>';
    return;
  }
  
  container.innerHTML = dates.map(date => `
    <div class="completed-group">
      <h4>${date}</h4>
      ${grouped[date].map(item => `
        <div class="completed-item">
          <div class="task-checkbox checked"></div>
          <div class="completed-info">
            <div class="completed-title">${item.title}</div>
            <div class="completed-type">${item.type === 'task' ? 'Task' : 'Plan step'}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ===== EDIT MODAL =====
let editingItem = null;
let editingType = null;

function openEditModal(type, id) {
  editingType = type;
  editingItem = type === 'task' ? state.tasks.find(t => t.id === id) : state.plans.find(p => p.id === id);
  
  const modal = document.getElementById('edit-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  
  title.textContent = `Edit ${type === 'task' ? 'Task' : 'Plan'}`;
  
  if (type === 'task') {
    body.innerHTML = `
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="edit-title" value="${editingItem.title}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Deadline</label>
          <input type="date" id="edit-deadline" value="${editingItem.deadline || ''}">
        </div>
        <div class="form-group">
          <label>Estimated Time (minutes)</label>
          <input type="number" id="edit-time" value="${editingItem.estimatedTime || 0}">
        </div>
      </div>
      <div class="form-group">
        <label>Tags (comma-separated)</label>
        <input type="text" id="edit-tags" value="${editingItem.tags.join(', ')}">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="edit-status">
          <option value="todo" ${editingItem.status === 'todo' ? 'selected' : ''}>To Do</option>
          <option value="partial" ${editingItem.status === 'partial' ? 'selected' : ''}>In Progress</option>
          <option value="done" ${editingItem.status === 'done' ? 'selected' : ''}>Done</option>
        </select>
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="edit-important" ${editingItem.important ? 'checked' : ''}>
        <label for="edit-important">Important</label>
      </div>
      <div class="modal-actions">
        <button class="btn-save" onclick="saveTask()">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="edit-title" value="${editingItem.title}">
      </div>
      <div class="form-group">
        <label>Deadline</label>
        <input type="date" id="edit-deadline" value="${editingItem.deadline || ''}">
      </div>
      <div class="form-group">
        <label>Tags (comma-separated)</label>
        <input type="text" id="edit-tags" value="${editingItem.tags.join(', ')}">
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="edit-important" ${editingItem.important ? 'checked' : ''}>
        <label for="edit-important">Important</label>
      </div>
      <div class="form-group">
        <label>Steps</label>
        <div class="steps-container" id="steps-container">
          ${editingItem.steps.map((step, index) => `
            <div class="step-item">
              <input type="checkbox" ${step.done ? 'checked' : ''} onchange="toggleStep(${index})">
              <input type="text" value="${step.title}" id="step-${index}">
              <button class="step-remove" onclick="removeStep(${index})">×</button>
            </div>
          `).join('')}
        </div>
        <button class="add-step-btn" onclick="addStep()">+ Add Step</button>
      </div>
      <div class="modal-actions">
        <button class="btn-save" onclick="savePlan()">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    `;
  }
  
  modal.classList.add('show');
}

function openAddModal(type) {
  editingType = type;
  editingItem = null;
  
  const modal = document.getElementById('edit-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  
  title.textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  
  if (type === 'task') {
    body.innerHTML = `
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="edit-title" placeholder="Enter task title">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Deadline</label>
          <input type="date" id="edit-deadline">
        </div>
        <div class="form-group">
          <label>Estimated Time (minutes)</label>
          <input type="number" id="edit-time" value="60">
        </div>
      </div>
      <div class="form-group">
        <label>Tags (comma-separated)</label>
        <input type="text" id="edit-tags" placeholder="work, personal, etc.">
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="edit-important">
        <label for="edit-important">Important</label>
      </div>
      <div class="modal-actions">
        <button class="btn-save" onclick="saveTask()">Create</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    `;
  } else if (type === 'plan') {
    body.innerHTML = `
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="edit-title" placeholder="Enter plan title">
      </div>
      <div class="form-group">
        <label>Deadline</label>
        <input type="date" id="edit-deadline">
      </div>
      <div class="form-group">
        <label>Tags (comma-separated)</label>
        <input type="text" id="edit-tags" placeholder="work, personal, etc.">
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="edit-important">
        <label for="edit-important">Important</label>
      </div>
      <div class="form-group">
        <label>Steps</label>
        <div class="steps-container" id="steps-container"></div>
        <button class="add-step-btn" onclick="addStep()">+ Add Step</button>
      </div>
      <div class="modal-actions">
        <button class="btn-save" onclick="savePlan()">Create</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    `;
  } else if (type === 'event') {
    body.innerHTML = `
      <div class="form-group">
        <label>Event Title</label>
        <input type="text" id="edit-title" placeholder="Enter event title">
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="edit-deadline">
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="edit-important">
        <label for="edit-important">Recurring</label>
      </div>
      <div class="modal-actions">
        <button class="btn-save" onclick="saveEvent()">Create</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    `;
  }
  
  modal.classList.add('show');
}

function closeModal() {
  document.getElementById('edit-modal').classList.remove('show');
  editingItem = null;
  editingType = null;
}

function saveTask() {
  const title = document.getElementById('edit-title').value;
  const deadline = document.getElementById('edit-deadline').value;
  const time = parseInt(document.getElementById('edit-time').value) || 0;
  const tags = document.getElementById('edit-tags').value.split(',').map(t => t.trim()).filter(t => t);
  const status = document.getElementById('edit-status')?.value || 'todo';
  const important = document.getElementById('edit-important').checked;
  
  if (editingItem) {
    // Update existing
    editingItem.title = title;
    editingItem.deadline = deadline || null;
    editingItem.estimatedTime = time;
    editingItem.tags = tags;
    editingItem.status = status;
    editingItem.important = important;
    if (status === 'done' && !editingItem.completedAt) {
      editingItem.completedAt = new Date().toISOString();
    }
  } else {
    // Create new
    state.tasks.push({
      id: generateId('task'),
      title,
      deadline: deadline || null,
      important,
      tags,
      status,
      estimatedTime: time,
      deltaTime: 0,
      completedAt: status === 'done' ? new Date().toISOString() : null
    });
  }
  
  closeModal();
  refreshCurrentScreen();
}

function savePlan() {
  const title = document.getElementById('edit-title').value;
  const deadline = document.getElementById('edit-deadline').value;
  const tags = document.getElementById('edit-tags').value.split(',').map(t => t.trim()).filter(t => t);
  const important = document.getElementById('edit-important').checked;
  
  const steps = [];
  document.querySelectorAll('.step-item').forEach((item, index) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const input = item.querySelector('input[type="text"]');
    steps.push({
      title: input.value,
      done: checkbox.checked,
      completedAt: checkbox.checked ? new Date().toISOString() : null
    });
  });
  
  if (editingItem) {
    // Update existing - preserve completion dates for already done steps
    editingItem.title = title;
    editingItem.deadline = deadline || null;
    editingItem.tags = tags;
    editingItem.important = important;
    editingItem.steps = steps.map((newStep, i) => {
      if (i < editingItem.steps.length && editingItem.steps[i].done && !newStep.done) {
        return { ...newStep, completedAt: null };
      }
      if (i < editingItem.steps.length && editingItem.steps[i].done && newStep.done) {
        return { ...newStep, completedAt: editingItem.steps[i].completedAt };
      }
      return newStep;
    });
  } else {
    // Create new
    state.plans.push({
      id: generateId('plan'),
      title,
      deadline: deadline || null,
      important,
      tags,
      steps,
      createdAt: new Date().toISOString()
    });
  }
  
  closeModal();
  refreshCurrentScreen();
}

function saveEvent() {
  const title = document.getElementById('edit-title').value;
  const date = document.getElementById('edit-deadline').value;
  const recurring = document.getElementById('edit-important').checked;
  
  state.events.push({
    id: generateId('event'),
    title,
    date: date || formatDateForInput(new Date()),
    recurring
  });
  
  closeModal();
  refreshCurrentScreen();
}

function addStep() {
  const container = document.getElementById('steps-container');
  const index = container.children.length;
  const div = document.createElement('div');
  div.className = 'step-item';
  div.innerHTML = `
    <input type="checkbox">
    <input type="text" placeholder="Step description">
    <button class="step-remove" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(div);
}

function removeStep(index) {
  const container = document.getElementById('steps-container');
  if (container.children[index]) {
    container.children[index].remove();
  }
}

function toggleStep(index) {
  // Handled automatically by checkbox state
}

// ===== CSV IMPORT =====
function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split('\n').slice(1); // Skip header
    
    lines.forEach(line => {
      if (!line.trim()) return;
      const parts = line.split(',');
      const type = parts[0]?.toLowerCase();
      const title = parts[1]?.trim();
      
      if (!title) return;
      
      if (type === 'task') {
        const existing = state.tasks.find(t => t.id === parts[2]?.trim());
        if (existing) {
          // Update without resetting progress
          existing.title = title;
        } else {
          state.tasks.push({
            id: parts[2]?.trim() || generateId('task'),
            title,
            deadline: parts[3]?.trim() || null,
            important: parts[4]?.toLowerCase() === 'true',
            tags: parts[5]?.split(';').map(t => t.trim()) || [],
            status: parts[6]?.trim() || 'todo',
            estimatedTime: parseInt(parts[7]) || 60,
            deltaTime: 0,
            completedAt: null
          });
        }
      } else if (type === 'plan') {
        const existing = state.plans.find(p => p.id === parts[2]?.trim());
        if (existing) {
          existing.title = title;
        } else {
          state.plans.push({
            id: parts[2]?.trim() || generateId('plan'),
            title,
            deadline: parts[3]?.trim() || null,
            important: parts[4]?.toLowerCase() === 'true',
            tags: parts[5]?.split(';').map(t => t.trim()) || [],
            steps: [],
            createdAt: new Date().toISOString()
          });
        }
      }
    });
    
    alert('CSV imported successfully!');
    refreshCurrentScreen();
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ===== REFRESH =====
function refreshCurrentScreen() {
  if (state.currentScreen === 'today') {
    renderSchedule();
    renderTodayTasks();
    renderTodayPlans();
  } else if (state.currentScreen === 'system') {
    renderSystemTasks();
    renderSystemPlans();
    renderArchive();
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initMockData();
  initBreathing();
  renderQuote();
  fetchArticles();
  setupArticleFilters();
  
  // Setup navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(this.dataset.screen);
    });
  });
  
  // Initial render
  navigateTo('calm');
});
