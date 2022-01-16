import { IMAGE_PATH } from './../API/base';
interface IMakeImagePath {
    id: string;
    format?: string;
}

const makeImagePath = ({ id, format }: IMakeImagePath) => {
    return `${IMAGE_PATH}/${format ?? "original"}/${id}`;
}

export default makeImagePath