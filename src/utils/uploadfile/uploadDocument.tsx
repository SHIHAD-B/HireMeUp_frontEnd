export const uploadFile = async (file: File,filename:string): Promise<string | null> => {
    try {
       
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'i3rroh9w');
        formData.append('public_id', filename);
      
      

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
        let secureUrl = urlData.url;
        if (secureUrl.startsWith('http://')) {
            secureUrl = secureUrl.replace('http://', 'https://');
        }

        return secureUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};
