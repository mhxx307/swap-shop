import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

type Data = {
    name: string;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    return new Promise((resolve) => {
        req.headers.cookie = '';
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: false,
        });
        proxy.once('proxyRes', () => {
            resolve(true);
        });
    });
}
