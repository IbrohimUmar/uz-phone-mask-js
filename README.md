# uz-phone-mask-js 🇺🇿

O'zbekiston telefon raqamlari formatini (+998) boshqarish uchun eng yengil, aqlli va xavfsiz JavaScript yechimi. 
Minimalist, smart, and secure JavaScript phone mask for Uzbekistan phone numbers.

---

## 🇺🇿 Yo'riqnoma

Ushbu kutubxona loyihalaringizda telefon raqamlarini kiritish jarayonini (UX) yaxshilash va xatolarni kamaytirish uchun yaratilgan.

### ✨ Imkoniyatlari
- **Zero Dependencies:** Hech qanday tashqi kutubxonalarsiz (jQuery, Inputmask va h.k.) ishlaydi. 
- **Aqlli Validatsiya:** `required` (majburiy) va ixtiyoriy maydonlarni avtomatik farqlaydi.
- **Qat'iy Filtr:** Raqam bo'lmagan (harf, belgi) tugmalarni yozilishidan oldin to'sadi.
- **Prefiks Himoyasi:** Foydalanuvchi `+998 ` qismini o'chira olmaydi yoki o'zgartira olmaydi.
- **Kursor Nazorati:** Kursor har doim prefiksdan keyingi to'g'ri pozitsiyada turishini ta'minlaydi.
- **Edit Rejimi:** Bazadan kelgan har qanday formatdagi raqamni avtomatik `+998 901234567` holatiga keltiradi.

### 🛠 Ishlatish

1. Inputingizga `data-phone-mask` atributini qo'shing:
```html
<input type="tel" data-phone-mask required name="phone1" value="+998 ">

<input type="tel" data-phone-mask name="phone2" value="+998 ">
```

2. Ma'lumotni bazaga saqlashdan oldin quyidagicha tozalash tavsiya etiladi:
```
import re

def clean_phone_number(raw_phone):
    # Faqat raqamlarni ajratib olish: "998901234567"
    clean = "".join(filter(str.isdigit, raw_phone))
    # Agar raqam to'liq bo'lsa qaytarish, aks holda None
    return clean if len(clean) == 12 else None
```


----
# uz-phone-mask-js 🇺🇿

The lightest, smartest, and most secure JavaScript solution for managing Uzbekistan phone number formats (+998).
Minimalist, smart, and secure JavaScript phone mask for Uzbekistan phone numbers.

---
This library is designed to improve the user experience (UX) and minimize errors during phone number entry in your web projects.

### ✨ Key Features
- **Zero Dependencies:** Works purely with Vanilla JavaScript—no jQuery or external plugins required.
- **Smart Validation:** Automatically distinguishes between `required` and optional fields.
- **Strict Filtering:** Instantly blocks non-digit characters (letters, symbols) before they appear on the screen.
- **Prefix Protection:** Ensures the `+998 ` prefix remains intact and cannot be deleted or modified.
- **Precision Cursor Control:** Guarantees the cursor is always positioned correctly after the prefix.
- **Edit-Ready:** Seamlessly handles pre-filled data from your database, automatically formatting any raw input into `+998 901234567`.

### 🛠 Usage

1. Add the `data-phone-mask` attribute to your HTML input:
```html
<input type="tel" data-phone-mask required name="phone1" value="+998 ">

<input type="tel" data-phone-mask name="phone2" value="+998 ">
```

2. It is recommended to clean the data in your backend (Python/Django example) before saving it to the database:
```
import re

def clean_phone_number(raw_phone):
    # Extract digits only: "998901234567"
    clean = "".join(filter(str.isdigit, raw_phone))
    # Return number if fully filled, otherwise return None
    return clean if len(clean) == 12 else None
```



---

📄 License
MIT License. Feel free to use this in personal or commercial projects.

Developed by Ibrohim 🚀




