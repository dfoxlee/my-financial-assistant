const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PROD_URL
      : import.meta.env.VITE_DEV_URL;

export const fetchAiCategorizedSuggestions = async (uniqueNames: string[]) => {
   const response = await fetch(`${baseUrl}/transactions/categorize`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueNames }),
   });

   if (!response.ok) {
      throw new Error("Failed to fetch AI categorized suggestions");
   }

   const data = await response.json();
   return data;
};
