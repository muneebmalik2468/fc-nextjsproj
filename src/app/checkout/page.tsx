import React from "react";
import { getCart } from "@/lib/db/cart";
import CartEntry from "../cart/CartEntry";
import { setProductQuantity } from "../cart/actions";
import { formatPrice } from "@/lib/format";
import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

async function addOrder(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const phnno = formData.get("number")?.toString();
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;
  if (!name || !address || !phnno) {
    throw Error("Missing required fields");
  }

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity + 180,
    0
  );
  const lastorder = await prisma.order.findMany({
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
  var ordercode = 1;
  if (lastorder.length >= 1) {
    ordercode = lastorder[0].orderid + 1;
  }
  console.log(lastorder);
  const order = await prisma.order.create({
    data: {
      name,
      adsress: address,
      phnno,
      totalAmount,
      orderid: ordercode,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  redirect("/thanks");
}

export default async function ProductPage() {
  const cart = await getCart();

  return (
    <div className="flex w-full">
      <form className="flex w-full" action={addOrder}>
        <div className="w-60 flex-1">
          <input
            required
            type="text"
            placeholder="name"
            name="name"
            className="input-bordered input mb-3 w-full"
          />
          <textarea
            className="textarea-bordered textarea mb-3 w-full"
            placeholder="Full address"
            name="address"
            required
          ></textarea>
          <div className="flex items-center">
            <button
              id="dropdown-phone-button"
              data-dropdown-toggle="dropdown-phone"
              className="z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100  "
              type="button"
            >
              +92{" "}
            </button>

            <label
              htmlFor="phone-input"
              className="text-gray-90 sr-only mb-2 text-sm font-medium"
            >
              Phone number:
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="phone-input"
                name="number"
                aria-describedby="helper-text-explanation"
                className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="319-0000-000"
                required
              />
            </div>
          </div>
        </div>
        <div className="w-40 flex-1">
          <h1 className="mb-6 text-3xl font-bold">Review your Cart</h1>
          {cart?.items.map((cartItem) => (
            <CartEntry
              cartItem={cartItem}
              key={cartItem.id}
              setProductQuantity={setProductQuantity}
            />
          ))}
          {!cart?.items.length && <p>Your cart is empty.</p>}
          <div className="sm:items-left items-left flex flex-col">
            <p className="mb-3 font-bold">
              Products Total: {formatPrice(cart?.subtotal || 0)}
            </p>
            <p className="mb-3 font-bold">Local Tax: {formatPrice(0)}</p>
            <p className="mb-3 font-bold">
              Delivery Charges: {formatPrice(180)}
            </p>
            <p className="mb-3 font-bold">
              Total Charges: {formatPrice(cart?.subtotal + 180 || 0)}
            </p>
            <button className="btn-primary btn sm:w-[200px]" type="submit">
              Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
