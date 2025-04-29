import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SendOrderDto } from 'src/order/dto/send-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly configService: ConfigService) {}
  private readonly username = this.configService.get<string>(
    'VONAGE_API_USERNAME',
  );
  private readonly password = this.configService.get<string>(
    'VONAGE_API_PASSWORD',
  );
  private readonly from = this.configService.get<string>('VONAGE_SANDBOX_FROM');
  private readonly to = this.configService.get<string>('VONAGE_SANDBOX_TO');
  private readonly sandboxUrl =
    this.configService.get<string>('VONAGE_SANDBOX_URL');

  async sendOrder(request: SendOrderDto) {
    const payload = {
      from: this.from,
      to: this.to,
      message_type: 'text',
      channel: 'whatsapp',
      text: `*New Order*\n\n*Name:* ${request.customer.name}\n*Phone:* ${request.customer.mobile}\n*Address:* ${request.customer.address}\n\n*Items:*\n${request.items
        .map(
          (item) =>
            `${item.name} (${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price})`,
        )
        .join('\n')}\n\n*Total:* ₹${request.total}`,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.post(this.sandboxUrl!, payload, {
        headers,
        auth: {
          username: this.username!,
          password: this.password!,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, message: 'Order sent successfully' };
      }
      throw new Error('Failed to send order');
    } catch (error) {
      console.error('Error sending order:', error);
      throw new Error('Failed to send order');
    }
  }
}
