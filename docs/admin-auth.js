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
    let clickCount = 0;
    let firstClickTime = 0;
console.log("clickCount initialized");
   trigger.addEventListener("click", function (e) {
    console.log("Click");

    const now = Date.now();

    if (firstClickTime === 0 || (now - firstClickTime) > 5000) {
        clickCount = 1;
        firstClickTime = now;
    } else {
        clickCount++;
    }

    alert("Count = " + clickCount);

    console.log("Count =", clickCount);

    if (clickCount >= 7) {

        console.log("Opening admin");

        e.preventDefault();

        clickCount = 0;
        firstClickTime = 0;

        window.location.href = "admin.html";
    }

};   // ← نهاية trigger.onclick

});   // ← نهاية document.addEventListener
