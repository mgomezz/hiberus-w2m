import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageNotificationService } from './message-notification.service';

describe('MessageNotificationService', () => {
  let service: MessageNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageNotificationService],
      imports: [MatSnackBarModule],
    });

    service = TestBed.inject(MessageNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
