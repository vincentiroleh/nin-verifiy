import express, { Request, Response } from "express";
import Controller from "./controller";

const router = express.Router();

router.all('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Dummy NIN Linking API'
    })
});
router.post('/register', Controller.register);
router.post('/user', Controller.getUser);
router.post('/fund', Controller.fundWallet);
router.post('/link-nin', Controller.linkNin);


export default router;