/**
 * Contact Clipboard Helper
 * Module: assets/js/modules/contact/clipboard.js
 */

export function setupClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  if (!copyButtons || copyButtons.length === 0) return;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Show feedback with checkmark icon
        const originalHtml = btn.innerHTML;
        const feedbackText = btn.getAttribute('data-copied-text') || 'Copied!';
        btn.innerHTML = `<i class="fa fa-check" style="color: var(--primary);"></i> ${feedbackText}`;
        btn.classList.add('copied');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    });
  });
}
