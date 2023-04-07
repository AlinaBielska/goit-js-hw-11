const axios = require('axios');

let searchedImage = "cat";

const searchImages = async () => {
    try {
const response = await axios.get('https://pixabay.com/api/', {
    params: {
        key: "35166786-6cff48c73f51fd457f4a9ef76",
        q: searchedImage,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }
})
    } catch (error) {
        console.log(error);
    }
}

    
    
    
    
    
