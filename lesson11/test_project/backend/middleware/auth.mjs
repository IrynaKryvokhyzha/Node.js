import { parseBearer } from "../utils/jwtHelpers.mjs";

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
  // Middleware для налаштування заголовків CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next(); // Передача обробки наступному middleware
  });

  // Middleware для перевірки аутентифікації та авторизації
  app.use(async (req, res, next) => {
    //req = const response = await LoginApiManager.login(formData- прийшла з login.html

    // Відкриті шляхи, які не потребують авторизації
    const openPathes = [
      "/api/v1/auth/login",
      "/api/v1/auth/signup",
      "/api/v1/products",
    ];

    // Перевірка, чи шлях потребує авторизації
    if (!openPathes.includes(req.path)) {
      console.log("req.path===============", req.path);
      try {
        // Парсинг токена та додавання користувача до запиту
        //   const receivedUserData
        req.user = parseBearer(req.headers.authorization, req.headers, [
          "type",
        ]);
        //   req.user = await UsersDBService.getById(receivedUserData.id, ["type"]);
        console.log("req.user==============>>>>>>>>>>>>>>>>>>=", req.user);
      } catch (err) {
        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ result: "This access Denied" });
      }
    } else {
      if (req.headers.authorization) {
        req.user = parseBearer(req.headers.authorization, req.headers);
      }
    }
    next(); // Передача обробки наступному middleware
  });
};

// Middleware для перевірки дозволів
// const getPermissionsChecker = (model) => (requiredPermission) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(403).json({ result: "Permission Denied" });
//     }
// Перевірка, чи є необхідний дозвіл у користувача
//  const hasPermission =
//    req.user?.type?.pagesPermissions[model][requiredPermission];

//  if (hasPermission) {
// next(); // Передача обробки наступному middleware
//  } else {
//    res.status(403).json({ result: "Permission Denied" });
//  }
//   };
// };

// Експорт функції auth як модуля за замовчуванням
export { auth };
