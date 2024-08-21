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
            "sign in": "Sign in",
            // admin category
            "add category": "Add Category",
            "upload image": "Upload image",
            "category information": "Add your category information",
            "category name": "Name",
            "cancel": "Cancel",
            "create category": "Create category",
            "update category": "Update category",
            // admin restaurants
            "add restaurant": "Add restaurant",
            "add your restaurant information": "Add your restaurant information",
            "name": "Name",
            "cuisine": "Cuisine",
            "delivery price": "Delivery price",
            "delivery minute": "Delivery minute",
            "address": "Address",
            "create restaurant": "Create Restaurant",
            // admin product
            "product desc": "Add your Product description and necessary information",
            "description": "Description",
            "price": "Price",
            "restaurant": "Restaurant",
            // admin offer
            "add offer": "Add Offer",
            "add your offer info": "Add your offer information",
            "title": "Title",
            "create offer": "Create offer",
            // client navbar
            "navbar home": "Home",
            "navbar restaurants": "Restaurants",
            "navbar about us": "About us",
            "navbar how it works": "How it works",
            "navbar faqs": "FAQs",
            "navbar search": "search",
            "navbar sign up": "Sign up",
            // mobile navbar
            "navbar profile": "Profile",
            "navbar your basket": "Your Basket",
            "navbar your orders": "Your Orders",
            "navbar checkout": "Checkout",
            "navbar logout": "Logout",
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
            "sign in": "Daxil olun",
            // admin category
            "add category": "Kateqoriya əlavə edin",
            "upload image": "Şəkil yükləyin",
            "category information": "Kateqoriyanın məlumatlarını daxil edin",
            "category name": "Ad",
            "cancel": "Ləğv et",
            "create category": "Kateqoriya yarat",
            "update category": "Kateqoriya yenilə",
            // admin restaurants
            "add restaurant": "Restoran əlavə et",
            "add your restaurant information": "Restoran məlumatlarını əlavə et",
            "name": "Ad",
            "cuisine": "Mətbəx",
            "delivery price": "Çatdırılma qiyməti",
            "delivery minute": "Çatdırılma müddəti",
            "address": "Ünvan",
            "create restaurant": "Restoran yarat",
            // admin product
            "product desc": "Məhsulunuzun təsvirini və vacib məlumatları əlavə edin",
            "description": "Xarakteristika",
            "price": "Qiymət",
            "restaurant": "Restoran",
            // admin offer
            "add offer": "Təklif əlavə et",
            "add your offer info": "Təklif haqqında məlumat əlavə et",
            "title": "Başlıq",
            "create offer": "Təklif yarat",
            // client navbar
            "navbar home": "Ana Səhifə",
            "navbar restaurants": "Restoranlar",
            "navbar about us": "Haqqımızda",
            "navbar how it works": "Necə işləyir",
            "navbar faqs": "FAQs",
            "navbar search": "axtar",
            "navbar sign up": "Qeydiyyat",
            // mobile navbar
            "navbar profile": "Profiliniz",
            "navbar your basket": "Səbətiniz",
            "navbar your orders": "Sifarişləriniz",
            "navbar checkout": "Checkout",
            "navbar logout": "Çıxış",
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