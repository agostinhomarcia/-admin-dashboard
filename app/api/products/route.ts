import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

let products: Product[] = [
  {
    id: '1',
    name: 'Produto Exemplo 1',
    price: 99.99,
    stock: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Produto Exemplo 2',
    price: 149.99,
    stock: 15,
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProduct: Product = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  const body: Product = await request.json();
  const index = products.findIndex(p => p.id === body.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      { status: 404 }
    );
  }

  products[index] = { ...products[index], ...body };
  return NextResponse.json(products[index]);
}