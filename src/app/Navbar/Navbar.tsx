import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { prisma } from "@/lib/db/prisma";
import { orderBy } from "lodash";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  const cates = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start sm:flex-row">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              {cates.map((cate) => {
                return (
                  <li>
                    <a href={`/cate/${cate.id}`}>{cate.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <a className="btn-ghost btn text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {cates.map((cate) => {
              return (
                <li>
                  <a href={`/cate/${cate.id}`}>{cate.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end ">
          <div className="flex-none gap-2">
            <form action={searchProducts}>
              <div className="form-control sm:hidden">
                <input
                  name="searchQuery"
                  placeholder="Search"
                  className="input-bordered input w-full min-w-[100px]"
                />
              </div>
            </form>
            <ShoppingCartButton cart={cart} />
          </div>
        </div>
      </div>
      {/* <div className="bg-base-100">
        <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <Link href="/" className="btn-ghost btn text-xl normal-case">
              <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
              Flowmazon
            </Link>
          </div>
          <div className="flex-none gap-2">
            <form action={searchProducts}>
              <div className="form-control">
                <input
                  name="searchQuery"
                  placeholder="Search"
                  className="input-bordered input w-full min-w-[100px]"
                />
              </div>
            </form>
            <ShoppingCartButton cart={cart} />
            <UserMenuButton session={session} />
          </div>
        </div>
      </div> */}
    </>
  );
}
