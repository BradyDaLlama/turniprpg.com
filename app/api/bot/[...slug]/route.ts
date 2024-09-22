import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = Array.from(params.slug).join('/');
    let queryParams = new URLSearchParams(request.url.split('?')[1]) as URLSearchParams | string;
    queryParams = queryParams.toString();
    if (queryParams) queryParams = `?${queryParams}`;

    const response = await fetch(`${process.env.EXTERNAL_API}/${slug}${queryParams}`, {
        cache: 'no-store',
    }).then((res) => res.json());

    return NextResponse.json(response);
}
