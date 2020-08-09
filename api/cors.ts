import type { NowRequest, NowResponse } from '@vercel/node';
import { authCheck, format } from './utils';

export default async (req: NowRequest, res: NowResponse) => {
    // Extract token.
    const match = req.url.match(/\/api\/cors\?token=(\w+)/);
    if (!match)
        return res.end();
    const token = match[1];

    try {
        // Retrieve authentication information.
        const authInfo = await authCheck(token);
        // Format results.
        const formatted = JSON.stringify(format(authInfo));
        // Send back the result.
        res.send(formatted);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
}