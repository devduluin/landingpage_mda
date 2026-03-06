export default function formatWhatsappNumber(phone: string) {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.slice(1);
    }

    return cleaned;
}