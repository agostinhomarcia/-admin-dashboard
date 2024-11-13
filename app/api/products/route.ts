import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price || !body.stock) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const price = Number(body.price);
    const stock = Number(body.stock);

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: price,
        stock: stock,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const product = await prisma.product.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
    },
  });

  return NextResponse.json(updatedProduct);
}
