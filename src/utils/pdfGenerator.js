import { jsPDF } from "jspdf";

export const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.text(`Мероприятие: ${data.title}`, 10, 10);
    doc.text(`Дата: ${data.date}`, 10, 20);

    data.celebrities.forEach((celebrant, index) => {
        doc.text(`Поздравляемый ${index + 1}: ${celebrant.name}`, 10, 30 + index * 20);
        doc.text(`Возраст: ${celebrant.age}`, 10, 40 + index * 20);
    });

    doc.save("event-details.pdf");
};