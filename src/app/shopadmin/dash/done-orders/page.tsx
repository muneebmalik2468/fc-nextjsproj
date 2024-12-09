import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
async function addProduct(formData: FormData) {
  "use server";
  const status = formData.get("update")?.toString();
  const id = formData.get("updateid")?.toString();
  if (!status || !id) {
    throw new Error("All fields are required, including at least one image.");
  }
  const updateUser = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      status,
    },
  });
  redirect("/shopadmin/dash/new-orders");
}
const page = async () => {
  const orders = await prisma.order.findMany({
    where: { status: "done" },
    orderBy: { id: "desc" },
    include: {
      items: { include: { product: { include: { imageUrl: true } } } },
    },
  });
  return (
    <div>
      {orders.map((order) => {
        return (
          <div className="card w-full bg-base-100 shadow-xl lg:card-side">
            <figure className="lg:w-6/12">
              <img
                src={order.items[0].product.imageUrl[0].url}
                alt="Album"
                className="w-6/12"
              />
            </figure>
            <div className="card-body lg:w-6/12">
              <h2 className="card-title">#FC00{order.orderid}</h2>
              <ul>
                <li>
                  <h3>
                    <b> Customer Name</b>: {order.name}
                  </h3>
                </li>
                <li>
                  <h3>
                    <b>Phone no </b>:
                    <a href={`tel:${order.phnno}`}> {order.phnno}</a>
                  </h3>
                </li>
                <li>
                  <b>Address: </b>
                  {order.adsress}
                </li>
              </ul>
              <h2 className="text-xl font-bold">Order Detials</h2>
              <ul>
                {order?.items.map((item) => {
                  return (
                    <li>
                      <b>Ordered Item:</b> {item.product.name} x {item.quantity}
                    </li>
                  );
                })}
                <li>
                  <b>items total:</b> Rs.{order.totalAmount - 180}
                </li>
                <li>
                  <b>Delivery Charges:</b> Rs.{180}
                </li>
                <li>
                  <b>total:</b> Rs.{order.totalAmount}
                </li>
              </ul>

              <div className="card-actions justify-end">
                <form action={addProduct}>
                  <input hidden value="done" name="update"></input>
                  <input hidden value={order.id} name="updateid"></input>
                  <button className="btn-primary btn" type="submit" disabled>
                    Fullfil
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
