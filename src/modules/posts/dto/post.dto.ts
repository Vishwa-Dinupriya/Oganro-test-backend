import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;
    readonly image_url: string;

    imageBase64: string;
}