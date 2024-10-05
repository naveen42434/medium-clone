import {BlogCard} from "../components/BlogCard.tsx";
import {AppBar} from "../components/AppBar.tsx";
import {useBlogs} from "../hooks";
import {BlogSkeleton} from "../components/BlogSkeleton.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Blogs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    const {loading,blogs} = useBlogs();

    if (loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }

    return <div>
        <AppBar/>
    <div className="flex justify-center">
        <div>
            {blogs.map(blog => <BlogCard id={blog.id}
                                         authorName={blog.author.name || "Anonymous"}
                                         title={blog.title}
                                         content={blog.content}
                                         publishedDate="2nd Feb 2024"
            />)}
        </div>
    </div>
    </div>
}