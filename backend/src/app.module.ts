import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { NotificationModule } from './notification/notification.module';
import { SharedModule } from './shared/shared.module';
import { TableModule } from './table/table.module';
import { RequestModule } from './request/request.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    RestaurantModule,
    TableModule,
    DatabaseModule,
    RequestModule,
    NotificationModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
