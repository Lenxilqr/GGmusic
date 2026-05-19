// api/chat.js (Vercel Serverless Function 示例)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 这里 process.env.DEEPSEEK_API_KEY 就会自动读取你在 Vercel 里填写的环境变量
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` 
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        
        // 将 DeepSeek 返回的数据原封不动地返回给你的 HTML 前端
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch DeepSeek API' });
    }
}
