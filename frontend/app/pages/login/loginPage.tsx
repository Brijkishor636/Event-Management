"use client";

import { BottomWarming } from "@/app/components/common/BottomWarming";
import { Button } from "@/app/components/common/Button";
import { Heading } from "@/app/components/common/Heading";
import { InputBox } from "@/app/components/common/InputBox";
import UserContext from "@/app/provider/userContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import imgBackground from "../../../assets/login/welcome_bg.jpg"

export default function LoginPage() {
  const context = useContext(UserContext);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const url = process.env.NEXT_PUBLIC_BACKEND_URL!;
  async function doLogin(e: any) {
    e.preventDefault();
    let response;
    try {
      if(loginData.username.trim() === ""){
          return toast.warning("Please enter username!!",{
            position: "top-center"
          })
      }
      if(loginData.password.trim() === ""){
          return toast.warning("Please enter password!!",{
            position: "top-center"
          })
      }
      response = await axios.post(
        `${url}/api/v1/user/signin`,
          loginData,
        { withCredentials: true }
      );
      //@ts-ignore
      context?.setUser(response.data?.user)
      //@ts-ignore
      toast.success(response.data?.msg, {
        position: "top-center"
      })
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      //@ts-ignore
      toast.error(error?.response?.data.msg, {
        position: "top-center"
      })
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      <div className="relative w-1/2 hidden lg:flex items-center justify-center text-2xl font-bold text-white">
        <Image
          src={imgBackground}
          alt="Welcome Background"
          fill
          priority
          className="object-cover -z-10 opacity-85"
        />
        <div className="relative z-10 text-center px-6 text-2xl text-white">
          Hi there, Welcome to Event Manager
        </div>
      </div>
      <div className="flex justify-center items-start h-screen sm:items-center pt-65 sm:pt-0 w-full lg:w-1/2 bg-pink-50">
      <div className="w-80 h-max border p-5 bg-gradient-to-br from-gray-50 to-pink-50 border-gray-400 rounded-xl">
        <form action="#!" onSubmit={doLogin}>
        <div className="text-center">
          <Heading label="Login"/>
          <InputBox onChange={(e)=>{ 
            setLoginData({
              ...loginData,
              username: e.target.value
            })
          }} label="Username" placeholder="abc@gmail.com" type="text"/>
          <InputBox onChange={(e)=>{
            setLoginData({
              ...loginData,
              password: e.target.value
            })
          }} label="Password" placeholder="password" type="password"/>
          <Button name="Signin"/>
          <BottomWarming label="New to Event Manager?" to="/pages/signup" buttonText="Signup"/>
        </div>
        </form>
      </div>
    </div>
    </div>
    
  );
}
