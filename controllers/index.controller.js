import cron from 'node-cron';
import request from 'request';
import { PvuService } from '../services/pvu.service.js';
import { TelegramService } from '../services/telegram.service.js';

export class Controller {
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
            canHarvest.push(farmingPlant.plantId);
          }
          if (farmingPlant.needWater) {
            needWater.push(farmingPlant.plantId);
          }
          if (farmingPlant.hasCrow) {
            hasCrow.push(farmingPlant.plantId);
          }
          if (farmingPlant.hasSeed) {
            hasSeed.push(farmingPlant.plantId);
          }
        }
        console.log({
          canHarvest,
          needWater,
          hasCrow,
          hasSeed,
        });

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
}
