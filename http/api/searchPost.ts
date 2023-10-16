import { ProductResult } from "../../@types";

export const searchPosts = async (searchValue: string) => {
    try {
      const response = await fetch(
        `https://coral-app-8bk8j.ondigitalocean.app/api/product-retrieval/?search=${searchValue}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const posts: ProductResult[] = await response.json();
      const searchResults = posts.filter((post) => post.name.toLowerCase().includes(searchValue.toLowerCase()));

      return searchResults;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error}`);
    }
  };