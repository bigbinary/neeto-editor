import CryptoJS from "crypto-js";

const md5FromFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const binary = CryptoJS.lib.WordArray.create(event.target.result);
      resolve(CryptoJS.MD5(binary));
    };

    reader.onerror = () => reject(new Error("Corrupted file"));
    reader.readAsArrayBuffer(file);
  });

export const generateChecksum = async file => {
  const md5 = await md5FromFile(file);
  const checksum = md5.toString(CryptoJS.enc.Base64);

  return checksum;
};
