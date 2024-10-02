import axios from "axios";
import { dbInstance } from "../db";

export const validateToken = async (): Promise<boolean> => {
  const users = await dbInstance.getData("users");
  const userWithToken = users.find((user: any) => user.token);

  if (!userWithToken) {
    return false;
  }

  try {
    const response = await axios.get("https://eternalai.fly.dev/user/check-token", {
      headers: {
        Authorization: `Bearer ${userWithToken.token}`,
      },
    });
    return response.status === 200;
  } catch (error: any) {
    if (error.response?.status === 401) {
      await dbInstance.deleteData("users", userWithToken.id);
      return false;
    }
  }

  return false;
};
