import axios from "axios";
export async function PostData(url: string, data: any) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function GetData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

        
