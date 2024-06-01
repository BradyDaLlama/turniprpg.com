import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    let params = request.nextUrl.searchParams;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get('code') || '';

    if (request.nextUrl.pathname === '/api/discord/login') {
        if (!code) {
            return NextResponse.redirect(new URL('/api/discord', request.url));
        }

    }
}

export const config = {
    matcher: ['/api/discord/login'],
};
