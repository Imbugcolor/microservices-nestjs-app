import { AbstractReposity } from '@app/common';
import { UserDocument } from './models/user.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractReposity<UserDocument> {
  protected readonly logger = new Logger();
  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
