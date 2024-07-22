import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = Array.from(params.slug).join('/');
    const response = await fetch(`${process.env.EXTERNAL_API}/${slug}`, {
        cache: 'no-store',
    }).then((res) => res.json());

    return NextResponse.json(response);
}
