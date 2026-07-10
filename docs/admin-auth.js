// ======================================
// نظام الدخول السري للإدارة
// الضغط 7 مرات على شعار المنصة
// ======================================

console.log("admin-auth.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    const trigger = document.getElementById("secretAdminTrigger");

    if (!trigger) {
        console.error("لم يتم العثور على العنصر secretAdminTrigger");
        return;
    }

    let clickCount = 0;
    let firstClickTime = 0;

    trigger.addEventListener("click", function (e) {

        const now = Date.now();

        if (firstClickTime === 0 || (now - firstClickTime) > 5000) {
            clickCount = 1;
            firstClickTime = now;
        } else {
            clickCount++;
        }

        if (clickCount >= 7) {

            e.preventDefault();

            clickCount = 0;
            firstClickTime = 0;

            window.location.href = "admin.html";
        }

    });

});
