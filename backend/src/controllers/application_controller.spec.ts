import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application_controller';
import { ApplicationService } from '../services/application_service';

describe('ApplicationController', () => {
  let applicationController: ApplicationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [ApplicationService],
    }).compile();

    applicationController = app.get<ApplicationController>(
      ApplicationController,
    );
  });

  describe('root', () => {
    it('should return "ok"', () => {
      expect(applicationController.health()).toBe('ok');
    });
  });
});
