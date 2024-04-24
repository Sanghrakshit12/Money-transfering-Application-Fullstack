import express from 'express'
import AuthMiddleware, { AuthenticatedRequest } from '../middleware'
import { AccountModel } from '../db'
import { transferBody } from '../zod'
import mongoose from 'mongoose'

export const accountRouter = express.Router()

accountRouter.get('/balance', AuthMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        const userId = req.userId
        const owner = await AccountModel.findOne({
            userId
        })
        res.status(200).json({ Balance: owner?.balance })
    }
    catch (err) {
        res.status(404).json({ message: "Error Getting Balance" })
        console.log(err)
    }
})


interface Account {
    userId: mongoose.Types.ObjectId;
    balance: number;
}

accountRouter.post('/transfer', AuthMiddleware, async (req: AuthenticatedRequest, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;
    const check = transferBody.safeParse({ to, amount });

    if (!check.success) {
        await session.abortTransaction();
        return res.status(400).json({ error: check.error.errors });
    }

    const userId = req.userId;
    let owner: Account | null;

    try {
        owner = await AccountModel.findOne({ userId }).session(session);
        if (!owner || owner.balance === undefined) {
            throw new Error("Account doesn't exist or balance is undefined");
        }

        if (owner.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const receiver: Account | null = await AccountModel.findOne({ userId: to }).session(session);
        if (!receiver) {
            throw new Error("Recipient account doesn't exist");
        }

        await AccountModel.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
        await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
        console.log("Transfer successful");
    } catch (error) {
        console.error("Error in transaction:", error);
        await session.abortTransaction();
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});
