import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import React from "react";
async function addProduct(formData: FormData) {
  "use server";
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const user = await prisma.adminuser.findMany({
    where: { email: email },
  });
  if (user.length > 0) {
    if (user[0].password == password) {
      cookies().set("Userlog", "true");
      redirect("/shopadmin/dash");
    }
  } else {
    console.log("no user");
  }
}
const page = () => {
  return (
    <div className="h-[100vh]">
      <h1>Login to Admin</h1>
      <div className="mt-5">
        <form action={addProduct}>
          <label className="input-bordered input flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Enter your Email"
              required
              name="email"
            />
          </label>

          <label className="input-bordered input mt-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Enter your Password"
              name="password"
              required
            />
          </label>
          <button className="btn-primary btn-block btn mt-4" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
