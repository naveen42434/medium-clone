import {AppBar} from "./AppBar.tsx";

export const FullBlogSkeleton = () => {
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-4xl font-extrabold">
                        <div className="h-10 bg-gray-100 rounded mb-2.5"></div>
                    </div>
                    <div className="text-slate-500 pt-2">
                        <div className="h-4 w-44 bg-gray-100 rounded  mb-2.5"></div>
                    </div>
                    <div className="pt-4">
                        <div className="pb-8"><Loader/></div>
                        <div className="pb-8"><Loader/></div>
                        <div className="pb-8"><Loader/></div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="grid grid-cols-2 gap-1 pr-1 pl-2 w-full">
                        <div className="h-10 w-10 bg-gray-100 rounded-full mb-2.5 justify-self-end"></div>
                        <div>
                            <div className="h-4 bg-gray-100 rounded mb-2.5 max-w-[200px]"></div>
                            <div className="h-4 bg-gray-100 rounded mb-2.5 max-w-[150px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function Loader(){
    return <div>
        <div className="h-5 bg-gray-100 rounded mb-2.5 max-w-[770px]"></div>
        <div className="h-5 bg-gray-100 rounded  mb-2.5 max-w-[780px]"></div>
        <div className="h-5 bg-gray-100 rounded  mb-2.5"></div>
        <div className="h-5 bg-gray-100 rounded  mb-2.5 max-w-[780px]"></div>
        <div className="h-5 bg-gray-100 rounded mb-2.5 max-w-[700px]"></div>
    </div>
}