export const dateProducer = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};

export const fetcher = async (route, method, payload = {}) => {

    const local = 'http://localhost:5000/';

    if(typeof route === "string" && typeof method === "string" ) {
        try {
            let additionalData =  method !== "GET" && method !== "DELETE" ? { method: method, credentials: "include", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(payload) } : { method: method, credentials: "include" }
           
            const response = await fetch(local + route, additionalData);
          console.log("RESPONSE:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        
            const rawData = await response.json();
        
            return rawData;
        } catch(error) {
            console.log("error message:", error.message);
            throw error;
        }
    } else {
        throw new Error('Route or method incorrect.');
    }
}

export 	const capitalizer = str => {
    return str[0].toUpperCase() + str.slice(1);
};

export const bookObjFactory = (b) => {
    return  {
        book_id: b.id,
        title: b.volumeInfo.title,
        author: b.volumeInfo.authors,
        rating: b.volumeInfo?.averageRating ?? 0,
        thumbnail: b.volumeInfo.imageLinks?.smallThumbnail ?? '',
        publisheddate: b.volumeInfo.publishedDate,
        date: dateProducer(),
     }
}

export const toastObjFactory = (type, notice) => {
    return {
        active: true,
        notice: notice,
        type: type
    }
}
