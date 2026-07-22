/* =========================
   STUDENT DASHBOARD - تحليل الأداء
   يقرأ فقط من fiqh_user (تسجيل دخول حقيقي)
========================= */

document.addEventListener('DOMContentLoaded', initDashboard);

function initDashboard() {
  // جلب اسم الطالب فقط من fiqh_user (تسجيل دخول حقيقي)
  let userName = getUserName();

  if (!userName) {
    showGuestView();
    return;
  }

  // عرض اسم الطالب
  document.getElementById('studentName').textContent = 'الطالب: ' + userName;

  // جلب التقدم من fiqh_progress_ + email
  const progress = getUserProgress();

  // حساب الإحصائيات
  const stats = calculateStats(progress);

  // تحديث الواجهة
  updateUI(stats, progress);
}

/* =========================
   GET USER NAME
   فقط من fiqh_user (تسجيل دخول حقيقي)
========================= */
function getUserName() {
  const saved = localStorage.getItem('fiqh_user');
  if (saved) {
    try { 
      const user = JSON.parse(saved);
      return user.name || user.fullName; 
    } catch(e) {}
  }

  // لا نقرأ trainee_name أو fiqh_cert_name للزوار
  return null;
}

/* =========================
   GET USER PROGRESS
========================= */
function getUserProgress() {
  let progress = { totalAnswered: 0, totalCorrect: 0, totalCerts: 0, exams: [] };

  // جلب email من fiqh_user
  const saved = localStorage.getItem('fiqh_user');
  if (!saved) return progress;

  let email = '';
  try {
    const user = JSON.parse(saved);
    email = user.email || '';
  } catch(e) { return progress; }

  if (!email) return progress;

  // قراءة fiqh_progress_ + email
  const progKey = 'fiqh_progress_' + email;
  const progData = localStorage.getItem(progKey);

  if (progData) {
    try {
      const data = JSON.parse(progData);
      if (data) {
        progress.totalAnswered = data.totalAnswered || 0;
        progress.totalCorrect = data.totalCorrect || 0;
        progress.totalCerts = data.totalCerts || 0;
        if (data.exams && Array.isArray(data.exams)) {
          progress.exams = data.exams;
        }
      }
    } catch(e) {}
  }

  // قراءة قائمة الشهادات
  const certsList = getCertificatesList();

  // إضافة الشهادات كاختبارات
  certsList.forEach(cert => {
    const hasCert = progress.exams.some(e => e.certId === cert.id);
    if (!hasCert) {
      progress.exams.push({
        date: cert.date,
        total: cert.total,
        score: cert.score,
        percent: cert.percent,
        category: 'شهادة إتمام',
        certId: cert.id,
        isCertificate: true
      });
    }
  });

  return progress;
}

/* =========================
   CERTIFICATES LIST
========================= */
function getCertificatesList() {
  const saved = localStorage.getItem('fiqh_certificates_list');
  if (saved) {
    try { return JSON.parse(saved); } catch(e) { return []; }
  }

  // إنشاء قائمة من fiqh_cert_* الحالي
  const certName = localStorage.getItem('fiqh_cert_name');
  const certScore = parseInt(localStorage.getItem('fiqh_cert_score') || '0');
  const certTotal = parseInt(localStorage.getItem('fiqh_cert_total') || '0');
  const certId = localStorage.getItem('fiqh_cert_id');
  const certPassed = localStorage.getItem('fiqh_cert_passed');

  if (certPassed === 'true' && certId) {
    const cert = {
      id: certId,
      name: certName || 'غير معروف',
      score: certScore,
      total: certTotal,
      percent: certTotal > 0 ? Math.round((certScore / certTotal) * 100) : 0,
      date: new Date().toISOString()
    };
    localStorage.setItem('fiqh_certificates_list', JSON.stringify([cert]));
    return [cert];
  }

  return [];
}

/* =========================
   CALCULATE STATS
========================= */
function calculateStats(progress) {
  const totalAnswered = progress.totalAnswered || 0;
  const totalCorrect = progress.totalCorrect || 0;
  const totalWrong = totalAnswered - totalCorrect;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const totalExams = progress.exams ? progress.exams.length : 0;
  const totalCerts = progress.totalCerts || 0;

  // نسبة التقدم
  let progressPercent = 0;
  if (totalCerts > 0) progressPercent = Math.min(100, 20 + (totalCerts * 15));
  else if (totalExams > 0) progressPercent = Math.min(80, totalExams * 10);
  if (accuracy >= 90) progressPercent = Math.max(progressPercent, 50);

  return {
    totalAnswered,
    totalCorrect,
    totalWrong,
    accuracy,
    totalExams,
    totalCerts,
    progressPercent,
    exams: progress.exams || []
  };
}

