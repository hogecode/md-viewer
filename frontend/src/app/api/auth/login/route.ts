import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  const res = NextResponse.json({ message: 'Login success' });
  res.headers.append(
    'Set-Cookie',
    serialize('idToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    }),
  );

  return res;
}
