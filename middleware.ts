import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verifica se está na página de login
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // Verifica se está tentando acessar o dashboard ou outras rotas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Aqui você pode adicionar sua lógica de verificação
    // Por enquanto, vamos apenas verificar se existe um cookie de autenticação
    const isAuthenticated = request.cookies.get('isAuthenticated');
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}; 