/**
 * PhoneMask - O'zbekiston telefon raqamlari uchun universal JS kutubxonasi.
 * * QANDAY ISHLATILADI (HTML):
 * <input data-phone-mask required name="phone" value="+998 ">
 * * EDIT REJIMIDA QANDAY BERILADI (VALUE):
 * <input data-phone-mask name="phone" value="+998901234567"> 
 * // Eslatma: Value qismida raqamni xohlagan formatda bering, JS uni avtomat to'g'rilaydi.
 */

class PhoneMask {
    constructor(el) {
        this.el = el;
        this.prefix = '+998 ';
        this.isRequired = this.el.hasAttribute('required');

        this.initAttributes();
        this.el.addEventListener('input', () => this.format());
        this.el.addEventListener('click', () => this.ensureCursor());
        this.el.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Sahifa yuklanganda mavjud qiymatni formatlash
        this.format();
    }

    // HTML atributlarini avtomatik sozlash
    initAttributes() {
        this.el.setAttribute('maxlength', '14');
        this.el.setAttribute('pattern', '^(\\+998\\s|\\+998\\s\\d{9})$');
        this.el.setAttribute('type', 'tel');
        this.el.setAttribute('autocomplete', 'off');
    }

    handleKeyDown(e) {
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End'
        ];

        // 1. Maxsus tugmalar va Ctrl/Cmd kombinatsiyalariga ruxsat berish
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
            // Prefiksni o'chirishga urinishni to'sish
            if ((e.key === 'Backspace' || e.key === 'Delete') && this.el.selectionStart <= 5 && this.el.selectionEnd <= 5) {
                e.preventDefault();
            }
            return;
        }

        // 2. FAQAT raqamlarni yozishga ruxsat berish (Harflarni bloklash)
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }

    format() {
        // Prefiksni saqlash va faqat raqamlarni ajratish
        let val = this.el.value.startsWith(this.prefix) ? this.el.value : this.prefix;
        let digits = val.substring(this.prefix.length).replace(/\D/g, '').substring(0, 9);

        this.el.value = this.prefix + digits;
        const len = this.el.value.length;

        // --- VIZUAL VALIDATSIYA QISMI ---
        if (len === 14) {
            // Raqam to'liq kiritildi
            this.el.classList.remove('is-invalid');
            this.el.classList.add('is-valid');
            this.el.setCustomValidity("");
        } else if (len > 5) {
            // Raqam kiritilmoqda lekin hali to'liq emas
            this.el.classList.remove('is-valid');
            this.el.setCustomValidity(len < 14 ? "Telefon raqamini to'liq kiriting." : "");
            // this.el.classList.add('is-invalid');
            // this.el.setCustomValidity(this.isRequired ? "Telefon raqamini to'liq kiriting." : "Raqamni oxirigacha kiriting yoki bo'sh qoldiring.");
        } else {
            // Input bo'sh (faqat prefiks bor)
            this.el.classList.remove('is-invalid', 'is-valid');
            this.el.setCustomValidity(this.isRequired ? "Telefon raqamini kiriting." : "");
        }
    }
    ensureCursor() {
        if (this.el.selectionStart < 5) {
            this.el.setSelectionRange(5, 5);
        }
    }
}

// Avtomatik ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-phone-mask]').forEach(input => new PhoneMask(input));
});
