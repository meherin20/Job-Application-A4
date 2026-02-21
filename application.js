 const initialState = [
        {
id: '1',
companyName: 'Mobile First Corp',
position: 'React Native Developer',
location: 'Remote',
type: 'Full-time',
salary: '$130,000 - $175,000',
description: 'Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.',
status: 'not_applied',
        },
        {
id: '2',
companyName: 'WebFlow Agency',
position: 'Web Designer & Developer',
location: 'Los Angeles, CA',
type: 'Part-time',
salary: '$80,000 - $120,000',
description: 'Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.',
status: 'not_applied',
        },
        {
          id: '3',
companyName: 'DataViz Solutions',
position: 'Data Visualization Specialist',
location: 'Boston, MA',
type: 'Full-time',
salary: '$125,000 - $165,000',
description: 'Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.',
status: 'not_applied',
        },
        {
id: '4',
companyName: 'CloudFirst Inc',
position: 'Backend Developer',
location: 'Seattle, WA',
type: 'Full-time',
salary: '$140,000 - $190,000',
description: 'Design and maintain scalable APIs and microservices. Experience with Node.js, Python, or Go required.',
status: 'not_applied',
        },
        {
          id: '5',
companyName: 'Innovation Labs',
position: 'UI/UX Engineer',
location: 'Austin, TX',
type: 'Full-time',
salary: '$110,000 - $150,000',
description: 'Implement security best practices and conduct penetration testing. CISSP or similar certification preferred.',
status: 'not_applied',
        },
        {
          d: '6',
companyName: 'MegaCorp Solutions',
position: 'JavaScript Developer',
location: 'New York, NY',
type: 'Full-time',
salary: '$130,000 - $160,000',
description: 'Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.',
status: 'not_applied',
        },
        {
id: '7',
companyName: 'StartupXYZ',
position: 'Full Stack Engineer',
location: 'Remote',
type: 'Full-time',
salary: '$120,000 - $160,000',
description: 'Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.',
status: 'not_applied',
      },
        {
id: '8',
companyName: 'Tech Corp Industries',
position: 'Senior Frontend Developer',
location: 'San Francisco, CA',
type: 'Full-time',
salary: '$130,000 - $200,000',
description: 'We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.',
status: 'not_applied',
        },
        ];

let jobs = JSON.parse(JSON.stringify(initialState));
let currentTab = 'all';

const DOM = {
container: document.getElementById('jobs-container'),
emptyState: document.getElementById('empty-state'),
jobsCount: document.getElementById('jobs-count'),
dashboardTotal: document.getElementById('dashboard-total'),
dashboardInterview: document.getElementById('dashboard-interview'),
dashboardRejected: document.getElementById('dashboard-rejected'),
tabButtons: document.querySelectorAll('.tab-btn'),
tabsWrapper: document.getElementById('tabs-wrapper'),
};
function getCounts() {
  const total = jobs.length;
  const interview = jobs.filter((j) => j.status === 'interview').length;
  const rejected = jobs.filter((j) => j.status === 'rejected').length;
    return { total, interview, rejected };
}

function getFilteredJobs() {
    if (currentTab === 'all') return jobs;
    if (currentTab === 'interview') return jobs.filter((j) => j.status === 'interview');
    return jobs.filter((j) => j.status === 'rejected');
}

function getStatusLabel(status) {
    if (status === 'interview') return 'INTERVIEW';
    if (status === 'rejected') return 'REJECTED';
    return 'NOT APPLIED';
}
function renderDashboard() {
  const { total, interview, rejected } = getCounts();
    DOM.dashboardTotal.textContent = total;
    DOM.dashboardInterview.textContent = interview;
    DOM.dashboardRejected.textContent = rejected;
}

function updateJobsCount() {
  const filtered = getFilteredJobs();
  const count = filtered.length;
    DOM.jobsCount.textContent = count === 1 ? '1 job' : `${count} jobs`;
}

function setActiveTab() {
    DOM.tabButtons.forEach((btn) => {
    const tab = btn.getAttribute('data-tab');
    if (tab === currentTab) {
        btn.className = 'tab-btn px-4 py-2 rounded-full text-sm font-medium bg-[#2563eb] text-white transition-colors';
    } else {
        btn.className = 'tab-btn px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors';
    }
  });
}

function createJobCard(job) {
  const statusLabel = getStatusLabel(job.status);
  const statusClass =
            job.status === 'interview'
                    ? 'bg-green-100 text-green-700'
                    : job.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-sky-100 text-sky-700';

  const card = document.createElement('div');
    card.className = 'job-card bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 relative';
    card.setAttribute('data-job-id', job.id);
    card.innerHTML = `
    <button type="button" aria-label="Delete job" class="delete-btn absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 pr-10">${escapeHtml(job.companyName)}</h3>
            <p class="text-base text-gray-800 mt-1">${escapeHtml(job.position)}</p>
            <p class="text-sm text-gray-600 mt-1">${escapeHtml(job.location)} • ${escapeHtml(job.type)} • ${escapeHtml(job.salary)}</p>
            <span class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium uppercase ${statusClass}">${escapeHtml(statusLabel)}</span>
            <p class="text-sm text-gray-700 mt-3">${escapeHtml(job.description)}</p>
            <div class="flex flex-wrap gap-2 mt-4">
            <button type="button" class="action-btn interview-btn px-4 py-2 rounded-lg text-sm font-medium border-2 border-[#16a34a] text-[#16a34a] bg-white hover:bg-[#16a34a] hover:text-white transition-colors uppercase">
            Interview
            </button>
            <button type="button" class="action-btn rejected-btn px-4 py-2 rounded-lg text-sm font-medium border-2 border-[#dc2626] text-[#dc2626] bg-white hover:bg-[#dc2626] hover:text-white transition-colors uppercase">
            Rejected
            </button>
            </div>
  `;
    return card;
}

function escapeHtml(text) {
  const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderJobs() {
  const filtered = getFilteredJobs();
    DOM.container.innerHTML = '';

    if (filtered.length === 0) {
        DOM.container.classList.add('hidden');
        DOM.emptyState.classList.remove('hidden');
    } else {
        DOM.container.classList.remove('hidden');
        DOM.emptyState.classList.add('hidden');
        filtered.forEach((job) => {
                DOM.container.appendChild(createJobCard(job));
    });
    }

    renderDashboard();
    updateJobsCount();
    setActiveTab();
}

function handleTabClick(e) {
  const btn = e.target.closest('.tab-btn');
    if (!btn) return;
  const tab = btn.getAttribute('data-tab');
    if (tab) {
        currentTab = tab;
        renderJobs();
    }
}

function handleContainerClick(e) {
  const card = e.target.closest('.job-card');
    if (!card) return;
  const jobId = card.getAttribute('data-job-id');
  const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    if (e.target.closest('.delete-btn')) {
        jobs = jobs.filter((j) => j.id !== jobId);
        renderJobs();
        return;
    }

    if (e.target.closest('.interview-btn')) {
        job.status = 'interview';
        renderJobs();
        return;
    }

    if (e.target.closest('.rejected-btn')) {
        job.status = 'rejected';
        renderJobs();
        return;
    }
}

function init() {
    renderJobs();
    if (DOM.tabsWrapper) DOM.tabsWrapper.addEventListener('click', handleTabClick);
    DOM.container.addEventListener('click', handleContainerClick);
}

init();
