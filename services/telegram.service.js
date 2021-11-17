import { Telegraf } from "telegraf";
import { PvuService } from "./pvu.service.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export class TelegramService {


    static async sendMessage(message) {
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    }

    // walcome telegram message to get telegram chatId 
    static async getChatId(){   
        bot.command('start', ctx => {
            console.log(ctx.from)
            bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
            })
        })
    }

    // bot hears
    static async hears(plants) {
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

        bot.action('harvest', ctx => { 
            let plantsToHarvest = plants? plants.harvest : [];
            if (plantsToHarvest.length === 0)
                return bot.telegram.sendMessage(ctx.chat.id, 'no plants to harvest');

            PvuService.harvestAll().then(() => {
                bot.telegram.sendMessage(ctx.chat.id, 'all plants harvested');
            }).catch(err => {
                console.log(err);
            });
        });

        bot.action('water', ctx => { 
            let plantList = plants? plants.water : [];
            if (plantList.length === 0)
                return bot.telegram.sendMessage(ctx.chat.id, 'no plants to water');

            let proms = [];
            plantList.forEach(id => {
                proms.push(PvuService.toolAction(id,3));
            });
            Promise.all(proms).then(() => {
                bot.telegram.sendMessage(ctx.chat.id, ` has been watered`);
            }).catch(err => {
                console.log(err);
            });
        });

        bot.action('crow', ctx => { 
            let plantList = plants? plants.crow : [];

            if (plantList.length === 0)
                return bot.telegram.sendMessage(ctx.chat.id, 'no crows to scare');

            let proms = [];
            plantList.forEach(id => {
                proms.push(PvuService.toolAction(id,4));
            });

            Promise.all(proms).then(() => {
                bot.telegram.sendMessage(ctx.chat.id, ` crows has been scared`)
            }).catch(err => {
                console.log(err)
            });
        });

        bot.launch({});
    }

    
}