import { Prisma } from "@prisma/client";
declare class ProductsBody implements Prisma.ProductCreateWithoutReceipt_refsInput {
    product_name: string;
    price: number;
    qty?: number;
    tax?: number;
    discount?: number;
    total: number;
    payment_method?: string;
    seq: number;
}
declare class CreateBillBody {
    buyerId: string;
    storeId: number;
    time: string;
    products: ProductsBody[];
    signature: string;
    timestamp: string;
    sequence_no: number;
}
export declare class CreateBillDto {
    data: CreateBillBody;
}
export {};
