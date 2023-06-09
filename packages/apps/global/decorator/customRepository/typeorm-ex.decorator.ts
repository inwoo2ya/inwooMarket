import { SetMetadata } from '@nestjs/common';
// 기존의 @EntityRepository()의 역할을 해줌

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity); // SetMetadata(metadataKey: k, metadataValue: V)
}
