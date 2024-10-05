import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../config.ts";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState({
        username : "",
        name : "",
        password : ""
    });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup" ? "signup" : "signin" }`, postInputs);
                const jwt = response.data;
                localStorage.setItem("token",jwt);
                localStorage.setItem("username", postInputs.username)
                navigate("/blogs");
        } catch (e){
            alert("Error while Signup ")
        }
    }

    return <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="font-bold text-3xl">
                                Create an Account
                            </div>

                            <div className="text-slate-500">
                                {type=="signin" ? "Don't have an account?" : "Already have an account?"}
                                <Link className="underline pl-2" to={type=="signin" ? "/signup" : "/signin"}>{type== "signin" ? "Sign up" : "Sign in"}</Link>
                            </div>
                        </div>

                        <div className="pt-4">
                            {type=="signup" ? <LabelledInput label="Name" placeholder="abc" onChange={(e)=>{
                                setPostInputs(c => ({
                                    ...c,
                                    name : e.target.value
                                }))
                            }}/>  : null}

                             <LabelledInput label="Username" placeholder="m@example.com" onChange={(e)=>{
                                setPostInputs(c => ({
                                    ...c,
                                    username : e.target.value
                                }))
                            }}/>

                            <LabelledInput label="Password" type={"password"} placeholder="12345" onChange={(e)=>{
                                setPostInputs(c => ({
                                    ...c,
                                    password : e.target.value
                                }))
                            }}/>

                            <Button onClick={sendRequest} label={type=="signin" ? "Sign in" : "Sign up"}/>
                        </div>
                    </div>
                </div>
    </div>
}

interface LabelledInputType{
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input type={type || "text"} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

function Button({label,onClick}:{label:string,onClick: () => void }){
    return <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">{label}</button>
}