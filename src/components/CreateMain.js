import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreateMain = () => {
    const router = useRouter();
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        numberOfCelebrities: 1,
        celebrities: [{ name: "", age: "", avatar: "" }],
    });

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Добавление блока для нового поздравляемого
    const addCelebrityBlock = () => {
        setEventData((prev) => ({
            ...prev,
            celebrities: [...prev.celebrities, { name: "", age: "", avatar: "" }],
        }));
    };

    // Обновление данных конкретного поздравляемого
    const updateCelebrity = (index, field, value) => {
        setEventData((prev) => {
            const updatedCelebrities = prev.celebrities.map((celebrity, i) =>
                i === index ? { ...celebrity, [field]: value } : celebrity
            );
            return {
                ...prev,
                celebrities: updatedCelebrities,
            };
        });
    };

    // Валидация данных
    const validateData = () => {
        const { title, date, celebrities } = eventData;
        if (!title || title.length > 100) {
            alert("Название мероприятия должно быть указано и не превышать 100 символов.");
            return false;
        }
        if (!date) {
            alert("Дата мероприятия должна быть указана.");
            return false;
        }
        for (let i = 0; i < celebrities.length; i++) {
            const { name, age } = celebrities[i];
            if (!name || !age) {
                alert(`Пожалуйста, заполните данные для поздравляемого ${i + 1}.`);
                return false;
            }
        }
        return true;
    };

    // Отправка данных на сервер
    const handleSubmit = async () => {
        if (!validateData()) return;

        try {
            const response = await axios.post("/api/events", eventData);
            console.log("Мероприятие создано:", response.data);
            router.push("/profile"); // Перенаправление на страницу профиля
        } catch (error) {
            console.error("Ошибка при создании мероприятия:", error);
            alert("Произошла ошибка при создании мероприятия.");
        }
    };

    return (
        <div className="create-main">
            <h1>Создание мероприятия</h1>

            {/* Форма для начальных данных */}
            <form>
                <label>
                    Название мероприятия:
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
                </label>

                <label>
                    Дата мероприятия:
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Количество поздравляемых:
                    <input
                        type="number"
                        name="numberOfCelebrities"
                        value={eventData.numberOfCelebrities}
                        onChange={(e) => {
                            const count = parseInt(e.target.value, 10);
                            setEventData((prev) => ({
                                ...prev,
                                numberOfCelebrities: count,
                                celebrities: Array.from({ length: count }, (_, i) =>
                                    prev.celebrities[i] || { name: "", age: "", avatar: "" }
                                ),
                            }));
                        }}
                        min={1}
                        required
                    />
                </label>
            </form>

            {/* Блоки для поздравляемых */}
            <div className="celebrities">
                {eventData.celebrities.map((celebrity, index) => (
                    <div key={index} className="celebrant-block">
                        <h2>Поздравляемый {index + 1}</h2>

                        <label>
                            Имя:
                            <input
                                type="text"
                                value={celebrity.name}
                                onChange={(e) => updateCelebrity(index, "name", e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Возраст:
                            <input
                                type="number"
                                value={celebrity.age}
                                onChange={(e) =>
                                    updateCelebrity(index, "age", parseInt(e.target.value, 10))
                                }
                                min={0}
                                required
                            />
                        </label>

                        <label>
                            Аватар (URL):
                            <input
                                type="url"
                                value={celebrity.avatar}
                                onChange={(e) => updateCelebrity(index, "avatar", e.target.value)}
                            />
                        </label>
                    </div>
                ))}
            </div>

            {/* Кнопка отправки */}
            <button onClick={handleSubmit}>Создать мероприятие</button>
        </div>
    );
};

export default CreateMain;