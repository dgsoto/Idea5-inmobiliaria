import Express, { NextFunction, Request, Response } from 'express';
import { messageContainer } from 'src/modules/message/messageContainer';

import { GetReceivedMessagesController } from '../getReceivedMessagesController';
import { GetSentMessagesController } from '../getSentMessagesController';
import { GetMessagesByEmailController } from '../getMessageByEmailController';
import { GetMessagesController } from '../getMessagesController';
import { GetMessageByContentController } from '../getMessageByContentController';
const router = Express.Router();

const getMessageByEmailController = messageContainer.resolve<GetMessagesByEmailController>('GetMessageByEmailUseCase');
const getSentMessagesController = messageContainer.resolve<GetSentMessagesController>('GetSentMessagesUseCase');
const getReceivedMessagesController = messageContainer.resolve<GetReceivedMessagesController>('GetReceivedMessagesUseCase');
const getMessagesController = messageContainer.resolve<GetMessagesController>('GetMessagesUseCase');
const getMessageByContentController = messageContainer.resolve<GetMessageByContentController>('GetMessageByContentUseCase');

/*la idea es pasarles el email y user_id del token, en proceso*/
router.get('/allMessages', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.userData;
    console.log(userData);
    if (userData) {
      await getMessagesController.run(userData, res, next);
    } else {
      return res.status(401).json({ message: 'Datos de usuario no encontrados' });
    }
    await getMessagesController.run(userData, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:userEmail', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getReceivedMessagesController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:user_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getSentMessagesController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMessageByEmailController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:content', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMessageByContentController.run(req, res, next);
  } catch (err) {
    console.error(err);
  }
});

export default router;
