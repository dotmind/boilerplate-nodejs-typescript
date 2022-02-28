// @flow

import Joi from 'joi';
import jwt from 'jsonwebtoken';
import uuidAPIKey from 'uuid-apikey';

import FileManager from '@services/internal/infrastructure/file/manager';

export type ApiPartnerType = {
  _version: number,
  _created: number,
  name: string,
  blacklist: string[],
};

const partnerSchema = {
  _version: Joi.number().required(),
  _created: Joi.number().required(),
  name: Joi.string().required(),
  blacklist: Joi.array().items(Joi.string()).required(),
};

class ApiKeyManager extends FileManager {
  extension = null;
  folder = `${process.cwd()}/.keys/`;
  publicKey = null;
  privateKey = null;
  noSerializationFileManager = new FileManager({
    folder: this.folder,
    useSerialization: false,
    extension: null,
  });

  create(): { key: string, file: string } {
    const { apiKey } = uuidAPIKey.create();

    return {
      key: apiKey,
      file: `${this.folder}${apiKey}`,
    };
  }

  serialize(value: Object): string {
    const str: string = super.serialize(value);
    return Buffer.from(str).toString('base64');
  }

  deserialize(content: string | Buffer): Object {
    const str: string = Buffer.from(String(content), 'base64').toString('ascii');
    return super.deserialize(str);
  }

  async read(
    file: string,
    { strict } = { strict: true },
  ): Promise<ApiPartnerType> {
    if (!this.publicKey) {
      this.publicKey = await this.noSerializationFileManager.read('API_KEY_GENERATOR_PUBLIC_KEY');
    }

    const token = await super.read(file) as string;
    const partner = jwt.verify(
      token,
      this.publicKey,
      { algorithms: ['RS256'] },
    );

    if (strict) {
      await Joi.object(partnerSchema).unknown().validateAsync(partner);
    }

    return partner as ApiPartnerType;
  }

  async write(file: string, value: Object) {
    if (!this.privateKey) {
      this.privateKey = await this.noSerializationFileManager.read('API_KEY_GENERATOR_PRIVATE_KEY');
    }

    return super.write(file, jwt.sign(value, this.privateKey, { algorithm: 'RS256' }));
  }
}

export default new ApiKeyManager();
