import { Controller } from "./controllers/index.controller.js";

const main = () => {

  if (typeof process.env.PVU_TOKEN === 'undefined' ){
    console.warn('environment variable PVU_TOKEN needed, check .env.example');
    return;
  }

  if (typeof process.env.TELEGRAM_BOT_TOKEN === 'undefined') {
    console.warn('environment variable TELEGRAM_BOT_TOKEN needed, check .env.example');
    return;
  }

  if (typeof process.env.TELEGRAM_CHAT_ID === 'undefined') {
    console.warn('environment variable TELEGRAM_CHAT_ID needed, check .env.example');
    return;
  }
  
  Controller.listenTelegram();
  Controller.schedulePVUNotification();


};

main();
