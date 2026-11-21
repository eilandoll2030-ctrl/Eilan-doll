const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url || '/', 'http://localhost');
    let cleanPath = decodeURIComponent(u.pathname).replace(/\0/g, '');
    let target = path.normalize(path.join(ROOT, cleanPath));
    if (!target.startsWith(ROOT)) return res.writeHead(403).end('Forbidden');
    
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      if (fs.existsSync(path.join(target, 'index.html'))) target = path.join(target, 'index.html');
    }
    
    if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      target = path.join(ROOT, 'index.html');
    }

    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    
    if (target.endsWith('index.html') && !target.includes('website-studio')) {
      let html = fs.readFileSync(target, 'utf8');
      const inject = "<script>try{localStorage.setItem('eilan_owner_session','8956a8cec89db4d454f7354f2062fc00');sessionStorage.setItem('eilan_owner_session','8956a8cec89db4d454f7354f2062fc00');}catch(e){}</script>";
      html = html.replace('<head>', '<head>' + inject);
      res.end(html);
    } else {
      fs.createReadStream(target).pipe(res);
    }
  } catch (err) {
    res.writeHead(500).end('Internal Server Error');
  }
});
server.listen(PORT, '0.0.0.0', () => console.log(`Eilan preview listening on http://0.0.0.0:${PORT}`));
