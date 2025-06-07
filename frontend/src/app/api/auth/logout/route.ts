import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  res.headers.append(
    'Set-Cookie',
    serialize('idToken', '', {
      path: '/',
      maxAge: 0,
    }),
  );
  return res;
}
