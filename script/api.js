/**
 * Асинхронно загружает данные из файла `data.json`.
 *
 * @function fetchData
 * @returns {Promise<Object>} - Промис, который разрешается объектом данных из файла `data.json`.
 *
 * @description
 * Функция выполняет HTTP-запрос методом GET к файлу `data.json` и возвращает его содержимое
 * в виде JavaScript-объекта.
 *
 * @example
 * fetchData().then(data => {
 *   console.log(data); // Выводит содержимое файла data.json
 * });
 */
export async function fetchData() {
  const response = await fetch('data.json');
  return response.json();
}

/**
 * Асинхронно обновляет данные в файле `data.json`.
 *
 * @function updateData
 * @param {Object} data - Объект данных, которые необходимо сохранить в файл `data.json`.
 * @returns {Promise<void>} - Промис, который разрешается после завершения запроса.
 *
 * @description
 * Функция выполняет HTTP-запрос методом PUT для обновления содержимого файла `data.json`.
 * Данные передаются в теле запроса в формате JSON.
 *
 * @throws {Error} - Если запрос завершается с ошибкой, выбрасывается исключение.
 *
 * @example
 * const newData = { name: 'John', age: 30 };
 * updateData(newData).then(() => {
 *   console.log('Данные успешно обновлены!');
 * }).catch(error => {
 *   console.error('Ошибка при обновлении данных:', error);
 * });
 */
export async function updateData(data) {
  const response = await fetch('data.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  return response;
}