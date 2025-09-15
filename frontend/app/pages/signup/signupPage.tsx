"use client"
import Image from "next/image";
import signUpImg from "../../../assets/signup/img_bg_signup.jpg"
import { Heading } from "@/app/components/common/Heading";
import { InputBox } from "@/app/components/common/InputBox";
import { Button } from "@/app/components/common/Button";
import { BottomWarming } from "@/app/components/common/BottomWarming";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpPage(){

    const [signUpdata, setSignUpdata] = useState({
        username: "",
        password: "",
        name: "",
        mobile: ""
    })
    const router = useRouter();

    const url = process.env.NEXT_PUBLIC_BACKEND_URL!;
    async function doSignup(e:any){
        e.preventDefault();
        let response;
        try{
            if(signUpdata.username.trim() === ""){
                return toast.warning("Please enter username!!",{
                    position: "top-center"
                })
            }
            if(signUpdata.password.trim() === ""){
                return toast.warning("Please enter password!!",{
                    position: "top-center"
                })
            }
            response = await axios.post(
            `${url}/api/v1/user/signup`,
              signUpdata,
            { withCredentials: true });
        //@ts-ignore
        toast.success(response.data?.msg, {
                position: "top-center"
            })
            router.push("/pages/login");
        }
        catch(e){
            return toast.error("Error during signup!!", {
                position: "top-center"
            })
        }
           
    }

    return <div className="relative flex w-full min-h-screen bg-gradient-to-r from-black/30 to-black/10">
          <Image
              src={signUpImg}
              alt="Welcome Background"
              fill
              priority
              className="object-cover -z-10 opacity-100 backdrop-blur-sm"
            />
          <div className="relative w-1/2 hidden lg:flex items-center justify-center text-2xl font-bold text-white">
            <div className="relative z-10 text-center px-6 text-3xl text-white">
              Hi there, Welcome to Event Manager
            </div>
          </div>
          <div className="flex justify-center items-start min-h-screen sm:items-center pt-65 sm:pt-0 w-full lg:w-1/2">
          <div className="w-80 h-max border p-5 border-gray-400 rounded-xl backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/30">
            <form action="#!" onSubmit={doSignup}>
            <div className="text-center">
              <Heading label="SignUp"/>
              <InputBox onChange={(e)=>{ 
                setSignUpdata({
                    ...signUpdata,
                    username: e.target.value
                })
              }} label="Username" placeholder="abc@gmail.com" type="text" required/>
              <InputBox onChange={(e)=>{
                setSignUpdata({
                    ...signUpdata,
                    password: e.target.value
                })
              }} label="Password" placeholder="password" type="password" required/>
              <InputBox onChange={(e)=>{
                setSignUpdata({
                    ...signUpdata,
                    name: e.target.value
                })
              }} label="Name" placeholder="John" type="text"/>
              <InputBox onChange={(e)=>{
                setSignUpdata({
                    ...signUpdata,
                    mobile: e.target.value
                })
              }} label="Mobile" placeholder="1234567890" type="text"/>
              <Button name="SignUp"/>
              <BottomWarming label="Already have an account?" to="/pages/login" buttonText="Login"/>
            </div>
            </form>
          </div>
        </div>
        </div>
}