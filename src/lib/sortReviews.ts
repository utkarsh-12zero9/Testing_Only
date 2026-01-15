interface Review {
  customerName: string;
  planID: string;
  businessID: string;
  review?: string;
  issues?: string;
  rating: number;
  createdOn: string;
}

export function getTopReviews(reviews: Review[], limit: number = 10): Review[] {

  const sorted = [...reviews].sort((a, b) => {

    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    
    const dateA = new Date(a.createdOn);
    const dateB = new Date(b.createdOn);
    return dateB.getTime() - dateA.getTime();
  });
  
  return sorted.slice(0, limit);
}
