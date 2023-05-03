// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'

type Stock = {
  id: string
  name: string
}

export async function getServerSideProps(context: { resolvedUrl: any; }) {

    try {
        const host = 'localhost:8080';
        const protocol = 'http';
        const stock = await fetch(`${protocol}://${host}/stock/1`)
            .then(data => data.json());
        return {
            props: {
                stock,
            }
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                stock: [],
            }
        };
    }
}