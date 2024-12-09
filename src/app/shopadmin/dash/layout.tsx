import React from "react";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4">
          {/* Navbar */}
          <div className="navbar w-full bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn-ghost btn-square btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Ecom-Dash</div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a href="/shopadmin/dash/add-product">Add Product</a>
                </li>
                <li>
                  <a href="/shopadmin/dash/add-category">Add Category</a>
                </li>
              </ul>
            </div>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/shopadmin/dash/add-product">Add Product</a>
            </li>
            <li>
              <a href="/shopadmin/dash/add-category">Add Category</a>
            </li>
            <li>
              <a href="/shopadmin/dash/new-orders">New Orders</a>
            </li>
            <li>
              <a href="/shopadmin/dash/done-orders">Orders</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LayoutProvider;
