import { client } from "@/sanity/lib/client";

export async function deleteAllProducts() {
  try {
    const result = await client.delete({
      query: '*[_type == "product"]', // Sab "product" type ke documents delete karega
    });
    console.log("✅ All products deleted successfully:", result);
  } catch (error) {
    console.error("❌ Error deleting products:", error);
  }
}
