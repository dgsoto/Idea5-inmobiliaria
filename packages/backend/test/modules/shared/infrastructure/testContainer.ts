import { container } from 'tsyringe';
import { PrismaEnvironmentArranger } from './PrismaEnvironmentArranger';

container.register('PrismaEnvironmentArranger', { useClass: PrismaEnvironmentArranger });

export { container as testContainer };
