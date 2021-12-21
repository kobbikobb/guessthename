import http from 'http';
import app from './app';

const server = http.createServer(app);
const PORT: any = process.env.PORT ?? 3000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
