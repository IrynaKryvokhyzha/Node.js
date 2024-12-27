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
    this.query = "";
    //this.sort = "price:asc";
    // Флаг завантаження, щоб запобігти багаторазовим завантаженням
    this.loading = false;
    this.noMoreProducts = false; // Flag to check if all products are loaded
    // Ініціалізація класу
    this.init();
  }

  // Асинхронне завантаження елементів
  async loadItems() {
    // Якщо завантаження вже відбувається, виходимо
    if (this.loading || this.noMoreProducts) return;
    // Встановлюємо прапор завантаження
    this.loading = true;

    try {
      // Розкоментуйте цей код, якщо завантажуєте дані з API
      const response = await fetch(
        //   `/api/v1${this.baseRoute}?page=${this.page}&limit=${this.itemsPerPage}`
        `http://localhost:3000/api/v1/products?page=${this.page}&limit=${this.itemsPerPage}&${this.query}`
      );
      console.log("response-=-=-=-==--", response);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch products. HTTP Status: " + response.status
        );
      }
      const resData = await response.json();
      console.log("resData-=-=-=-==--", resData);
      if (!resData.data || !resData.data.documents) {
        throw new Error("Invalid data format or no products found.");
      }

      // Додаємо завантажені елементи до контейнера
      let productsList = resData.data?.documents;
      let count = resData.data?.count;
      console.log("productsList==================", productsList);
      console.log("count==================", count);
      console.log("productsList.length==================", productsList.length);
      // If no products were returned, stop further loading
      if (productsList.length === count) {
        this.noMoreProducts = true; // Set flag to stop loading
        console.log("No more products to load.");
      }
      // Обробка зображень продуктів
      productsList.forEach((prod) => {
        if (prod.image && !prod.image.startsWith("data:"))
          prod.image = "data:image;base64," + prod.image;
      });
      // Створення таблиці продуктів
      const grid = GridDataManager.createGridFromList(productsList);
      this.container.append(grid);

      // Збільшуємо номер сторінки для наступного завантаження
      this.page++;
      console.log("Current Page:", this.page);
    } catch (error) {
      console.error("Помилка завантаження елементів:", error);
    } finally {
      // Знімаємо прапор завантаження незалежно від успіху чи помилки
      this.loading = false;
    }
  }
  setQuery(query) {
    this.query = query;
  }
  resetPage() {
    this.page = 0;
    this.noMoreProducts = false; // Reset the noMoreProducts flag
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
