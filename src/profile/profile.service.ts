import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly fileService: FileService,
  ) {}

  async uploadProfilePic(
    userId: string,
    imageBuffer: Buffer,
    filename: string,
  ) {
    const file = await this.fileService.uploadFile(imageBuffer, filename);
    const getProfile = await this.getProfileByUser(userId);

    if (getProfile.avatarUrl) {
      await this.deleteAvatarFile(getProfile.avatarUrlKey, getProfile.id);
    }

    await this.profileRepository.update(getProfile.id, {
      avatarUrl: file.url,
      avatarUrlKey: file.key,
    });

    const updateProfile = this.profileRepository.create({
      ...getProfile,
      avatarUrl: file.url,
      avatarUrlKey: file.key,
    });

    const updatedProfile = this.profileRepository.save(updateProfile);

    if (!updatedProfile) {
      throw new InternalServerErrorException(`Cannot update profile`);
    }

    return updateProfile;
  }

  async deleteAvatarFile(key: string, id: string) {
    await this.fileService.deleteUploadedFile(key);
    const deleteFromProfile = await this.profileRepository.update(id, {
      avatarUrl: null,
      avatarUrlKey: null,
    });

    if (!deleteFromProfile) {
      throw new InternalServerErrorException('Cannot delete profile picture');
    }
    return;
  }

  async getProfileById(id: string) {
    const profile = await this.profileRepository.findOne(id, {
      relations: ['user'],
    });

    if (!profile) {
      throw new InternalServerErrorException(
        `Cannot found profile id:${profile.id}`,
      );
    }
    return profile;
  }

  async getProfileByUser(userId: string) {
    const profileByUser = await this.profileRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!profileByUser) {
      throw new NotFoundException('Cannot found profile by user');
    }

    return profileByUser;
  }
}
