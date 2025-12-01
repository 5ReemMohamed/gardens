document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("greenForm");

    // Inputs
    const fields = {
        name: { el: document.getElementById("name"), regex: /^[\u0600-\u06FFa-zA-Z ]{3,}$/ },
        address: { el: document.getElementById("address"), regex: /^.{3,}$/ },
        email: { el: document.getElementById("email"), regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { el: document.getElementById("phone"), regex: /^[0-9]{9,15}$/ },
        message: { el: document.getElementById("message"), regex: /^.{5,}$/ }
    };

    // Function to show/hide error
    function validateField(fieldObj) {
        const value = fieldObj.el.value.trim();
        const errorMsg = fieldObj.el.nextElementSibling;

        if (value === "" || !fieldObj.regex.test(value)) {
            errorMsg.classList.remove("d-none");
            fieldObj.el.classList.add("is-invalid");
            return false;
        } else {
            errorMsg.classList.add("d-none");
            fieldObj.el.classList.remove("is-invalid");
            return true;
        }
    }

    // Live validation
    Object.values(fields).forEach(f => {
        f.el.addEventListener("input", () => validateField(f));
    });

    // Submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let allValid = true;

        Object.values(fields).forEach(f => {
            if (!validateField(f)) allValid = false;
        });

        if (!allValid) return;

        // WhatsApp message
        const phoneNumber = "966548959972";
        const text =
            `الاسم: ${fields.name.el.value}\n` +
            `العنوان: ${fields.address.el.value}\n` +
            `البريد: ${fields.email.el.value}\n` +
            `الجوال: ${fields.phone.el.value}\n` +
            `الرسالة: ${fields.message.el.value}`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, "_blank");

        // Success alert
        Swal.fire({
            title: "تم الإرسال بنجاح!",
            text: "تم إرسال الرسالة عبر واتساب.",
            icon: "success",
            confirmButtonText: "حسناً"
        });

        form.reset();
    });

});