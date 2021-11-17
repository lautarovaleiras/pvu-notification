import cron from 'node-cron';
import { PvuService } from '../services/pvu.service.js';
import { TelegramService } from '../services/telegram.service.js';

export class Controller {
  static cache = null;
  /**
   *  Check if pvu has action to do
   *  if not, do nothing
   *  else, send message to telegram
   */
  static async schedulePVUNotification() {
    // https://crontab.guru/every-1-hour
    cron.schedule('0 * * * *', () => {
      console.log('Running Cron Job');
      PvuService.getPvuLandStatus().then((res) => {
        // handle success
        const {data,total} = res.body;
       
        const canHarvest = [];
        const needWater = [];
        const hasCrow = [];
        const hasSeed = [];

        for (const farmingPlant of data) {
          if (farmingPlant.totalHarvest > 0) {
            canHarvest.push(farmingPlant._id);
          }
          if (farmingPlant.needWater) {
            needWater.push(farmingPlant._id);
          }
          if (farmingPlant.hasCrow) {
            hasCrow.push(farmingPlant._id);
          }
          if (farmingPlant.hasSeed) {
            hasSeed.push(farmingPlant._id);
          }
        }
        console.log({
          canHarvest,
          needWater,
          hasCrow,
          hasSeed,
        });
        this.cache = {
          harvest: canHarvest,
          water: needWater, 
          crow: hasCrow
        }

        /** Send message to telegram */
        try {
          if (canHarvest.length > 0) {
            TelegramService.sendMessage(`${canHarvest.length}/${total} can harvest`);
          }

          if (needWater.length > 0) {
            TelegramService.sendMessage(`${needWater.length}/${total} need water`);
          }

          if (hasCrow.length > 0) {
            TelegramService.sendMessage(`${hasCrow.length}/${total} has crow`);
          }

          if (hasSeed.length > 0) {
            TelegramService.sendMessage(`${hasSeed.length}/${total} has seed`);
          }
        } catch (error) {
          console.error(error);
        }
      });

    });
  }

  static async listenTelegram() {
    TelegramService.hears(this.cache);
  }
}
