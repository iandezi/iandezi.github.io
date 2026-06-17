(function () {
  var WORKER_URL = 'https://spaceyadesign-enroll.dezigner.workers.dev';
  var REDIRECT_URL = 'https://app.payd.money/link/space-ya-design';

  var overlay = document.getElementById('enroll-modal');
  var form = document.getElementById('enroll-form');
  var submitBtn = form.querySelector('.form-submit');
  var successEl = overlay.querySelector('.form-success');
  var formBody = overlay.querySelector('.form-fields');

  function openModal(e) {
    e.preventDefault();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-enroll]').forEach(function (el) {
    el.addEventListener('click', openModal);
  });

  overlay.querySelector('.enrol-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  function validate() {
    var valid = true;
    form.querySelectorAll('input[required]:not([type="radio"]), select[required]').forEach(function (f) {
      var hint = f.parentElement.querySelector('.form-hint');
      if (!f.value.trim()) {
        f.classList.add('error');
        if (hint) hint.classList.add('show');
        valid = false;
      } else {
        f.classList.remove('error');
        if (hint) hint.classList.remove('show');
      }
    });
    var email = form.querySelector('[name="Email"]');
    var emailHint = email.parentElement.querySelector('.form-hint');
    if (email.value && !email.value.includes('@')) {
      email.classList.add('error');
      if (emailHint) emailHint.classList.add('show');
      valid = false;
    }
    var radioGrid = form.querySelector('.radio-grid');
    var radioHint = radioGrid.parentElement.querySelector('.form-hint');
    var picked = form.querySelector('[name="ExperienceLevel"]:checked');
    if (!picked) {
      radioGrid.classList.add('error');
      if (radioHint) radioHint.classList.add('show');
      valid = false;
    } else {
      radioGrid.classList.remove('error');
      if (radioHint) radioHint.classList.remove('show');
    }
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    var data = {
      FullName: form.FullName.value.trim(),
      PhoneNumber: form.PhoneNumber.value.trim(),
      Email: form.Email.value.trim(),
      CurrentOccupation: form.CurrentOccupation.value.trim(),
      ExperienceLevel: form.ExperienceLevel.value,
      'Whydoyouwanttojoin?': form['Whydoyouwanttojoin?'].value.trim()
    };

    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(function () {
        formBody.style.display = 'none';
        successEl.classList.add('show');
        setTimeout(function () {
          window.location.href = REDIRECT_URL;
        }, 2000);
      })
      .catch(function () {
        alert('Something went wrong. Please try again.');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      });
  });
})();
