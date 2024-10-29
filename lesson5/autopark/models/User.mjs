import dataFileManager from "../utils/DataFileManager.mjs";

class User {
  static loadUserList() {
    try {
      return dataFileManager.loadData();
    } catch (error) {
      throw new Error("Failed to load user! ");
    }
  }
  static create(userObj) {
    console.log("===== userObj");
    console.log(userObj);

    try {
      dataFileManager.addItem({ id: new Date().getTime(), ...userObj });
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }
  static getUserById(id) {
    try {
      return dataFileManager.getItemById(id);
    } catch (error) {
      throw new Error("Failed to get user by id!");
    }
  }
  static updateUser(id, UserData) {
    console.log("==== UserData");
    console.log(UserData);

    try {
      dataFileManager.updateItemById(id, UserData);
    } catch (error) {
      throw new Error("ОFailed to update user!");
    }
  }
  static deleteUserById(id) {
    try {
      dataFileManager.deleteItemById(id);
    } catch (error) {
      throw new Error("Failed to delete user!");
    }
  }
}

export default User;
