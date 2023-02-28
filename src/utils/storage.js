import storage from "localforage";

export const getSingleLocalData = async (key) => {
  try {
    const data = storage.getItem(key);
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const getAllLocalData = async () => {
  let appData = [];
  try {
    const appKeys = await storage.keys();
    await Promise.all(
      appKeys.map(async (key) => (appData[key] = await storage.getItem(key)))
    );
    return appData;
  } catch (err) {
    console.log("err: ", err);
    return "";
  }
};

export const saveSingleLocalData = async (key, data) => {
  try {
    await storage.setItem(key, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveMultipleLocalData = async (keys, items) => {
  try {
    await Promise.all(
      keys.map(async (key) => await storage.setItem(key, items[key]))
    );
    return true;
  } catch (err) {
    console.log("err: ", err);
    return "";
  }
};

export const removeSingleData = async (key) => {
  try {
    await storage.removeItem(key);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const removeAllData = async () => {
  try {
    await storage.clear();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
