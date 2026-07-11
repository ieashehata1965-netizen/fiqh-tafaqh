// ======================================
// نظام الدخول السري للإدارة
// الضغط 7 مرات على شعار المنصة
// ======================================

console.log("admin-auth.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM Loaded");

    const trigger = document.getElementById("secretAdminTrigger");

    console.log(trigger);

    if (!trigger) {
        console.error("لم يتم العثور على العنصر secretAdminTrigger");
        return;
    }

    // قراءة القيم المحفوظة
    let clickCount = Number(sessionStorage.getItem("adminClickCount")) || 0;
    let firstClickTime = Number(sessionStorage.getItem("adminFirstClick")) || 0;

    trigger.addEventListener("click", function (e) {

        // منع انتقال الرابط
        e.preventDefault();

        console.log("Click");

        const now = Date.now();

        // إعادة العد إذا مر أكثر من 5 ثوانٍ
        if (firstClickTime === 0 || (now - firstClickTime) > 5000) {
            clickCount = 1;
            firstClickTime = now;
        } else {
            clickCount++;
        }

        // حفظ القيم
        sessionStorage.setItem("adminClickCount", clickCount);
        sessionStorage.setItem("adminFirstClick", firstClickTime);

        console.log("Count =", clickCount);

        // للتجربة فقط
        alert("Count = " + clickCount);

        // فتح الإدارة بعد 7 ضغطات
        if (clickCount >= 7) {

            console.log("Opening admin");

            // تصفير العد
            sessionStorage.removeItem("adminClickCount");
            sessionStorage.removeItem("adminFirstClick");

            window.location.href = "admin.html";
        }

    });

});
