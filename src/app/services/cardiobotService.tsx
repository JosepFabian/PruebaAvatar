import axios from "axios";

// Definir tipos para la respuesta
interface Food {
  food_id: string;
  food_name: string;
  food_description: string;
}

interface FoodsResponse {
  foods: {
    food: Food[];
  };
}

const API_BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const CLIENT_ID = "TU_CLIENT_ID"; // Reemplaza con tu Client ID
const CLIENT_SECRET = "TU CLIENT_SECRET"; // Reemplaza con tu Client Secret

// Función para obtener el token de acceso
const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      "https://oauth.fatsecret.com/connect/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null;
  }
};

// Función para obtener información nutricional de un alimento
export const getInfoByFood = async (food: string): Promise<Food[]> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("No se pudo obtener el token de acceso.");
  }

  try {
    const response = await axios.get<FoodsResponse>(API_BASE_URL, {
      params: {
        method: "foods.search",
        format: "json",
        search_expression: food,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Retorna los alimentos encontrados o un array vacío si no hay datos
    return response.data.foods?.food || [];
  } catch (error) {
    console.error("Error al obtener información nutricional:", error);
    return [];
  }
};
