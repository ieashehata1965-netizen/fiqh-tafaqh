دليل هندسة منصة التدريب الفقهي
Fiqh Training Platform Architecture Guide

وليس مجرد جدول أسماء ملفات، بل "خريطة عقلية" للمشروع.

المستوى الأول (Root Level)
الملف / المجلد	File / Folder	الوظيفة الرئيسية	Main Purpose	متى أعدل فيه؟
index.html	Home Page	الصفحة الرئيسية للمنصة	Main Landing Page	عند تعديل الصفحة الرئيسية
training.html	Training Engine	تشغيل الاختبارات والأسئلة	Runs quizzes and exams	عند تطوير الاختبارات
raseen-fiqh-admin-2026-X8M4.html	Admin Dashboard	لوحة الإدارة	Administration Panel	عند إضافة أدوات إدارية
add-question.html	Question Editor	إدخال الأسئلة الجديدة	Add/Edit Questions	عند إضافة أسئلة
certificate.html	Certificate Generator	إنشاء الإفادة	Generates Certificate	عند تعديل تصميم الإفادة
verify.html	Certificate Verification	التحقق من الإفادات	Verify Certificate	عند تطوير نظام التحقق
fiqh-questions.json	Question Database	قاعدة بيانات الأسئلة	Question Database	عند إضافة أو تعديل الأسئلة
README.md	Documentation	شرح المشروع	Project Documentation	عند تحديث المشروع
PROJECT-STRUCTURE.md	Architecture Guide	وصف هيكل المشروع	Project Structure	عند إضافة مجلدات جديدة
المجلد Archive
المجلد	وظيفته
archive	يحتفظ بالملفات القديمة أو النسخ الاحتياطية ولا يدخل في تشغيل المنصة

بالإنجليزية

Archive Folder

Stores old versions, backups, deprecated files, or experimental code.

المجلد Assets

هذا هو مستودع كل الملفات المساعدة.

assets/css

العربي

جميع ملفات التصميم والألوان والخطوط.

الإنجليزي

Contains all Cascading Style Sheets (CSS) responsible for layout, colors, typography, responsiveness, and visual appearance.

assets/js

العربي

جميع ملفات JavaScript الخاصة بالمنصة.

الإنجليزي

Contains all JavaScript files responsible for application logic and interactivity.

assets/images

العربي

يحفظ جميع الصور.

الإنجليزي

Stores all images used throughout the platform.

assets/icons

العربي

يحفظ الأيقونات والشعارات.

الإنجليزي

Stores icons, logos, favicons and SVG graphics.

docs

العربي

وثائق المشروع.

لا تؤثر إطلاقًا على تشغيل الموقع.

الإنجليزي

Project documentation only.

Contains guides, manuals, architecture documents and development notes.

الآن ننتقل إلى مستوى أعمق
index.html

هذه أهم صفحة في المشروع.

وظيفتها ليست عرض شكل جميل فقط.

بل هي:

الصفحة التي يفتحها المستخدم أولًا.
نقطة الدخول إلى النظام.
تعرض نبذة عن المنصة.
تنقل المستخدم إلى التدريب.
تنقل المستخدم إلى الإدارة (إن كان مخولًا).
تعرض الإحصائيات.
تعرض أحدث الأخبار.
تعتبر واجهة المشروع.

يمكن تشبيهها في Oracle Fusion بـ

Home Dashboard

أو

Navigator

training.html

هذا هو قلب المشروع الحقيقي.

وظيفته:

قراءة ملف JSON
اختيار الأسئلة
عرض السؤال
حساب الوقت
احتساب الدرجات
إظهار النتيجة
إرسال البيانات للشهادة

يشبه في Oracle شاشة

Transaction Processing

raseen-fiqh-admin-2026-X8M4.html

مركز التحكم.

وظيفته:

إدارة النظام.
مراجعة البيانات.
أدوات الصيانة.
الإعدادات.

يشبه

System Administration

add-question.html

هذه ليست صفحة تدريب.

بل هي شاشة إدخال بيانات.

مثل شاشة

Create Item

في Oracle.

فهي تكتب داخل قاعدة الأسئلة.

fiqh-questions.json

هذا الملف هو قاعدة البيانات الحالية.

بدلاً من وجود MySQL أو Oracle Database.

فإن جميع الأسئلة مخزنة هنا.

لو حذف هذا الملف...

لن يجد النظام أي سؤال.

certificate.html

هذا الملف مسئول عن:

إنشاء الإفادة.
إدراج الاسم.
إدراج الدرجة.
إدراج QR.
رقم الإفادة.
الطباعة.
المستخدم

        │

        ▼

