import { promises as fs } from 'fs';

type FileManagerConstructor = {
  folder?: string;
  extension?: string;
  useSerialization?: boolean;
};

class FileManager {
  folder: string = '';
  extension: string = 'json';
  useSerialization: boolean = true;

  constructor({
    folder = '',
    extension = 'json',
    useSerialization = true,
  }: FileManagerConstructor = {}) {
    this.folder = folder;
    this.extension = extension || '';
    this.useSerialization = useSerialization;
  }

  path(file: string): string {
    return `${this.folder}/${file}${this.extension ? `.${this.extension}` : ''}`;
  }

  exists(file: string) {
    return fs.stat(this.path(file));
  }

  scan() {
    return fs.readdir(this.folder);
  }

  remove(file: string) {
    return fs.unlink(this.path(file));
  }

  serialize(value: Object): string {
    return JSON.stringify(value, null, 2);
  }

  deserialize(content: string | Buffer): Object {
    return JSON.parse(String(content));
  }

  write(file: string, value: Object) {
    return fs.writeFile(
      this.path(file),
      this.useSerialization ? this.serialize(value) : String(value),
    );
  }

  async read(file: string): Promise<Object> {
    await this.exists(file);

    const fileContent = await fs.readFile(this.path(file));
    return this.useSerialization ? this.deserialize(fileContent) : fileContent;
  }
}

export default FileManager;
