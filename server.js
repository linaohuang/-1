// 处理静态文件的辅助函数
async function serveStatic(request, rootPath) {
    const url = new URL(request.url);
    const filePath = url.pathname === '/' ? '/index.html' : url.pathname;
    const file = await fetch(rootPath + filePath);
    if (file.status === 404) {
        return new Response('Not Found', { status: 404 });
    }
    return file;
}

// 主请求处理函数
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 处理静态文件请求
        if (url.pathname.startsWith('/static')) {
            return serveStatic(request, 'C:\\Users\\wx131\\Desktop\\P221513279-李浩\\P221513279-本地版\\index.html/');
        }

        // 处理 POST 请求
        if (request.method === 'POST' && url.pathname === '/api/submit') {
            try {
                const data = await request.json();
                console.log('接收到的数据:', data);
                return new Response(JSON.stringify({ message: '数据接收成功', data: data }), {
                    headers: { 'Content-Type': 'application/json' },
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: '解析数据出错' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // 处理 GET 请求
        if (request.method === 'GET' && url.pathname === '/api/getData') {
            const sampleData = { name: '示例数据', value: 123 };
            return new Response(JSON.stringify(sampleData), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 默认返回 404
        return new Response('Not Found', { status: 404 });
    },
};    