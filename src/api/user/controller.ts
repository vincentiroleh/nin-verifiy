import { Request, Response } from 'express';
import User from "./user.model";
import Nin from "./nin.model";

const Controller = {
    // Register User to db
    async register(req: Request, res: Response) {
        const data: object = req.body;
        try {
            let user = await User.findOne({ phone: req.body.phone })
            if (user) {
                return res.status(400).json({ message: 'user already exists' })
            } else {
                user = new User(data)
                await user.save();
                res.status(201).json({ message: 'Account created', data: user })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Get user, and populate nin if available
    async getUser(req: Request, res: Response) {
        try {
            const phone: number = req.body.phone;
            const user: any = await User.findOne({ phone });
            const nin = await Nin.findOne({ user: user._id })
                .populate('user')

            if (user && nin) {
                res.status(200).json({ message: 'Account retrived', data: nin })
            } else if (user) {
                res.status(201).json({ message: 'Account retrived', data: user })
            }
            else {
                return res.status(404).json({ message: 'user does not exists' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Fund user's Wallate with must be  => 500
    async fundWallet(req: Request, res: Response) {
        try {
            const { phone, amount } = req.body;
            let user: any = await User.findOne({ phone })
            if (user && amount >= 500) {
                user.wallet += amount
                await user.save()
                res.json({ message: 'Funds receieved', data: user })
            } else {
                return res.status(400).json({ message: 'user not found OR min amount not up to 500' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Link NIN if user's walllet is 500 and above
    async linkNin(req: Request, res: Response) {
        const { phone, ninNumber } = req.body;
        let user: any = await User.findOne({ phone });

        try {
            if (user && user.wallet >= 500) {
                user.wallet -= 500;
                await user.save();
                const nin = new Nin({
                    ninNumber,
                    user: user._id
                });
                await nin.save();
                res.json({ message: 'Nin linked succeffully' })
            } else {
                return res.status(400).json({ message: 'user nnot found OR not enough fund to perform this operation' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Get total amount of funds from all users
    async sumWallet(req: Request, res: Response) {
        const users: any = await User.find({})
        console.log(users)
    }
}

export default Controller;