const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});

const form = document.querySelector('#enquiry-form');
if (form) {
  const lang = document.body.dataset.lang;
  const feedback = document.querySelector('#form-feedback');
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status-dot');
  const params = new URLSearchParams(location.search);
  if (['investment', 'partnership', 'demo', 'general'].includes(params.get('type'))) form.elements.type.value = params.get('type');
  if (['artisense', 'aifield'].includes(params.get('project'))) form.elements.project.value = params.get('project');
  const show = state => {
    feedback.dataset.state = state;
    feedback.textContent = feedback.dataset[state];
  };
  const checkStatus = async () => {
    try {
      const response = await fetch('/api/enquiries/status', {cache:'no-store'});
      const data = await response.json();
      if (!response.ok || !data.available) throw Error('unavailable');
      button.disabled = false;
      status.textContent = lang === 'pl' ? 'FORMULARZ DOSTĘPNY' : 'FORM AVAILABLE';
    } catch {
      button.disabled = true;
      show('unavailable');
    }
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    if (!form.reportValidity()) return;
    button.disabled = true;
    button.textContent = button.dataset.sending;
    feedback.textContent = '';
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/enquiries', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(15000)});
      if (!response.ok) throw Error('unconfirmed');
      show('success');
      form.reset();
    } catch {
      show('error');
    } finally {
      button.disabled = false;
      button.textContent = button.dataset.send + ' ↗';
    }
  });
  checkStatus();
}
