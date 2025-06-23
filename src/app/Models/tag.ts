

export interface Tag {
    id: number;
    name: string;
  
    // Optional if you're fetching related PostTags, adjust based on your needs
    postTags?: PostTag[];
  }
  
  export interface PostTag {
    id: number;
    postId: number;
    tagId: number;
    createdAt: string; // or Date if you parse it
    tag?: Tag; // Optional if you want to include tag details
     }

