import mongoose from "mongoose";

const { Schema } = mongoose;

// Створюємо схему для дозволів
const permissionsSchema = new Schema({
  create: { type: Boolean, default: true },
  read: { type: Boolean, default: true },
  update: { type: Boolean, default: true },
  delete: { type: Boolean, default: true },
});

const userTypeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
    trim: true,
  },
  pagesPermissions: {
    users: permissionsSchema,
    products: permissionsSchema,
    usersTypes: permissionsSchema,
  },
});
// Функція для перевірки та встановлення значень permissionsSchema
function setDefaultPermissions(pagesPermissions) {
  const defaultPermissions = {
    create: false,
    read: true,
    update: false,
    delete: false,
  };

  if (!pagesPermissions) {
    return {
      users: defaultPermissions,
      products: defaultPermissions,
      usersTypes: defaultPermissions,
    };
  }
  pagesPermissions.users = {
    create: pagesPermissions.users?.create ?? defaultPermissions.create,
    read: pagesPermissions.users?.read ?? defaultPermissions.read,
    update: pagesPermissions.users?.update ?? defaultPermissions.update,
    delete: pagesPermissions.users?.delete ?? defaultPermissions.delete,
  };

  pagesPermissions.products = {
    create: pagesPermissions.products?.create ?? defaultPermissions.create,
    read: pagesPermissions.products?.read ?? defaultPermissions.read,
    update: pagesPermissions.products?.update ?? defaultPermissions.update,
    delete: pagesPermissions.products?.delete ?? defaultPermissions.delete,
  };

  pagesPermissions.usersTypes = {
    create: pagesPermissions.usersTypes?.create ?? defaultPermissions.create,
    read: pagesPermissions.usersTypes?.read ?? defaultPermissions.read,
    update: pagesPermissions.usersTypes?.update ?? defaultPermissions.update,
    delete: pagesPermissions.usersTypes?.delete ?? defaultPermissions.delete,
  };

  return pagesPermissions;
}

// Додаємо pre-findOneAndUpdate middleware для перевірки та встановлення значень
userTypeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.pagesPermissions) {
    update.pagesPermissions = setDefaultPermissions(update.pagesPermissions);

    this.setUpdate(update);
  }
  next();
});
const userType = mongoose.model("Type", userTypeSchema);
export default userType;
