
import CryptoJS from "crypto-js";

const secretPass = "XkhZG4fW2t2W";
const decrypt = (message = "") => {
  console.log(message,"decfc mdsg22222222");
  if(message !== ""){
    const bytes = CryptoJS.AES.decrypt(message, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(data,"decr daatata");
    return data;
  }else {
    console.log(message,"message probably gonna null");
    return;
  }
}

export default decrypt;