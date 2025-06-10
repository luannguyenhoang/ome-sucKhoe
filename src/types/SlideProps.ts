export interface SlideProps {
    post: {
      title: string;
      slug: string;
      category?: string;
      categories?: string[];
      date: string;
      views?: number;
      image?: string;
      featured_image?: string;
      author?: string;
    };
  }