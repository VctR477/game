import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import path from 'path';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // @ts-ignore
    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const pathToIndex = path.resolve(__dirname, '..', 'client/index.html');
            // @ts-ignore
            return h.file(pathToIndex).code(200);
        }
    });

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
