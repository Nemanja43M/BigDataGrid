import { Transform, TransformCallback } from 'stream';
import { IStructure } from '../interfaces/interface';
import { fileRepository } from '../repositories/file.repository';

function extractFileUrlsFromString(inputString: string) {
    const fileUrlPattern = /"fileUrl":"([^"]+)"/g;
    let fileUrls = [];
    let match;

    while ((match = fileUrlPattern.exec(inputString)) !== null) {
        fileUrls.push(match[1]);
    }

    return fileUrls;
}

function buildStructure(arr: string[]): IStructure {
    const structure: IStructure = {};

    arr.forEach((url) => {
        const ipAddressMatch = url.match(/^http:\/\/([^:/]+)/);
        if (!ipAddressMatch) return;
        const ipAddress = ipAddressMatch[1];
        const restOfPath = url
            .replace(/^http:\/\/[^/]+/, '')
            .replace(/^\//, '');

        let current = (structure[ipAddress] = structure[ipAddress] || []);

        const pathSegments = restOfPath.split('/');
        pathSegments.reduce((acc, part, index) => {
            if (!part) return acc;

            if (index === pathSegments.length - 1) {
                if (typeof acc[acc.length - 1] === 'object') {
                    acc[acc.length - 1][
                        Object.keys(acc[acc.length - 1])[0]
                    ].push(part);
                } else {
                    acc.push(part);
                }
            } else {
                let nextAcc: any;

                if (
                    typeof acc[acc.length - 1] === 'object' &&
                    acc[acc.length - 1][part]
                ) {
                    nextAcc = acc[acc.length - 1][part];
                } else {
                    nextAcc = [];
                    acc.push({ [part]: nextAcc });
                }

                return nextAcc;
            }

            return acc;
        }, current);
    });

    return structure;
}

export class UrlTransform extends Transform {
    private buffer: string[] = [];

    _transform(
        chunk: any,
        _encoding: BufferEncoding,
        callback: TransformCallback
    ) {
        this.buffer.push(chunk.toString());
        callback();
    }

    _flush(callback: TransformCallback) {
        try {
            const data = this.buffer.join('');
            const fileUrls = extractFileUrlsFromString(data);
            const jsonStructure = buildStructure(fileUrls);

            fileRepository
                .save(jsonStructure)
                .then(() => {
                    this.buffer = [];
                    callback();
                })
                .catch((error) => {
                    callback(error);
                });
        } catch (error) {
            error;
        }
    }
}
