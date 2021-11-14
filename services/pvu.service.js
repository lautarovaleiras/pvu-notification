import request from "request";
import axios from "axios";
import util from "util";

export class PvuService {

    //TODO: migrate to axios
   // same error =>  https://github.com/axios/axios/issues/3266
    static async getPvuLandStatus(){   
        let get = util.promisify(request.get)
        let response = get({
        url: 'https://backend-farm.plantvsundead.com/farms?limit=10&offset=0',
        headers: { Authorization: `Bearer ${process.env.PVU_TOKEN}` },
        json: true,  
        })
        return response;
    }

    static async harvestAll(){
        let get = util.promisify(request.get)
        let response = get({
        url: 'https://backend-farm.plantvsundead.com/farms/harvest-all/',
        headers: { Authorization: `Bearer ${process.env.PVU_TOKEN}` },
        json: true,
    })
        return response;
    }
    /**
     * 
     * @param {id} 
     * @param {action} 3 water, 4 crow
     * @returns 
     */
    static async action(id, action){
        let body = {
            farmId: id,
            token: {challenge: "default", seccode: "default", validate: "default"},
            toolId: action // water
        }

        let post = util.promisify(request.post)
        let response = post({
        url: 'https://backend-farm.plantvsundead.com/farms/apply-tool/',
        headers: { Authorization: `Bearer ${process.env.PVU_TOKEN}` },
        json: true,
        body: body
    })
        return response;
    }


}

    

