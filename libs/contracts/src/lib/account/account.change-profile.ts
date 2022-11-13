import { IsOptional, IsString } from 'class-validator';

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsString()
    id: string;

    @IsString()
    @IsOptional()
    displayName?: string;
  }

  export class Response {}
}
