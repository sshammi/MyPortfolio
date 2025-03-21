import { model, Schema } from 'mongoose';
import { TBlogPost } from './blog.interface';
const BikePostSchema = new Schema<TBlogPost>({
   title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: true, 
  },
});

const Blog = model<TBlogPost>('Blog', BikePostSchema);

export default Blog;