index.html

        │

        ▼

training.html

        │

        ▼

fiqh-questions.json

        │

        ▼

حساب النتيجة

        │

        ▼

certificate.html

        │

        ▼

verify.html

وأرى أننا لا ينبغي أن نتوقف عند هذا الحد

أقترح أن نصنع وثيقة احترافية اسمها:

الدليل الهندسي لمنصة التدريب الفقهي (Engineering Manual)

تكون مرجعًا دائمًا لك، وتشمل:

شرح كل ملف.
شرح كل مجلد.
شرح كل دالة (Function).
شرح كل متغير مهم.
كيف تتواصل الملفات مع بعضها.
دورة انتقال البيانات بين الصفحات.
خريطة كاملة للمشروع (Architecture Diagram).
قائمة بالأماكن الآمنة للتعديل والأماكن التي لا ينبغي تعديلها إلا بحذر.
سجل التعديلات (Change Log) لتوثيق أي تطوير مستقبلي.

وبذلك تمتلك وثيقة تضاهي ما يوجد في المشاريع الاحترافية، وتصبح قادرًا على إدارة المنصة وتطويرها بثقة حتى دون أن تكون مبرمجًا محترفًا. وأعتقد أن خبرتك الإدارية والتنفيذية ستجعل هذا الدليل أكثر قيمة لك من حفظ تفاصيل الأكواد نفسها، لأنه يركز على فهم النظام وإدارته لا مجرد كتابة الشيفرة.

fiqh-tafaqh/
│
├── docs/
│   ├── PROJECT-STRUCTURE.md
│   ├── ENGINEERING-MANUAL.md
│   ├── FILES-REFERENCE.md
│   ├── DATA-FLOW.md
│   ├── DEVELOPMENT-RULES.md
│   ├── CHANGELOG.md
│   ├── ROADMAP.md
│   └── UI-STYLE-GUIDE.md
│
├── assets/
├── archive/
├── index.html
├── training.html
...
ثم يكون دور كل ملف كالتالي:

الملف	الغرض
PROJECT-STRUCTURE.md	هيكل المشروع والمجلدات والملفات.
ENGINEERING-MANUAL.md	الدليل الهندسي الكامل للمنصة (كيف تعمل المنصة من الداخل).
FILES-REFERENCE.md	شرح وظيفة كل ملف ومجلد بالعربية والإنجليزية.
DATA-FLOW.md	كيف تنتقل البيانات بين الصفحات والملفات.
DEVELOPMENT-RULES.md	قواعد التطوير وما يجوز وما لا يجوز تعديله.
CHANGELOG.md	سجل جميع التعديلات والإصدارات.
ROADMAP.md	خطة التطوير المستقبلية.
UI-STYLE-GUIDE.md	دليل الألوان والخطوط والتصميم.

FILES-REFERENCE.md يكون لكل ملف صفحة كاملة مثل:
# index.html

## الاسم
الصفحة الرئيسية

## Name
Home Page

## الوظيفة
تمثل نقطة الدخول الرئيسية للمنصة.

## المسؤوليات
- عرض الصفحة الرئيسية.
- التنقل بين الصفحات.
- تحميل ملفات CSS.
- تحميل ملفات JavaScript.

## يعتمد على
assets/css/
assets/js/

## الملفات المرتبطة
training.html
certificate.html

## لا تقم بتعديل
أكواد JavaScript المرتبطة بالتنقل إلا إذا كنت تعلم تأثيرها.
docs/

01-Architecture
02-Development
03-User-Guide
04-Administration
05-Images
06-Diagrams
07-Releases
وبذلك يصبح مشروعك موثقًا بالكامل، وهو أمر نادر حتى في كثير من المشاريع مفتوحة المصدر.

من واقع خبرتك في التدقيق الداخلي

أنت تعلم أن النظام القوي لا يعتمد فقط على جودة التنفيذ، بل على جودة التوثيق أيضًا. تمامًا كما أن نظام الرقابة الداخلية لا يكتمل بالسياسات وحدها، بل بالإجراءات والخرائط والنماذج. مشروعك يستحق أن يُدار بنفس الاحترافية.

وأقترح أن نجعل docs بمثابة "دليل تشغيل وصيانة المنصة" (Platform Operations & Engineering Handbook)، بحيث يستطيع أي مطور أو حتى أنت بعد سنوات فهم المشروع بالكامل دون الحاجة إلى تتبع الأكواد سطرًا بسطر. أعتقد أن هذه ستكون واحدة من أهم الإضافات للمشروع، وربما أكثر قيمة من كثير من الأكواد نفسها.
