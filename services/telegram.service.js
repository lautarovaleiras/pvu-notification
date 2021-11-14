import { Telegraf } from "telegraf";
import { PvuService } from "./pvu.service.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export class TelegramService {


    static async sendMessage(message) {
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    }

    // get telegram chatId 
    static async getChatId(){   
        bot.command('start', ctx => {
            console.log(ctx.from)
            bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
            })
        })
    }

    // bot hears
    static async hears(message) {
        let callback;
        console.log('listen telegram ....')
        bot.hears('farm', ctx => {
            console.log(ctx.from) 
            // here the bot will send a message to the user
            let farmMessage = 'hi, here the actions available to do ';
            ctx.deleteMessage();
            bot.telegram.sendMessage(ctx.chat.id, farmMessage, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: 'harvest',
                                callback_data: 'harvest'
                            },
                            {
                                text: 'water',
                                callback_data: 'water'
                            },
                            {
                                text: 'scare crow',
                                callback_data: 'crow'
                            }
                        ],
        
                    ]
                }
            })
        })

        bot.action('water', ctx => { 
            // TODO: get the plant id from first request    
            PvuService.action(id, 3).then(res => {
                console.log(res.status)
                bot.telegram.sendMessage(ctx.chat.id, ` has been watered`)
            }).catch(err => {
                console.log(err)
            })

        })
        bot.action('crow', ctx => { 

            PvuService.action(id, 4).then(res => {
                console.log(res.status)
                bot.telegram.sendMessage(ctx.chat.id, `${res.name} has been watered`)
            }).catch(err => {
                console.log(err)
            })

        })
        bot.launch({});
    }

    
}