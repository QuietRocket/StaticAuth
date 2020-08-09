import type { NowRequest, NowResponse } from '@vercel/node';
import { authCheck, format } from './utils';

export default async (req: NowRequest, res: NowResponse) => {
    const match = req.url.match(/\/api\/cors\?token=(\w+)/);
    if (!match)
        return res.end();
    const token = match[1];

    try {
        const authInfo = await authCheck(token);
        const formatted = JSON.stringify(format(authInfo));
        res.send(formatted);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
}