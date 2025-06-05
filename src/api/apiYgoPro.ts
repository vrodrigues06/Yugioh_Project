import supabase from "./supabase";

export async function getCartaUrl(cardName: string) {
  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
        cardName,
      )}`,
    );
    const data = await response.json();

    if (!response.ok) throw new Error("Erro ao buscar a carta:");

    if (data.data && data.data.length > 0)
      return data.data[0].card_images[0].image_url;
  } catch (error) {
    if (error instanceof Error) console.error(error.message, error);
  }
}

export async function uploadCartaToSupabase(
  imageUrl: string,
  cardName: string,
) {
  try {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const response = await fetch(proxyUrl + imageUrl);

    if (!response.ok) throw new Error("Erro ao buscar imagem.");

    const blob = await response.blob();
    const fileExt = imageUrl.split(".").pop();
    const fileName = `${Date.now()}${cardName}.${fileExt}`;

    const { error } = await supabase.storage
      .from("cartas")
      .upload(fileName, blob);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("cartas")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Erro ao enviar a imagem para o Supabase:", error);
    return null;
  }
}
