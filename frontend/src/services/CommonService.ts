
import { Data } from "@/types";
import util from "../lib/utils";
import axios from "axios";

export default class CommonService {
  listAll(data: Data, url: string, requestType: string) {
    
    const activity = Object.keys(data).reduce((object: Data, key:string) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest(process.env.NEXT_PUBLIC_API_BASEURL + url, requestType, true, activity).then(
      (response:any) => {
        return response;
      },
      (error:any) => {
        throw error;
      }
    );
  }
  

  async addFlow(payload: any) {
    const config = {
      headers: {
        content: "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      const response: any = await axios.post(process.env.NEXT_PUBLIC_API_BASEURL + "/flows", payload, config);
      if (response.error) {
        throw new Error(response.err);
      } else {
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  }

  async getSingleNode(dataId:string, url:string) {
    return util.sendApiRequest(process.env.NEXT_PUBLIC_API_BASEURL + "/single-flow" + dataId, "GET", true,{})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

}
