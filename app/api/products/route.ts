import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
    }
  });
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const product = await prisma.product.findUnique({
    where: {
      id: body.id
    }
  });

  if (!product) {
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      { status: 404 }
    );
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: body.id
    },
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
    }
  });

  return NextResponse.json(updatedProduct);
}