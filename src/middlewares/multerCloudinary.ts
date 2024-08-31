import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Request, Response, NextFunction } from "express";
import sharp from 'sharp';
import cloudinary from "../configs/cloudinary";
import { CLOUDINARY_FOLDER } from "../secrets";

export interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
}

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } || undefined;
       
        if (!files || Object.keys(files).length === 0) {
            req.body.cloudinaryUrls = []; // for images
            req.body.cloudinaryVideoUrls = []; // for videos
            return next();
        }

        const allFiles: CloudinaryFile[] = Object.values(files).flat() as CloudinaryFile[];

        if (!allFiles || allFiles.length === 0) {
            return next(new Error('No files provided'));
        }

        // Initialize arrays for storing URLs
        const image: string[] = [];
        const video: string[] = [];
        let imageExist = false;
        let videoExist = false;

        const uploadPromises = allFiles.map(async (file) => {
            let fileBuffer: Buffer = file.buffer;
            const isImage = file.mimetype.startsWith('image/');
            const isVideo = file.mimetype.startsWith('video/');

            if (isImage) {
                // Resize the image
                imageExist = true;
                fileBuffer = await sharp(file.buffer)
                    .resize({ width: 800, height: 600, fit: 'inside' })
                    .toBuffer();
            }

            if (isVideo){ videoExist=true}

            return new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: isImage ? 'image' : isVideo ? 'video' : 'auto',
                        folder: CLOUDINARY_FOLDER,
                        format: isImage ? 'webp' : undefined 
                    } as any,
                    (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (err) {
                            console.error('Cloudinary upload error:', err);
                            return reject(err);
                        }
                        if (!result) {
                            console.error('Cloudinary upload error: Result is undefined');
                            return reject(new Error('Cloudinary upload result is undefined'));
                        }
                        resolve(result.secure_url);
                    }
                );
                uploadStream.end(fileBuffer);
            }).then((url) => {
                if (isImage) {
                    image.push(url);
                } else if (isVideo) {
                    video.push(url);
                }
            });
        });

        await Promise.all(uploadPromises);

        // Attach URLs to the request body
        if (imageExist) {
            req.body.image = image;
        }
        if (videoExist) {
            req.body.video = video;
        }

        next();
    } catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error);
        next(error);
    }
};
