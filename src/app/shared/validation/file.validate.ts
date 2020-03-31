import helper, { isImage, checkFileExtensions } from 'js-object-helper';


export function generateErrorMessage(type, attribues, message) {

    return {
        [('file.' + type).toString()]: true
    }
}

export interface FileRulesContract {
    maxFileSize?: number,
    minFileSize?: number,
    acceptedFiles?: Array<string> | string,
    minImageDimensions?: [number, number],
    maxImageDimensions?: [number, number],
    exactImageDimensions?: [number, number],
    message?: { [key: string]: string | Function },
    crop?: Boolean
}

export async function fileValidation(file: File | Blob | null, rules: FileRulesContract) {

    if (!(file instanceof File || file instanceof Blob)) {
        return null
    }
    const {
        maxFileSize,
        minFileSize,
        acceptedFiles,
        minImageDimensions,
        maxImageDimensions,
        exactImageDimensions,
        message,
        crop
    } = rules;

    const  cropped = file['cropped'];

    let maxFileSizeBytes = maxFileSize ? maxFileSize * 1000000 : null;
    let minFileSizeBytes = minFileSize ? minFileSize * 1000000 : null;
    let acceptedFilesArr = acceptedFiles ? (
        helper.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.toString().split(',')
    ) : null;

        // console.log('I amdsd', file)
    return new Promise(function (resolve) {

        let errors = [];

        const fReader = new FileReader();

        fReader.onload = function (e) {

            let attribues: { [key: string]: any } = {
                maxFileSize,
                minFileSize,
                fileSize: (e.total / 1000000).toFixed(2),
                acceptedFiles: acceptedFiles
            };

            /**
             * Checking file extensions
             */
            if (acceptedFilesArr && !checkFileExtensions(acceptedFilesArr, file)) {
                errors.push(generateErrorMessage('acceptedFiles', attribues, message));
            }
            /**
             * Checking file size for max size validation
             */
            if (maxFileSizeBytes && e.total > maxFileSizeBytes) {
                errors.push(generateErrorMessage('maxFileSize', attribues, message));
            }
            /**
             * Checking file size for min validation
             */
            if (minFileSizeBytes && e.total < minFileSizeBytes) {
                errors.push(generateErrorMessage('minFileSize', attribues, message));
            }
            /**
             * Checking File type is Image
             */
            if (isImage(e.target.result)) {

                let img: any = new Image();
                img.onload = function (imgEvent) {
                    const imgE = imgEvent.srcElement ? imgEvent.srcElement : imgEvent.path[0];
                    /**
                     * Min Dimensions validation
                     */
                    if (minImageDimensions && minImageDimensions[0] && !minImageDimensions[1] && imgE.width < minImageDimensions[0]) {

                        attribues.minImageWidth = minImageDimensions[0];
                        attribues.imageWidth = imgE.width
                        errors.push(generateErrorMessage('minImageWidth', attribues, message));
                    }
                    else if (minImageDimensions && minImageDimensions[1] && !minImageDimensions[0] && imgE.height < minImageDimensions[1]) {

                        attribues.minImageHeight = minImageDimensions[1];
                        attribues.imageHeight = imgE.height
                        errors.push(generateErrorMessage('minImageHeight', attribues, message));
                    }
                    else if (minImageDimensions && minImageDimensions[1] && minImageDimensions[0] && (imgE.height < minImageDimensions[1] || imgE.width < minImageDimensions[0])) {

                        attribues.minImageHeight = minImageDimensions[1];
                        attribues.minImageWidth = minImageDimensions[0];
                        attribues.imageHeight = imgE.height
                        attribues.imageWidth = imgE.width
                        errors.push(generateErrorMessage('minImageWidthHeight', attribues, message));
                    }
                    /**
                     * Max Dimensions Validation
                     */
                    if (maxImageDimensions && maxImageDimensions[0] && !maxImageDimensions[1] && imgE.width > maxImageDimensions[0]) {

                        attribues.maxImageWidth = maxImageDimensions[0];
                        attribues.imageWidth = imgE.width
                        errors.push(generateErrorMessage('maxImageWidth', attribues, message));
                    }
                    else if (maxImageDimensions && maxImageDimensions[1] && !maxImageDimensions[0] && imgE.height > maxImageDimensions[1]) {

                        attribues.maxImageHeight = maxImageDimensions[1];
                        attribues.imageHeight = imgE.height
                        errors.push(generateErrorMessage('maxImageHeight', attribues, message));
                    }
                    else if (maxImageDimensions && maxImageDimensions[1] && maxImageDimensions[0] && (imgE.height > maxImageDimensions[1] || imgE.width > maxImageDimensions[0])) {

                        attribues.maxImageWidth = maxImageDimensions[0];
                        attribues.maxImageHeight = maxImageDimensions[1];
                        attribues.imageHeight = imgE.height
                        attribues.imageWidth = imgE.width
                        errors.push(generateErrorMessage('maxImageWidthHeight', attribues, message));
                    }
                    /**
                     * exact Image Dimensions validation
                     */
                    if (exactImageDimensions && exactImageDimensions[0] && !exactImageDimensions[1] && imgE.width != exactImageDimensions[0]) {
                        attribues.imageWidth = exactImageDimensions[0];
                        errors.push(generateErrorMessage('imageWidth', attribues, message));
                    }
                    else if (exactImageDimensions && exactImageDimensions[1] && !exactImageDimensions[0] && imgE.height != exactImageDimensions[1]) {

                        attribues.imageHeight = exactImageDimensions[1];
                        errors.push(generateErrorMessage('imageHeight', attribues, message));
                    }
                    else if (exactImageDimensions && exactImageDimensions[1] && exactImageDimensions[0] && (imgE.height != exactImageDimensions[1] || imgE.width != exactImageDimensions[0])) {

                        attribues.imageWidth = exactImageDimensions[0];
                        attribues.imageHeight = exactImageDimensions[1];
                        errors.push(generateErrorMessage('imageWidthHeight', attribues, message));
                    }

                    if (crop && !cropped) {
                        errors.push(generateErrorMessage('crop', null, message));
                    }

                    // console.log('errors', errors, file)

                    resolve(errors.length ? errors[0] : null)

                }

                img.src = e.target.result;
            }
            else {
                /**
                 * Resolving the promise instance
                 */
                resolve(errors.length ? errors[0] : null)
            }

        }

        fReader.readAsDataURL(file);
    });
}