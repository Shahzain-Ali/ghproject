import React from "react";
import Link from "next/link";

const MyAccount = () => {
  return (
    <div>
      
        <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
          <div className="container md:w-[1170px] mx-auto px-6">
            <h1 className="text-3xl text-center md:text-left font-bold mb-4 md:ml-20">
              My Account
            </h1>
            <div className="flex justify-center md:justify-start items-center gap-2 text-sm md:ml-20">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">My Account</span>
            </div>
          </div>
        </div>



      <section className="py-10 border-2">
        <div className="w-[100%]">
        <div className="w-[370px] customsm:w-[340px]  mx-auto  mb-5 py-9 shadow-lg">
          <div className="text-center">
            <h1 className="font-semibold">Login</h1>
            <p className="text-[#9096B2] text-[12px]">
              Please login using account detail bellow.
            </p>
          </div>
          <div className="text-center">
            <form action="">
              <input
                type="text"
                placeholder="Email Address"
                className="border-2 w-[270px] p-1 text-[12px] my-2"
              />{" "}
              <br />
              <input
                type="password"
                name=""
                id=""
                placeholder="Password"
                className="border-2 w-[270px] p-1 text-[12px]"
              />{" "}
              <br />
              <div className=" w-[270px] mx-auto my-2">
                <p className="text-[#9096B2] text-[12px] text-start">
                  Forgot your password?
                </p>
              </div>
              <button className="bg-[#FB2E86] text-[white] border-2 w-[270px] p-1 text-[12px]">
                Sign in
              </button>
            </form>
            <p className="text-[#9096B2] text-[12px] my-5">
              Don’t have an Account?Create account
            </p>
          </div>
        </div>
        </div>
        <section className="w-auto mb-2 mt-14">
          <img src="/Group_124 (2).png" alt="" className="w-[50%] mx-auto" />
        </section>
      </section>
      
    </div>
  );
};

export default MyAccount;
