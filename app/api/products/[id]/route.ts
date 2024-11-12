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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = products.findIndex(p => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      { status: 404 }
    );
  }

  products = products.filter(p => p.id !== params.id);
  return NextResponse.json({ success: true });
} 