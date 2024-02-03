import { json, urlencoded } from 'body-parser';
import express from 'express';
import type * as http from 'http';
import router from './routes';

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use('/api', router);
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      const env = this.express.get('env') as string;
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Frontoffice Backend App is running at http://localhost:${this.port}/api in ${env} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer(): Server['httpServer'] {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close((error) => {
          if (error != null) {
            reject(error);

            return;
          }

          resolve();
        });
      }

      resolve();
    });
  }
}
