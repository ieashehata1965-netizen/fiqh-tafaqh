function openCertPreview(e) {
  if (e) e.preventDefault();
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertPreview() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = '';
}

// إغلاق بالضغط خارج الـ modal
document.addEventListener('click', function(e) {
  const modal = document.getElementById('certModal');
  if (e.target === modal) closeCertPreview();
});

// إغلاق بزر Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCertPreview();
});