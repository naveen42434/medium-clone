import {Link} from "react-router-dom";
import clsx from 'clsx';

interface BlogCardProps {
    id : number
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate}:BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex items-center space-x-2">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} size={6}/>
            </div>
            <div className="font-extralight text-sm">
                {authorName}
            </div>
            <Circle/>
            <div className="font-thin text-slate-500 text-sm">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-bold pt-2 text-gray-800 text-2xl">
            {title}
        </div>
        <div className="overflow-hidden text-gray-600 text-base font-normal leading-5">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className="h-1 w-1 bg-gray-400 rounded-full"/>
}
export function Avatar({ name, size = 6 }: { name: string; size?: number }) {
    const sizeInPx = `${size * 4}px`; // Tailwind uses 1 unit = 4px

    return (
        <div
            className={clsx(
                'relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full'
            )}
            style={{ width: sizeInPx, height: sizeInPx }}
        >
      <span className="font-medium text-white dark:text-gray-300">
        {name[0].toUpperCase()}
      </span>
        </div>
    );
}