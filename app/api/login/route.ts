import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password) {
    
    // Criar resposta
    const response = NextResponse.json({ success: true });
    
    // Definir cookie
    response.cookies.set('isAuthenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } else {
    return NextResponse.json(
      { error: 'Usuário ou senha incorretos' }, 
      { status: 401 }
    );
  }
} 