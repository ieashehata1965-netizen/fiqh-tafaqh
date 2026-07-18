# Fiqh Tafaquh Platform TODO

## Organization

- [x] Create archive folder
- [x] Create documentation folder
- [x] Document project structure
- [x] Create development roadmap


## Improvements

- [ ] Separate CSS files from HTML files
- [ ] Separate JavaScript files from HTML files
- [ ] Create assets folder
- [ ] Create images and icons folders
- [ ] Create settings.json file


## Question Management

- [ ] Improve question editing
- [ ] Add question validation
- [ ] Prevent duplicate questions
- [ ] Backup question database


## Platform Development

- [ ] Improve mobile experience
- [ ] Add statistics dashboard
- [ ] Add user progress tracking
- [ ] Prepare reusable platform template


## Future Template

- [ ] Create academy-platform-template
- [ ] Standardize all educational projects



أعتقد أننا الآن بدأنا ندخل مرحلة تحويل المشروع من موقع يعمل إلى منصة احترافية.

لكن أريد أن نلتزم بالمنهج الذي اتفقنا عليه: لا نكتب أكواد مباشرة، بل نصمم أولًا ثم ننفذ.

المرحلة الأولى: التصميم (Architecture)
آلية الدخول للإدارة
الصفحة الرئيسية
        │
الضغط على شعار 📖 سبع مرات
        │
إظهار نافذة تسجيل الدخول
        │
إدخال كلمة المرور
        │
التحقق منها
        │
إن كانت صحيحة
        │
إنشاء Session
        │
الانتقال إلى raseen-fiqh-admin-2026-X8M4.html
المرحلة الثانية: صلاحيات الجلسة

إذا حاول أي شخص كتابة:

raseen-fiqh-admin-2026-X8M4.html

في شريط العنوان مباشرة، ولم يسجل الدخول...

⬅️ يُعاد تلقائيًا إلى الصفحة الرئيسية.

ونفس الشيء مع:

add-question.html

وكل صفحة إدارية مستقبلًا.

أي أن كلمة المرور ليست مجرد نافذة، بل تنشئ جلسة دخول (Session).

المرحلة الثالثة: لوحة الإدارة

داخل raseen-fiqh-admin-2026-X8M4.html نجعلها لوحة قيادة حقيقية، مثل:

📊 لوحة التحكم

📝 إدارة الأسئلة

📚 إدارة التصنيفات

📈 الإحصائيات

💾 النسخ الاحتياطي

⚙️ الإعدادات

🚪 تسجيل الخروج

حتى لو كانت بعض البطاقات غير مفعلة الآن، نضعها من البداية لتكون المنصة قابلة للتوسع.

المرحلة الرابعة: تسجيل الخروج

عند الضغط على:

🚪 تسجيل الخروج

يحدث:

حذف الـ Session.
العودة إلى index.html.
يصبح الدخول للإدارة مستحيلًا حتى إعادة إدخال كلمة المرور.
رأيي في كلمة المرور

في المرحلة الحالية يمكن أن تكون ثابتة داخل JavaScript.

لكن عندما نصل للإصدار الثاني (V2)، أنصح بأن تنتقل إلى:

GitHub Pages + Firebase Authentication

أو

GitHub Pages + Cloudflare Workers

حتى لا تكون كلمة المرور موجودة داخل الكود، لأن أي شخص يستطيع مشاهدة مصدر الصفحة. هذا لا يعني أن الحل الحالي غير مفيد، لكنه ليس حماية حقيقية إذا كان الموقع عامًا.

خطة التنفيذ

أقترح أن نقسم التنفيذ إلى خطوات صغيرة:

✅ الضغط سبع مرات على شعار 📖.
✅ ظهور نافذة كلمة المرور.
✅ إنشاء Session عند نجاح الدخول.
✅ حماية raseen-fiqh-admin-2026-X8M4.html.
✅ حماية add-question.html.
✅ إضافة زر "إدارة الأسئلة" داخل لوحة الإدارة.
✅ إضافة زر "تسجيل الخروج".

هذه الخطة ستجعل نظام الإدارة متينًا وسهل الصيانة والتطوير. وأنا أنصح بأن ننفذها بهذا الترتيب، خطوة بخطوة، مع اختبار كل خطوة قبل الانتقال إلى التي تليها، تمامًا كما نجحنا في حل مشكلة <base target="_blank">.
