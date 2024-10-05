import {AppBar} from "./AppBar.tsx";
import {Blog} from "../hooks";
import {Avatar} from "./BlogCard.tsx";

export const FullBlog = ({ blog }: {blog : Blog}) => {
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-4xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on August 24,2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 textlg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center pr-3">
                            <Avatar name={blog.author.name || "Anonymous"} size={8}/>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random text about the author to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}