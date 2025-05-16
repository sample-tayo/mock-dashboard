// helper function to generate a random image URL based on category
export const getCategoryImage = (category: string): string => {
  const imageMap: Record<string, string[]> = {
    Electronics: [
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop",
    ],
    Clothing: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop",
    ],
    "Home & Kitchen": [
      "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?w=500&h=500&fit=crop",
    ],
    Books: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop",
    ],
    Toys: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop",
    ],
    Sports: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&h=500&fit=crop",
    ],
    Beauty: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=500&fit=crop",
    ],
    Health: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&h=500&fit=crop",
    ],
  };

  // default image if category not found
  const defaultImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  ];

  const images = imageMap[category] || defaultImages;
  return images[Math.floor(Math.random() * images.length)];
};
