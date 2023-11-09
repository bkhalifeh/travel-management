import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [InvoiceController],
    providers: [InvoiceService],
})
export class InvoiceModule {}
