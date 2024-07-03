import Express, { NextFunction, Request, Response } from 'express';
import { CreateMessageController } from '../createMessageController';
import { messageContainer } from '../../../messageContainer';
import { CreateMessageValidator } from '../../middlewares/createMessageValidator';
import { ReadMessageController } from '../readMessageController';
import { DeleteMessageController } from '../deleteMessageController';
import { GetMessagesController } from '../getMessagesController';
import messageRoutesFilter from './messageRoutesFilter';

const router = Express.Router();

const createMessageController = messageContainer.resolve<CreateMessageController>('CreateMessageController');
const readMessageController = messageContainer.resolve<ReadMessageController>('ReadMessageController');
const deleteMessageController = messageContainer.resolve<DeleteMessageController>('DeleteMessageController');
const getMessagesController = messageContainer.resolve<GetMessagesController>('GetMessagesUseCase');
router.post('/createMessage', CreateMessageValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createMessageController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await readMessageController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
}); //tokenMessage es para que ninguna persona acceda a ese mensaje mas que la persona que lo leo

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteMessageController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/messages', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMessagesController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.use('/messenge', messageRoutesFilter);

export default router;
