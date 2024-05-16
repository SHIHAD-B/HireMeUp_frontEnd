

export const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'i3rroh9w');


    const res = await fetch('https://api.cloudinary.com/v1_1/dteb7tkf8/image/upload', {
        method: 'post',
        body: formData,
    })
    const urlData = await res.json()

    return urlData.url
};