/* =========================
   UPDATE UI
========================= */
function updateUI(stats, progress) {
  // حلقة التقدم
  const circle = document.getElementById('progressCircle');
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (stats.progressPercent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  document.getElementById('progressPercent').textContent = stats.progressPercent + '%';

  // الإحصائيات
  document.getElementById('totalExams').textContent = stats.totalExams;
  document.getElementById('totalCerts').textContent = stats.totalCerts;
  document.getElementById('accuracyRate').textContent = stats.accuracy + '%';

  // الرسالة التحفيزية
  updateMotivation(stats);

  // سجل الاختبارات والشهادات
  renderExamsTable(stats.exams);

  // ملخص الإجابات
  document.getElementById('totalAnswered').textContent = stats.totalAnswered;
  document.getElementById('totalCorrect').textContent = stats.totalCorrect;
  document.getElementById('totalWrong').textContent = stats.totalWrong;

  // الأشرطة البيانية
  const maxVal = Math.max(stats.totalAnswered, 1);
  document.getElementById('barTotal').style.width = '100%';
  document.getElementById('barCorrect').style.width = ((stats.totalCorrect / maxVal) * 100) + '%';
  document.getElementById('barWrong').style.width = ((stats.totalWrong / maxVal) * 100) + '%';
}

/* =========================
   MOTIVATION MESSAGE
========================= */
function updateMotivation(stats) {
  const banner = document.getElementById('motivationMsg');
  let msg = '';
  let type = 'info';

  if (stats.progressPercent >= 100) {
    msg = '🎉 مبارك! أكملتَ خطتك التعليمية. اطلب شهادتك الآن.';
    type = 'success';
  } else if (stats.accuracy >= 90) {
    msg = '🔥 متميز! دقتك عالية جداً. استمر في التألق.';
    type = 'success';
  } else if (stats.accuracy >= 70) {
    msg = '👏 أحسنت! أداؤك جيد. استمر للوصول للتميز.';
    type = 'success';
  } else if (stats.accuracy >= 50) {
    msg = '💪 لا بأس! راجع نقاط ضعفك وعُد أقوى. "إن\' مع العسر يُسراً"';
    type = 'info';
  } else if (stats.totalExams > 0) {
    msg = '📚 لا تيأس! العلم يحتاج صبراً. راجع الدروس وحاول مجدداً.';
    type = 'warning';
  } else {
    msg = '✨ ابدأ رحلتك العلمية الآن... "من سار على الدرب وصل"';
    type = 'info';
  }

  banner.textContent = msg;
  banner.className = 'motivation-banner ' + type;
}

/* =========================
   EXAMS TABLE
========================= */
function renderExamsTable(exams) {
  const tbody = document.getElementById('examsBody');

  if (!exams || exams.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-msg">لم تُجرِ أي اختبار بعد</td></tr>';
    return;
  }

  // عرض الاختبارات من الأحدث للأقدم
  const sorted = [...exams].reverse();

  tbody.innerHTML = sorted.map((exam, index) => {
    const date = exam.date ? new Date(exam.date).toLocaleDateString('ar-SA') : 'غير معروف';
    const total = exam.total || 0;
    const correct = exam.score || exam.correct || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = percent >= 60;
    const isCert = exam.isCertificate || (percent >= 70 && total >= 20);

    // زر طباعة الشهادة
    let printBtn = '-';
    if (isCert && exam.certId) {
      printBtn = `<button onclick="printCertificate('${exam.certId}')" class="print-btn" title="طباعة الشهادة">🖨️</button>`;
    }

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${date}</td>
        <td>${total}</td>
        <td>${correct}</td>
        <td>${percent}%</td>
        <td><span class="badge ${passed ? 'badge-pass' : 'badge-fail'}">${passed ? 'ناجح' : 'أعد المحاولة'}</span></td>
        <td>${printBtn}</td>
      </tr>
    `;
  }).join('');
}

/* =========================
   PRINT CERTIFICATE
========================= */
function printCertificate(certId) {
  const saved = localStorage.getItem('fiqh_certificates_list');
  if (!saved) {
    alert('❌ لا توجد شهادات محفوظة');
    return;
  }

  let certsList = [];
  try { certsList = JSON.parse(saved); } catch(e) { return; }

  const cert = certsList.find(c => c.id === certId);

  if (!cert) {
    alert('❌ الشهادة غير موجودة');
    return;
  }

  const certUrl = 'certificate.html' +
    '?name=' + encodeURIComponent(cert.name) +
    '&score=' + cert.score +
    '&total=' + cert.total +
    '&id=' + cert.id;

  window.open(certUrl, '_blank');
}

/* =========================
   GUEST VIEW
========================= */
function showGuestView() {
  document.querySelector('.dashboard-container').innerHTML = `
    <div class="guest-msg">
      <h2>👤 مرحباً زائراً</h2>
      <p>سجّل دخولك لحفظ تقدمك وعرض تحليل أدائك</p>
      <a href="index.html" class="guest-btn">تسجيل الدخول</a>
    </div>
  `;
}