// ====== Demo Data ======
  let lectures = [
    { id: 1, title: "أحكام صلاة الجمعة", speaker: "الشيخ صالح الفوزان", category: "الفقه", audio: "https://example.com/audio1.mp3", youtube: "", description: "شرح مفصل لأحكام صلاة الجمعة وشروطها وآدابها" },
    { id: 2, title: "التوحيد وأنواعه", speaker: "الشيخ محمد بن صالح العثيمين", category: "العقيدة", audio: "https://example.com/audio2.mp3", youtube: "https://youtube.com/watch?v=abc123", description: "تفسير سورة الإخلاص وبيان معنى التوحيد" },
    { id: 3, title: "تفسير سورة الفاتحة", speaker: "الشيخ عبدالرحمن السديس", category: "التفسير", audio: "", youtube: "https://youtube.com/watch?v=def456", description: "تفسير ميسر لسورة الفاتحة للمبتدئين" },
    { id: 4, title: "أحكام الزكاة", speaker: "الشيخ صالح الفوزان", category: "الفقه", audio: "https://example.com/audio4.mp3", youtube: "", description: "شروط وجوب الزكاة وأنواع الأموال الزكوية" },
    { id: 5, title: "الصحيح من سيرة النبي ﷺ", speaker: "الشيخ محمد بن صالح العثيمين", category: "السيرة", audio: "https://example.com/audio5.mp3", youtube: "https://youtube.com/watch?v=ghi789", description: "سيرة النبي ﷺ منذ الولادة حتى البعثة" },
    { id: 6, title: "آداب الطعام والشراب", speaker: "الشيخ عبدالرحمن السديس", category: "الأخلاق", audio: "https://example.com/audio6.mp3", youtube: "", description: "السنة في الطعام والشراب وآداب المائدة" },
    { id: 7, title: "شرح حديث جبريل", speaker: "الشيخ صالح الفوزان", category: "الحديث", audio: "https://example.com/audio7.mp3", youtube: "https://youtube.com/watch?v=jkl012", description: "شرح حديث جبريل في بيان أركان الإسلام والإيمان" },
    { id: 8, title: "أحكام الحج والعمرة", speaker: "الشيخ محمد بن صالح العثيمين", category: "الفقه", audio: "https://example.com/audio8.mp3", youtube: "", description: "مناسك الحج والعمرة خطوة بخطوة" }
  ];

  let editingId = null;
  let deleteTarget = null;
  let filteredLectures = [...lectures];

  // ====== Login Check ======
  function checkLogin() {
    if (sessionStorage.getItem('admin_access') !== 'granted') {
      window.location.href = 'index.html';
    }
  }
  function logout() {
    sessionStorage.removeItem('admin_access');
    window.location.href = 'index.html';
  }

  // ====== Sidebar Toggle ======
  function toggleSidebar() {
    const side = document.getElementById('side');
    const main = document.getElementById('main');
    const btn = document.getElementById('toggleBtn');
    if (side.classList.contains('collapsed')) {
      side.classList.remove('collapsed');
      main.classList.remove('expanded');
      btn.classList.remove('collapsed');
    } else {
      side.classList.add('collapsed');
      main.classList.add('expanded');
      btn.classList.add('collapsed');
    }
  }

  // ====== Init ======
  function init() {
    checkLogin();
    updateStats();
    updateSpeakerFilter();
    renderList();
  }

  // ====== Stats ======
  function updateStats() {
    document.getElementById('statTotal').textContent = lectures.length;
    document.getElementById('totalBadge').textContent = lectures.length + ' محاضرة';
    document.getElementById('statCats').textContent = [...new Set(lectures.map(l => l.category).filter(Boolean))].size;
    document.getElementById('statSpeakers').textContent = [...new Set(lectures.map(l => l.speaker).filter(Boolean))].size;
    document.getElementById('statWithAudio').textContent = lectures.filter(l => l.audio && l.audio.trim()).length;
    document.getElementById('delAllBtn').style.display = lectures.length > 0 ? 'inline-flex' : 'none';
  }

  function updateSpeakerFilter() {
    const select = document.getElementById('filterSpeaker');
    const currentVal = select.value;
    const speakers = [...new Set(lectures.map(l => l.speaker).filter(Boolean))].sort();
    select.innerHTML = '<option value="">كل الشيوخ</option>' + speakers.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
    select.value = currentVal;
  }

  // ====== Search & Filter ======
  function filterLectures() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const cat = document.getElementById('filterCategory').value;
    const speaker = document.getElementById('filterSpeaker').value;

    filteredLectures = lectures.filter(l => {
      if (cat && l.category !== cat) return false;
      if (speaker && l.speaker !== speaker) return false;
      if (search) {
        const text = (l.title + ' ' + l.speaker + ' ' + l.description + ' ' + l.category).toLowerCase();
        if (!text.includes(search)) return false;
      }
      return true;
    });

    renderList();
  }

  // ====== Render List ======
  function renderList() {
    const list = document.getElementById('lectureList');
    document.getElementById('listCount').textContent = '(' + filteredLectures.length + ')';

    if (filteredLectures.length === 0) {
      list.innerHTML = '<div class="lm-empty"><div class="icon">🎙️</div><p>لا توجد محاضرات مطابقة للبحث</p></div>';
      return;
    }

    list.innerHTML = filteredLectures.map(l => {
      const isEditing = editingId === l.id;
      const hasAudio = l.audio && l.audio.trim();
      const hasYoutube = l.youtube && l.youtube.trim();

      return `
        <div class="lm-lecture-item ${isEditing ? 'editing' : ''}" id="item-${l.id}">
          <div class="item-header">
            <div class="badges">
              <span class="lm-badge-id">#${l.id}</span>
              <span class="lm-badge-cat">${esc(l.category || 'غير مصنف')}</span>
              <span class="lm-badge-speaker">${esc(l.speaker || 'غير محدد')}</span>
            </div>
          </div>
          <div class="title">${esc(l.title)}</div>
          <div class="desc">${esc(l.description || 'لا يوجد وصف')}</div>
          <div class="links">
            ${hasAudio ? `<a href="${esc(l.audio)}" class="lm-link lm-link-audio" target="_blank">🔊 استماع للصوت</a>` : '<span style="color:#9ca3af;font-size:13px;">🔇 لا يوجد رابط صوتي</span>'}
            ${hasYoutube ? `<a href="${esc(l.youtube)}" class="lm-link lm-link-youtube" target="_blank">▶️ يوتيوب</a>` : ''}
          </div>
          <div class="actions">
            ${!isEditing ? `
              <button class="play-btn" onclick="playAudio('${esc(l.audio || '')}')">▶️ تشغيل</button>
              <button class="edit-btn" onclick="startEdit(${l.id})">✏️ تعديل</button>
              <button class="del-btn" onclick="confirmDelete(${l.id})">🗑️ حذف</button>
            ` : ''}
          </div>
          ${isEditing ? renderInlineEdit(l) : ''}
        </div>
      `;
    }).join('');
  }

  function renderInlineEdit(l) {
    return `
      <div class="lm-inline-edit">
        <div class="edit-grid">
          <div class="lm-form-group">
            <label>عنوان المحاضرة</label>
            <input type="text" id="editTitle-${l.id}" value="${esc(l.title)}">
          </div>
          <div class="lm-form-group">
            <label>اسم الشيخ</label>
            <input type="text" id="editSpeaker-${l.id}" value="${esc(l.speaker)}">
          </div>
          <div class="lm-form-group">
            <label>التصنيف</label>
            <select id="editCategory-${l.id}">
              <option value="العقيدة" ${l.category==='العقيدة'?'selected':''}>العقيدة</option>
              <option value="الفقه" ${l.category==='الفقه'?'selected':''}>الفقه</option>
              <option value="التفسير" ${l.category==='التفسير'?'selected':''}>التفسير</option>
              <option value="الحديث" ${l.category==='الحديث'?'selected':''}>الحديث</option>
              <option value="السيرة" ${l.category==='السيرة'?'selected':''}>السيرة</option>
              <option value="الأخلاق" ${l.category==='الأخلاق'?'selected':''}>الأخلاق</option>
              <option value="المنهج" ${l.category==='المنهج'?'selected':''}>المنهج</option>
              <option value="الدعوة" ${l.category==='الدعوة'?'selected':''}>الدعوة</option>
              <option value="منوعات" ${l.category==='منوعات'?'selected':''}>منوعات</option>
            </select>
          </div>
          <div class="lm-form-group">
            <label>رابط الصوت</label>
            <input type="url" id="editAudio-${l.id}" value="${esc(l.audio || '')}">
          </div>
          <div class="lm-form-group">
            <label>رابط يوتيوب</label>
            <input type="url" id="editYoutube-${l.id}" value="${esc(l.youtube || '')}">
          </div>
          <div class="lm-form-group" style="grid-column: 1 / -1;">
            <label>الوصف</label>
            <textarea id="editDesc-${l.id}">${esc(l.description || '')}</textarea>
          </div>
        </div>
        <div class="edit-actions">
          <button class="lm-btn lm-btn-warning" onclick="saveEdit(${l.id})">💾 حفظ التعديل</button>
          <button class="lm-btn lm-btn-outline" onclick="cancelEdit()">❌ إلغاء</button>
        </div>
      </div>
    `;
  }

  // ====== Form Toggle ======
  function toggleForm() {
    const card = document.getElementById('formCard');
    const btn = document.getElementById('toggleFormBtn');
    if (card.classList.contains('show')) {
      card.classList.remove('show');
      btn.innerHTML = '<span>➕</span><span>إضافة محاضرة</span>';
    } else {
      card.classList.add('show');
      btn.innerHTML = '<span>🔽</span><span>إخفاء النموذج</span>';
      clearForm();
    }
  }

  // ====== Get Form Data ======
  function getFormData() {
    const title = document.getElementById('inTitle').value.trim();
    const speaker = document.getElementById('inSpeaker').value.trim();
    const category = document.getElementById('inCategory').value;
    const audio = document.getElementById('inAudio').value.trim();
    const youtube = document.getElementById('inYoutube').value.trim();
    const description = document.getElementById('inDescription').value.trim();

    if (!title) { toast('❌ أدخل عنوان المحاضرة', 'err'); return null; }
    if (!speaker) { toast('❌ أدخل اسم الشيخ', 'err'); return null; }
    if (!category) { toast('❌ اختر التصنيف', 'err'); return null; }

    return { title, speaker, category, audio, youtube, description };
  }

  // ====== Save New ======
  function saveLecture() {
    const data = getFormData();
    if (!data) return;

    const newId = lectures.length > 0 ? Math.max(...lectures.map(l => l.id)) + 1 : 1;
    const lecture = { id: newId, ...data };
    lectures.push(lecture);

    toast('✅ تم إضافة المحاضرة #' + newId, 'ok');
    clearForm();
    updateStats();
    updateSpeakerFilter();
    filterLectures();
  }

  // ====== Edit ======
  function startEdit(id) {
    editingId = id;
    renderList();
    const el = document.getElementById('item-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function saveEdit(id) {
    const title = document.getElementById('editTitle-' + id).value.trim();
    const speaker = document.getElementById('editSpeaker-' + id).value.trim();
    const category = document.getElementById('editCategory-' + id).value;
    const audio = document.getElementById('editAudio-' + id).value.trim();
    const youtube = document.getElementById('editYoutube-' + id).value.trim();
    const description = document.getElementById('editDesc-' + id).value.trim();

    if (!title) { toast('❌ أدخل عنوان المحاضرة', 'err'); return; }
    if (!speaker) { toast('❌ أدخل اسم الشيخ', 'err'); return; }

    const idx = lectures.findIndex(l => l.id === id);
    if (idx !== -1) {
      lectures[idx] = { id, title, speaker, category, audio, youtube, description };
      toast('✅ تم تحديث المحاضرة #' + id, 'ok');
      editingId = null;
      updateStats();
      updateSpeakerFilter();
      filterLectures();
    }
  }

  function cancelEdit() {
    editingId = null;
    renderList();
    toast('❌ تم إلغاء التعديل', 'inf');
  }

  // ====== Delete ======
  function confirmDelete(id) {
    deleteTarget = id;
    const l = lectures.find(x => x.id === id);
    document.getElementById('delMsg').textContent = 'هل أنت متأكد من حذف المحاضرة "' + (l ? l.title : '') + '"؟ لا يمكن التراجع.';
    document.getElementById('delModal').classList.add('show');
  }

  function closeDelModal() {
    document.getElementById('delModal').classList.remove('show');
    deleteTarget = null;
  }

  document.getElementById('confirmDelBtn').onclick = function() {
    if (!deleteTarget) return;
    lectures = lectures.filter(l => l.id !== deleteTarget);
    toast('🗑️ تم حذف المحاضرة #' + deleteTarget, 'inf');
    closeDelModal();
    updateStats();
    updateSpeakerFilter();
    filterLectures();
  };

  function deleteAll() {
    if (!confirm('حذف جميع المحاضرات (' + lectures.length + ')؟ لا يمكن التراجع!')) return;
    lectures = [];
    toast('🗑️ تم حذف جميع المحاضرات', 'inf');
    updateStats();
    updateSpeakerFilter();
    filterLectures();
  }

  // ====== Play Audio ======
  function playAudio(url) {
    if (!url) { toast('🔇 لا يوجد رابط صوتي لهذه المحاضرة', 'warn'); return; }
    window.open(url, '_blank');
  }

  // ====== Export ======
  function exportJSON() {
    const blob = new Blob([JSON.stringify(lectures, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fiqh-lectures.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('📥 تم تصدير ' + lectures.length + ' محاضرة', 'ok');
  }

  // ====== Clear Form ======
  function clearForm() {
    document.getElementById('lectureForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = '➕ إضافة محاضرة جديدة';
    document.getElementById('saveBtn').style.display = 'inline-flex';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
    editingId = null;
  }

  // ====== Toast ======
  function toast(msg, type) {
    const c = document.getElementById('toastWrap');
    const d = document.createElement('div');
    d.className = 'lm-toast ' + (type || 'inf');
    d.textContent = msg;
    c.appendChild(d);
    setTimeout(() => d.remove(), 4000);
  }

  function esc(t) {
    const d = document.createElement('div');
    d.textContent = t || '';
    return d.innerHTML;
  }

  // ====== Modal click outside ======
  document.getElementById('delModal').onclick = function(e) {
    if (e.target === this) closeDelModal();
  };

  // ====== Init ======
  init();
