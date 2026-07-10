// ======================================
// نظام الدخول السري للإدارة
// الضغط 7 مرات على شعار المنصة
// ======================================

console.log("admin-auth.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM Loaded");

    trigger.style.border = "4px solid red";

    console.log(trigger);

    if (!trigger) {
        console.error("لم يتم العثور على العنصر secretAdminTrigger");
        return;
    }

    let clickCount = 0;
    let firstClickTime = 0;

    trigger.onclick = function (e) {
        
        console.log("Click");

        const now = Date.now();

        if (firstClickTime === 0 || (now - firstClickTime) > 5000) {
            clickCount = 1;
            firstClickTime = now;
        } else {
            clickCount++;
        }

        console.log("Count =", clickCount);

        if (clickCount >= 7) {

            console.log("Opening admin");

            e.preventDefault();

            clickCount = 0;
            firstClickTime = 0;

            window.location.href = "admin.html";
        }

       };

});
