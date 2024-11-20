import prisma from '@/prisma';
import { Request, Response, NextFunction } from 'express';

const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log("😲Request Header",{userId: req.headers['x-user-id'], email:req.headers['x-user-email'] })

		const products = await prisma.product.findMany({
			select: {
				id: true,
				sku: true,
				name: true,
				price: true,
				inventoryId: true,
			},
		});

		res.json({ data: products });
	} catch (err) {
		next(err);
	}
};

export default getProducts;