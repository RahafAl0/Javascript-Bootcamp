const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Tour = require('../models/tour');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Tour.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random443 = Math.floor(Math.random() * 443);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Tour({
            author: '60cbb4dbb9192f36109fb979',
            location: `${cities[random443].city}, ${cities[random443].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                 type : "Point", 
                 coordinates: [
                     cities[random443].lng,
                     cities[random443].lat,
                 ]
            },    
             images: [
                {
                  url: 'https://res.cloudinary.com/dao9tmju0/image/upload/v1624215684/England/ng2lmbxhxberyfmhxvbl.jpg',
                  filename: 'England/ng2lmbxhxberyfmhxvbl'
                },
                {
                  url: 'https://res.cloudinary.com/dao9tmju0/image/upload/v1624215684/England/sxvwf1dp5ofc3nxfn0jd.jpg',
                  filename: 'England/sxvwf1dp5ofc3nxfn0jd'
                }
              ]
        })
        await camp.save();
        
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})