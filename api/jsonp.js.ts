import type { NowRequest, NowResponse } from '@vercel/node';
import { authCheck, format } from './utils';

export default async (req: NowRequest, res: NowResponse) => {
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    const match = req.url.match(/\/api\/jsonp\.js\?token=(\w+)/);
    if (!match)
        return res.end();
    const token = match[1];

    try {
        const authInfo = await authCheck(token);
        const formatted = JSON.stringify(format(authInfo));
        res.send(`onComplete('${formatted}')`);
    } catch (e) {
        res.status(500);
        res.end();
    }
}