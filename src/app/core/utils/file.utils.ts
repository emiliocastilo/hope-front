import { TranslateService } from '@ngx-translate/core';
import { MimeTypes } from '../enum/mimetype.enum';
import { NotificationService } from '../services/notification.service';

export class FileUtils {
    static checkValidExtension (
        file: File,
        validExtensions: Array<string>,
        _translate: TranslateService,
        _notification: NotificationService
    ): boolean {
        let invalidExtension = true;
        if (validExtensions.length > 0) {
            const possibleExtensions = MimeTypes.filter((f) => f.type === file.type);
            possibleExtensions.forEach((ext) => {
                if (validExtensions.includes(ext.extension)) invalidExtension = false;
            });
        } else invalidExtension = false;

        if (invalidExtension) {
            let validExtensionsString = '';
            validExtensions.forEach(element => {
                if (validExtensionsString.length > 0) validExtensionsString += ', ';
                validExtensionsString += element;
            });
            _notification.showWarningToast(_translate.instant('notifications.invalidFileType', { validTypes: validExtensionsString }));
            return false;
        }
        else return true;
    }

    static checkFileSize (
        file: File,
        fileSize: number,
        _translate: TranslateService,
        _notification: NotificationService
    ): boolean {
        let isValid = false;

        if (fileSize && file.size > fileSize) {
            isValid = false;
            _notification.showWarningToast(_translate.instant('notifications.fileMaxSize', { maxSize: `${Math.round(((fileSize / 1024) + Number.EPSILON) * 100) / 100}Mb` }));
        } else isValid = true;

        return isValid;
    }
}