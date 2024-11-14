import { createApi } from "unsplash-js";

// Initialize Unsplash
const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
    fetch: fetch,
});

export async function getImagesByCategory(category: string, count: number = 4) {
    try {
        const result = await unsplash.search.getPhotos({
            query: category,
            perPage: count,
            orientation: "squarish",
        });

        if ("errors" in result) {
            throw new Error("Failed to fetch images");
        }

        return result.response.results.map((photo) => ({
            id: photo.id,
            url: photo.urls.small,
            category,
        }));
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}
