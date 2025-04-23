import { useRouter } from "next/router";
import { generatePDF } from "../utils/pdfGenerator";
import Image from "next/image";

const EventMain = ({ isAuthenticated, eventData }) => {
    const router = useRouter();

    if (!eventData) {
        return <p>Нет данных о мероприятии.</p>;
    }

    // Сохранение PDF
    const handleSavePDF = () => {
        generatePDF(eventData);
    };

    return (
        <div className="event-main">
            <h1>{isAuthenticated ? "Ваше мероприятие" : "Неавторизованное мероприятие"}</h1>

            {/* Предупреждение для неавторизованных */}
            {!isAuthenticated && (
                <p>
                    Вы не авторизованы. Чтобы сохранить данные, зарегистрируйтесь или войдите в
                    аккаунт.
                </p>
            )}

            {/* Блоки с поздравляемыми */}
            <div className="celebrities">
                {eventData.celebrities.map((celebrity, index) => (
                    <div key={index} className="celebrant-block">
                        <h2>{celebrity.name}</h2>
                        <p>Возраст: {celebrity.age}</p>
                        {celebrity.avatar && <Image src={celebrity.avatar} alt={celebrity.name} />}
                        <button>Добавить подарок</button>
                    </div>
                ))}
            </div>

            {/* Кнопки */}
            {!isAuthenticated && (
                <>
                    <button onClick={() => router.push("/auth/register")}>
                        Зарегистрироваться
                    </button>
                    <button onClick={handleSavePDF}>Сохранить PDF</button>
                </>
            )}

            {isAuthenticated && (
                <button>Опубликовать список пожеланий</button>
            )}
        </div>
    );
};

export default EventMain;