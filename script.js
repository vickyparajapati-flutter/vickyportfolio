/* =====================================================================
   CLEAN & LIGHTWEIGHT JAVASCRIPT
   - Sticky navbar blur
   - Active navigation spy
   - Simple contact form feedback
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Robust Resume Direct Download Handler (Binary Blob via Base64)
  function downloadResumeBinary() {
    try {
      if (window.RESUME_PDF_BASE64) {
        const byteCharacters = atob(window.RESUME_PDF_BASE64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Vicky_Parajapati_Resume_Updated.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        return;
      }
    } catch (err) {
      console.warn('Blob download fallback:', err);
    }

    // Direct fallback
    const directLink = document.createElement('a');
    directLink.href = 'Vicky_Parajapati_Resume_Updated.pdf';
    directLink.download = 'Vicky_Parajapati_Resume_Updated.pdf';
    document.body.appendChild(directLink);
    directLink.click();
    document.body.removeChild(directLink);
  }

  const resumeBtns = document.querySelectorAll('.download-resume-btn, #resumeDownloadBtn');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadResumeBinary();
    });
  });

  // Navbar blur on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });

  // Contact Form: Direct Mailto Trigger
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Opportunity / Job Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Vicky,\n\nName: ${name}\nEmail: ${email}\n\nMessage / Opportunity Details:\n${message}\n\nBest regards,\n${name}`
      );

      const mailtoUrl = `mailto:vickyprajapati789@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = 'Opening your email client... Sending to vickyprajapati789@gmail.com';
        formStatus.className = 'form-status-msg success';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = '';
        }
      }, 5000);
    });
  }
});
