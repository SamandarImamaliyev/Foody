import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "add product": "Add Product",
            "dashboard": "Dashboard",
            "products": "Products",
            "restaurants": "Restaurants",
            "category": "Category",
            "orders": "Orders",
            "order history": "Order History",
            "offers": "Offers",
            "logout": "Logout",
            // dashboard
            "ordersOfDashboard": "Orders",
            "totalSalary": "Total Salary",
            "assignedRisks": "Assigned Risks",
            "risk message": "There are no risks no assigned",
            "assigned action items": "Assigned Action Items.",
            "action message": "There are no action items assigned.",
            // admin login
            "welcome admin": "Welcome Admin",
            "username": "Username",
            "password": "Password",
            "sign in": "Sign in"
        }
    },
    az: {
        translation: {
            "add product": "Məhsul əlavə et",
            "dashboard": "İdarə Paneli",
            "products": "Məhsullar",
            "restaurants": "Restoranlar",
            "category": "Kateqoriya",
            "orders": "Sifarişlər",
            "order history": "Sifariş Tarixçəsi",
            "offers": "Təkliflər",
            "logout": "Çıxış",
            // dashboard
            "ordersOfDashboard": "Sifarişlər",
            "totalSalary": "Toplam Maaş",
            "assignedRisks": "Təyin Edilmiş Risklər",
            "risk message": "Təyin edilmiş risk yoxdur.",
            "assigned action items": "Təyin edilmiş Fəaliyyətlər",
            "action message": "Təyin edilmiş fəaliyyət yoxdur.",
            // admin login
            "welcome admin": "Xoş gəldin, Admin",
            "username": "İstifadəçi adı",
            "password": "Şifrə",
            "sign in": "Daxil olun"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;