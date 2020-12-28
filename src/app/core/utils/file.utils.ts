import { MimeTypes } from '../enum/mimetype.enum';

export class FileUtils {
    static checkValidExtension (file: File, validExtensions?: Array<string>): boolean {
        let invalidExtension = true;
        if (validExtensions.length > 0) {
            const possibleExtensions = MimeTypes.filter((f) => f.type === file.type);
            possibleExtensions.forEach((ext) => {
                if (validExtensions.includes(ext.extension)) invalidExtension = false;
            });
        } else invalidExtension = false;

        if (invalidExtension) return false;
        else return true;
    }
}