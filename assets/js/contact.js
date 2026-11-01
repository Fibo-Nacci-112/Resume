document.addEventListener('DOMContentLoaded', function() {
  // 1. Initialize EmailJS with Security Options
  emailjs.init({
    publicKey: "KNzIBexpfnNcvwCQF",
    blockHeadless: true,          // Blocks automated script bots (Selenium, Puppeteer)
    // limitRate: {
    //   throttle: 60000,            // Limits submissions to 1 per minute per user session
    // },
  });

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const emailInput = form.querySelector('input[name="email"]');
    const companyInput = form.querySelector('input[name="name"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // 2. Strict Email Regex Check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    // 3. Security Check: Block HTML Injection (< or >)
    const injectionPattern = /[<>]/;
    if (injectionPattern.test(messageInput.value) || injectionPattern.test(companyInput.value)) {
      alert('For security reasons, please avoid using < or > in your input.');
      return;
    }

    // Disable button to prevent double-clicking
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // 4. Send main notification email to inbox
    emailjs.sendForm('service_q23cqxx', 'template_u4ie9i9', this)
      .then(() => {
        alert('Message sent successfully! Thanks for reaching out.');
        form.reset();
      })
      .catch((error) => {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS Error:', error);
      })
      .finally(() => {
        // Reset button state regardless of success or failure
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      });
  });
});