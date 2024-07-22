import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = Array.from(params.slug).join('/');
    const response = await fetch(`${process.env.EXTERNAL_API}/${slug}`, {
        next: {
            revalidate: 60,
        },
    }).then((res) => res.json());

    return NextResponse.json(response);
}
