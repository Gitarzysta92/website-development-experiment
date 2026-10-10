export function mountEnquiry() {
  const form = document.querySelector<HTMLFormElement>('#enquiry');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const locale = form.dataset.locale === 'pl' ? 'pl' : 'en';
  const query = new URLSearchParams(location.search);
  for (const key of ['intent', 'project']) {
    const value = query.get(key);
    const field = form.elements.namedItem(key) as HTMLSelectElement;
    if (value && Array.from(field.options).some(option => option.value === value)) field.value = value;
  }

  let currentId: string | undefined;
  let currentPayload: string | undefined;
  let busy = false;
  let revision = 0;
  let alive = true;
  let activeController: AbortController | undefined;
  form.addEventListener('input', () => {
    revision++;
    currentId = undefined;
    currentPayload = undefined;
    if (busy) status.textContent = locale === 'pl' ? 'Zmieniono formularz. Sprawdź treść i wyślij ponownie.' : 'Form changed. Review and submit again.';
  });
  window.addEventListener('pagehide', () => { alive = false; activeController?.abort(); });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    status.textContent = '';
    form.querySelectorAll('[aria-invalid="true"]').forEach(field => field.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field-error').forEach(error => error.remove());
    const data = new FormData(form);
    const payload = {
      intent: String(data.get('intent')),
      project: String(data.get('project')) || undefined,
      name: String(data.get('name')).trim() || undefined,
      organization: String(data.get('organization')).trim() || undefined,
      email: String(data.get('email')).trim(),
      message: String(data.get('message')).trim(),
      website: String(data.get('website')),
      locale
    };
    if (!/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(payload.email) || Array.from(payload.message).length < 20) {
      status.textContent = locale === 'pl' ? 'Podaj poprawny e-mail i wiadomość o długości co najmniej 20 znaków.' : 'Enter a valid email and a message of at least 20 characters.';
      return;
    }
    const raw = JSON.stringify(payload);
    if (raw !== currentPayload) { currentId = crypto.randomUUID(); currentPayload = raw; }
    const submittedRevision = revision;
    busy = true;
    submit.disabled = true;
    status.textContent = locale === 'pl' ? 'Wysyłanie do lokalnego odbiornika…' : 'Sending to local receiver…';
    const controller = new AbortController();
    activeController = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...payload, submissionId: currentId}),
        signal: controller.signal
      });
      const result = await response.json();
      if (!alive || revision !== submittedRevision) return;
      if (response.ok && result.status === 'accepted') {
        status.textContent = result.mode === 'fixture' ? (locale === 'pl' ? 'Testowe zapytanie odebrane lokalnie. Nie wysłano e-maila.' : 'Test enquiry received locally. No email was sent.') : (locale === 'pl' ? 'Dostawca przyjął zapytanie do wysyłki. Odbiór w skrzynce nie został potwierdzony.' : 'Provider accepted the enquiry for sending. Mailbox delivery is not verified.');
        form.reset();
        currentId = undefined;
        currentPayload = undefined;
      } else if (response.status === 429) {
        const delay = Number(response.headers.get('Retry-After')) || 60;
        status.textContent = locale === 'pl' ? `Zbyt wiele prób. Spróbuj ponownie za ${delay} s.` : `Too many attempts. Try again in ${delay} seconds.`;
      } else if (response.status === 409) {
        status.textContent = result.status === 'pending' ? (locale === 'pl' ? 'Zgłoszenie jest w toku. Spróbuj ponownie bez zmiany treści.' : 'Submission is pending. Retry unchanged later.') : (locale === 'pl' ? 'Identyfikator wykorzystano z inną treścią. Zmień formularz przed ponowną próbą.' : 'This ID was used with different content. Edit the form before retrying.');
      } else if (response.status === 422) {
        status.textContent = locale === 'pl' ? 'Sprawdź wskazane pola. Treść formularza została zachowana.' : 'Check the indicated fields. Your form content is preserved.';
        for (const issue of result.errors ?? []) {
          const field = form.elements.namedItem(issue.field);
          if (!(field instanceof HTMLElement)) continue;
          field.setAttribute('aria-invalid', 'true');
          const message = document.createElement('p');
          message.className = 'field-error';
          message.textContent = locale === 'pl' ? 'Sprawdź wartość tego pola.' : 'Check this field value.';
          field.parentElement?.append(message);
        }
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      } else if (response.status === 503) {
        status.textContent = locale === 'pl' ? 'Odbiornik jest niedostępny. Zapytanie nie zostało przyjęte; możesz użyć e-maila.' : 'Receiver unavailable. Enquiry was not accepted; you can use email.';
      } else if (response.status === 504) {
        status.textContent = locale === 'pl' ? 'Nie wiadomo, czy zapytanie przyjęto. Zachowaj treść i spróbuj ponownie bez zmian lub użyj e-maila.' : 'Acceptance is uncertain. Keep your text and retry unchanged, or use email.';
      } else {
        status.textContent = locale === 'pl' ? 'Nie udało się potwierdzić odbioru. Zachowaj treść i spróbuj ponownie lub użyj e-maila.' : 'Receipt could not be confirmed. Keep your text and retry, or use email.';
      }
    } catch {
      if (alive && revision === submittedRevision) status.textContent = locale === 'pl' ? 'Nie udało się potwierdzić odbioru. Zachowaj treść i spróbuj ponownie.' : 'Receipt could not be confirmed. Keep your text and retry.';
    } finally {
      clearTimeout(timeout);
      activeController = undefined;
      if (alive) { busy = false; submit.disabled = false; }
    }
  });
}
