import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import { BackendApp } from './BackendApp';

dotenv.config({
  path: path.join(__dirname, '../../.env.development'),
});

try {
  void new BackendApp().start();
} catch (error) {
  console.log(error);
}
