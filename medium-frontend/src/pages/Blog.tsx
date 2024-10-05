import {useBlog} from "../hooks";
import {useNavigate, useParams} from "react-router-dom";
import {FullBlog} from "../components/FullBlog.tsx";
import {FullBlogSkeleton} from "../components/FullBlogSkeleton.tsx";
import {useEffect} from "react";

//atomfamilies/selectorfamilies
export const Blog = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    const {id} = useParams();
    const {loading, blog} = useBlog({
        id : id || ""
    });
    if (loading) {
        return <div>
            <FullBlogSkeleton/>
        </div>
    }
    return <div>
        <FullBlog blog={ blog }/>
    </div>
}