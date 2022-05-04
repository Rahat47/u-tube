import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import { RegisterUserSchema } from './user.schema';
import { createUser } from './user.service';

export const registerUserHandler = expressAsyncHandler<
    {},
    {},
    RegisterUserSchema
>(async (req, res) => {
    const { username, email, password } = req.body;

    const user = await createUser({ username, email, password });
    res.status(StatusCodes.CREATED).json({
        message: 'User created successfully',
        data: user,
    });
});
