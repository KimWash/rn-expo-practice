import BlogPostView from "@/components/BlogPostVIew";
import { useLocalSearchParams } from "expo-router";

export default function Page(){
  const {id} = useLocalSearchParams();
  return <BlogPostView id={Number(id)}/>
}