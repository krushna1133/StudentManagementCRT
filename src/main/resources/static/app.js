/**
 * Academia — Student Management
 * Handles all CRUD operations against the Spring Boot REST API
 * API base: http://localhost:8080/api/student
 */

'use strict';

const API_URL = 'http://localhost:8080/api/student';

/* ── State ──────────────────────────────────────────────── */
let allStudents = [];
let editMode    = false;
let toastTimer  = null;

/* ── DOM refs ───────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const overlay       = $('modalOverlay');
const modalTitle    = $('modalTitle');
const submitBtn     = $('submitBtn');
const openFormBtn   = $('openFormBtn');
const closeModalBtn = $('closeModalBtn');
const cancelBtn     = $('cancelBtn');
const tableBody     = $('studentTableBody');
const emptyState    = $('emptyState');
const searchInput   = $('searchInput');
const recordCount   = $('recordCount');
const statTotal     = $('statTotal');
const statCourses   = $('statCourses');
const toast         = $('toast');

/* ── Bootstrap ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  bindEvents();
});

function bindEvents() {
  openFormBtn.addEventListener('click',  () => openModal('add'));
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click',    closeModal);
  submitBtn.addEventListener('click',    handleSubmit);

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Live search
  searchInput.addEventListener('input', () => renderTable(filterStudents(searchInput.value)));
}

/* ── Modal ──────────────────────────────────────────────── */
function openModal(mode, student = null) {
  clearForm();
  editMode = (mode === 'edit');

  if (editMode && student) {
    $('studentId').value  = student.id;
    $('firstName').value  = student.firstName  || '';
    $('lastName').value   = student.lastName   || '';
    $('email').value      = student.email      || '';
    $('age').value        = student.age        || '';
    $('course').value     = student.course     || '';
    modalTitle.textContent = 'Edit Student';
    submitBtn.textContent  = 'Save Changes';
  } else {
    modalTitle.textContent = 'Add Student';
    submitBtn.textContent  = 'Add Student';
  }

  overlay.classList.add('modal-overlay--visible');
  overlay.removeAttribute('aria-hidden');
  $('firstName').focus();
}

function closeModal() {
  overlay.classList.remove('modal-overlay--visible');
  overlay.setAttribute('aria-hidden', 'true');
  clearForm();
  editMode = false;
}

function clearForm() {
  ['studentId','firstName','lastName','email','age','course']
    .forEach(id => { $(id).value = ''; });
}

/* ── Submit handler ─────────────────────────────────────── */
async function handleSubmit() {
  const firstName = $('firstName').value.trim();
  const lastName  = $('lastName').value.trim();
  const email     = $('email').value.trim();

  if (!firstName || !lastName || !email) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
    age:    parseInt($('age').value) || null,
    course: $('course').value.trim() || null,
  };

  submitBtn.disabled   = true;
  submitBtn.textContent = editMode ? 'Saving…' : 'Adding…';

  try {
    if (editMode) {
      await updateStudent($('studentId').value, payload);
    } else {
      await createStudent(payload);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = editMode ? 'Save Changes' : 'Add Student';
  }
}

/* ── API calls ──────────────────────────────────────────── */
async function loadStudents() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allStudents = await res.json();
    renderTable(filterStudents(searchInput.value));
    updateSidebarStats();
  } catch (err) {
    showToast('Could not load students — is the server running?', 'error');
    console.error('[Academia] loadStudents:', err);
  }
}

async function createStudent(data) {
  try {
    const res = await fetch(API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showToast('Student added successfully.', 'success');
    closeModal();
    await loadStudents();
  } catch (err) {
    showToast('Failed to add student. Please try again.', 'error');
    console.error('[Academia] createStudent:', err);
  }
}

async function updateStudent(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showToast('Student updated successfully.', 'success');
    closeModal();
    await loadStudents();
  } catch (err) {
    showToast('Failed to update student. Please try again.', 'error');
    console.error('[Academia] updateStudent:', err);
  }
}

async function deleteStudent(id) {
  if (!confirm('Delete this student? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showToast('Student removed.', 'success');
    await loadStudents();
  } catch (err) {
    showToast('Failed to delete student. Please try again.', 'error');
    console.error('[Academia] deleteStudent:', err);
  }
}

/* ── Render ─────────────────────────────────────────────── */
function filterStudents(query) {
  if (!query.trim()) return allStudents;
  const q = query.toLowerCase();
  return allStudents.filter(s =>
    (s.firstName  || '').toLowerCase().includes(q) ||
    (s.lastName   || '').toLowerCase().includes(q) ||
    (s.email      || '').toLowerCase().includes(q) ||
    (s.course     || '').toLowerCase().includes(q)
  );
}

function renderTable(students) {
  // Update count
  const n = students.length;
  recordCount.textContent = `${n} student${n !== 1 ? 's' : ''}`;

  if (n === 0) {
    tableBody.innerHTML = '';
    emptyState.hidden   = false;
    return;
  }

  emptyState.hidden = true;

  tableBody.innerHTML = students.map((s, i) => {
    const initials = `${(s.firstName || '?')[0]}${(s.lastName || '?')[0]}`.toUpperCase();
    const fullName = `${s.firstName || ''} ${s.lastName || ''}`.trim();
    const delay    = Math.min(i * 40, 400);

    return /* html */`
      <tr style="animation-delay:${delay}ms">
        <td><span class="id-badge">${s.id}</span></td>
        <td>
          <div class="student-cell">
            <div class="student-avatar">${initials}</div>
            <span class="student-name">${escHtml(fullName)}</span>
          </div>
        </td>
        <td>${escHtml(s.email || '')}</td>
        <td>${s.age ?? '<span class="muted-dash">—</span>'}</td>
        <td>
          ${s.course
            ? `<span class="course-pill">${escHtml(s.course)}</span>`
            : '<span class="muted-dash">—</span>'}
        </td>
        <td>
          <div class="row-actions">
            <button class="btn btn--edit"   onclick="editStudentById(${s.id})">Edit</button>
            <button class="btn btn--delete" onclick="deleteStudent(${s.id})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ── Edit (fetch then open modal) ───────────────────────── */
async function editStudentById(id) {
  // Try from cached list first
  let student = allStudents.find(s => s.id === id);
  if (!student) {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      student = await res.json();
    } catch (err) {
      showToast('Could not load student data.', 'error');
      return;
    }
  }
  openModal('edit', student);
}

// Expose to inline onclick handlers
window.editStudentById = editStudentById;
window.deleteStudent   = deleteStudent;

/* ── Sidebar stats ───────────────────────────────────────── */
function updateSidebarStats() {
  statTotal.textContent = allStudents.length;
  const courses = new Set(allStudents.map(s => s.course).filter(Boolean));
  statCourses.textContent = courses.size;
}

/* ── Utilities ───────────────────────────────────────────── */
function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className   = `toast toast--${type} toast--visible`;
  toastTimer = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 4000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}