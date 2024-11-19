import axios from "axios";

// Definir tipos para la respuesta
interface Food {
  food_id: string;
  food_name: string;
  food_description: string;
}

interface FoodsResponse {
  foods?: {
    food?: Food[];
  };
}

// Constantes de configuración
const API_BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const CLIENT_ID = "c8f06595d3bc4466959495289a6c54a4"; // Reemplaza con tu Client ID
const CLIENT_SECRET = "858a4304a08e4768b7dd6918bc2d9d7c"; // Reemplaza con tu Client Secret

/**
 * Obtiene el token de acceso usando las credenciales de cliente.
 * @returns Token de acceso como string o `null` en caso de error.
 */
const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<{ access_token: string }>(
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
    return response.data.access_token; // Devuelve el token
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null; // Devuelve null si falla
  }
};

/**
 * Busca información nutricional de un alimento usando la API de FatSecret.
 * @param food Nombre o término de búsqueda del alimento.
 * @returns Lista de alimentos encontrados o un array vacío.
 */
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

    // Retorna los alimentos encontrados o un array vacío
    return response.data.foods?.food || [];
  } catch (error) {
    console.error("Error al obtener información nutricional:", error);
    return [];
  }
};
