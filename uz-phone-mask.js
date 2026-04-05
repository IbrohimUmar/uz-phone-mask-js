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
        // Prefiksni tekshirish va faqat raqamlarni ajratish
        let val = this.el.value.startsWith(this.prefix) ? this.el.value : this.prefix;
        let digits = val.substring(this.prefix.length).replace(/\D/g, '').substring(0, 9);

        this.el.value = this.prefix + digits;
        const len = this.el.value.length;

        // 3. Brauzer darajasidagi validatsiya (Required/Non-required)
        if (this.isRequired) {
            // Majburiy bo'lsa: 14 ta belgi shart
            this.el.setCustomValidity(len < 14 ? "Telefon raqamini to'liq kiriting." : "");
        } else {
            // Ixtiyoriy bo'lsa: Yo faqat "+998 ", yo to'liq 14 ta belgi
            this.el.setCustomValidity((len > 5 && len < 14) ? "Raqamni oxirigacha kiriting yoki bo'sh qoldiring." : "");
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
