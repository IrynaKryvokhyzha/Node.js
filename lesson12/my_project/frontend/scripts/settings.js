const menuItems = [
  { href: "index.html", text: "Головна", meta: { requireAuth: false } },
  {
    href: "products/list.html",
    text: "Продукти",
    meta: { requireAuth: false, pageId: "products" },
  },
  {
    href: "users/list.html",
    text: "Користувачі",
    id: "users-link",
    meta: { requireAuth: true, pageId: "users" },
  },
  {
    href: "auth/login.html",
    text: "Вхід",
    id: "auth-link",
    meta: { requireAuth: false },
  },
];
