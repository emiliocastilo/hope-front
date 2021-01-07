import { TranslateService } from '@ngx-translate/core';
import { MimeTypes } from '../enum/mimetype.enum';
import { NotificationService } from '../services/notification.service';

export class FileUtils {
    static checkValidExtension (
        file: File,
        _translate: TranslateService,
        _notification: NotificationService,
        validExtensions?: Array<string>
    ): boolean {
        let invalidExtension = true;
        if (validExtensions.length > 0) {
            const possibleExtensions = MimeTypes.filter((f) => f.type === file.type);
            possibleExtensions.forEach((ext) => {
                if (validExtensions.includes(ext.extension)) invalidExtension = false;
            });
        } else {
            let validExtensionsString = '';
            validExtensions.forEach(element => {
                if (validExtensionsString.length > 0) validExtensionsString += ', ';
                validExtensionsString += element;
            });
            _notification.showWarningToast(_translate.instant('notifications.invalidFileType', { validTypes: validExtensionsString }));
            invalidExtension = false
        };

        if (invalidExtension) return false;
        else return true;
    }

    static checkFileSize (
        file: File,
        fileSize: number,
        _translate: TranslateService,
        _notification: NotificationService
    ): boolean {
        let isValid = false;

        return isValid;
    }
}