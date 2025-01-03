import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import fs from "fs";
import { uploadToS3 } from "../../../../lib/s3";
export const metadata = {
  title: "Add product E-commerce",
  description: "Generated by create next app",
};
async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.getAll("url") as File[];
  const categoryID = formData.get("cate")?.toString();
  const price = Number(formData.get("price") || 0);
  const Compareprice = Number(formData.get("Compareprice") || 0);
  const uploadedFilex = [];
  if (
    !name ||
    !description ||
    !price ||
    !categoryID ||
    !Compareprice ||
    imageUrl.length === 0
  ) {
    throw new Error("All fields are required, including at least one image.");
  }

  const uploadedFiles = [];
  for (const file of imageUrl) {
    const buffer = await file.arrayBuffer(); // Convert file to a buffer
    const s3Key = `products/${categoryID}/${Date.now()}-${file.name}`;
    const fileUrl = await uploadToS3(buffer, s3Key, file.type);
    uploadedFilex.push({
      name: file.name,
      key: s3Key,
      url: fileUrl,
    });
  }
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      ComparePrice: Compareprice,
      categoryID,
      imageUrl: {
        create: uploadedFilex.map((file) => ({
          name: file.name,
          url: file.url,
          key: file.key,
        })),
      },
    },
    include: { imageUrl: true },
  });

  redirect("/shopadmin/dash");
  // if (
  //   !name ||
  //   !description ||
  //   !imageUrl ||
  //   !price ||
  //   !categoryID ||
  //   Compareprice
  // ) {
  //   throw Error("Missing required fields");
  // }

  // await prisma.product.create({
  //   data: { name, description, imageUrl, price, categoryID, Compareprice },
  // });
  // redirect("/");
}

const page = async () => {
  const categoies = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          type="text"
          placeholder="name"
          name="name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          className="textarea-bordered textarea mb-3 w-full"
          placeholder="Description"
          name="description"
          required
        ></textarea>
        <select name="cate" className="select-bordered select mb-3 w-full">
          <option value={" "} disabled selected>
            Select category
          </option>
          {categoies.map((cate) => {
            return <option value={cate.id}>{cate.name}</option>;
          })}
        </select>
        <input
          required
          type="file"
          multiple
          placeholder="image url"
          name="url"
          className="input-bordered input mb-3 w-full"
        />

        <input
          required
          type="number"
          placeholder="price"
          name="price"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          type="number"
          placeholder="Compare price"
          name="Compareprice"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-primary btn-block btn" type="submit">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default page;
