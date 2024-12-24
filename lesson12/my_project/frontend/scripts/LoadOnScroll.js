class LoadOnScroll {
  constructor(containerSelector, baseRoute, itemsPerPage) {
    // Елемент контейнера, де будуть додаватися нові елементи
    this.container = document.querySelector(containerSelector);

    // Базова адреса для завантаження даних (може містити параметри пагінації)
    this.baseRoute = baseRoute;

    // Кількість елементів, що завантажуються за один раз
    this.itemsPerPage = itemsPerPage;

    // Поточна сторінка (починається з 0)
    this.page = 0;

    // Флаг завантаження, щоб запобігти багаторазовим завантаженням
    this.loading = false;

    // Ініціалізація класу
    this.init();
  }

  // Асинхронне завантаження елементів
  async loadItems() {
    // Якщо завантаження вже відбувається, виходимо
    if (this.loading) return;

    // Встановлюємо прапор завантаження
    this.loading = true;

    try {
      // Розкоментуйте цей код, якщо завантажуєте дані з API
      const response = await fetch(
        `${this.baseRoute}?page=${this.page}&limit=${this.itemsPerPage}`
      );
      const items = await response.json();

      // Генеруємо тестові елементи для демонстрації
      // const items = new Array(this.itemsPerPage)
      //   .fill({ name: "Тестовий елемент" }) // Задайте значення для властивості name
      //   .map((item, ind) => ({
      //     name: `${ind + this.page * this.itemsPerPage}) ${item.name}`,
      //   }));

      // Додаємо завантажені елементи до контейнера
      items.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.name; // Адаптуйте під структуру ваших даних
        this.container.append(div);
      });

      // Збільшуємо номер сторінки для наступного завантаження
      this.page++;
    } catch (error) {
      console.error("Помилка завантаження елементів:", error);
    } finally {
      // Знімаємо прапор завантаження незалежно від успіху чи помилки
      this.loading = false;
    }
  }

  // Ініціалізація класу
  init() {
    // Завантажуємо першу порцію елементів
    this.loadItems();

    // Додаємо обробник події прокручування для підвантаження нових елементів
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        this.loadItems();
      }
    });
    /*
Цей вираз використовується для визначення, чи користувач прокрутив сторінку до кінця або майже до кінця. Ось пояснення кожного значення:

- window.innerHeight: Висота видимої області вікна браузера (висота вікна перегляду).
- window.scrollY: Відстань, на яку сторінка була прокручена вертикально від верхньої частини.
- document.body.offsetHeight: Повна висота документа, включаючи видиму частину та ту, що знаходиться за межами видимої області (висота всього контенту на сторінці).
- 100: Відступ у 100 пікселів від нижньої частини документа. Це робиться для того, щоб завантаження нових даних починалося трохи раніше, ніж користувач досягне самого кінця сторінки.
 */
  }
}
