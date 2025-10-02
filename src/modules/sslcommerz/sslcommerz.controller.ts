import { Request, Response } from 'express';
import { sslService } from './sslcommerz.service';
import config from '../../app/config';
import catchAsync from '../../app/utils/catchAsync';


const validatePaymentService = catchAsync(async (req: Request, res: Response) => {
    const tran_id = req.query.tran_id as string;
    const result = await sslService.validatePaymentService(
        tran_id
    );
    console.log(result)

    if (result) {
        res.redirect(301, config.sslCommerz.success_url as string);
    }
    else {
        res.redirect(301, config.sslCommerz.failed_url as string);
    }
});

export const SSLController = {
    validatePaymentService
}
