import type { NowRequest, NowResponse } from '@vercel/node';
import { authCheck, format } from './utils';

export default async (req: NowRequest, res: NowResponse) => {
    // This header instructs the browser to treat the endpoint as a JavaScript file.
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    // Extract the token.
    const match = req.url.match(/\/api\/jsonp\.js\?token=(\w+)/);
    if (!match)
        return res.end();
    const token = match[1];

    try {
        // Retrieve authentication information.
        const authInfo = await authCheck(token);
        // Format results.
        const formatted = JSON.stringify(format(authInfo));
        // JSONP onComplete handler invocation with data.
        res.send(`onComplete('${formatted}')`);
    } catch (e) {
        res.status(500);
        res.end();
    }
}