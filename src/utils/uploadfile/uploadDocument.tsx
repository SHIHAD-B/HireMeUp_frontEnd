export const uploadFile = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'i3rroh9w');

        const res = await fetch('https://api.cloudinary.com/v1_1/dteb7tkf8/image/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorDetails = await res.json();
            console.error('Cloudinary upload failed:', errorDetails);
            throw new Error(`Failed to upload file: ${errorDetails.error.message}`);
        }

        const urlData = await res.json();
        console.log('Upload successful:', urlData);
        return urlData.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};
