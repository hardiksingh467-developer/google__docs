import mongoose from "mongoose";

const Connection = async () => {
    const URL = "mongodb+srv://hardiksingh467:zYLnjmmKMH7Qb1H3@cluster0.wr1yglo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/google--docs--clone";
    // const URL = "mongodb+srv://hardiksingh467:APmqWX3qwMUuhwnQ@whatsapp--clone.f4udovc.mongodb.net/?retryWrites=true&w=majority&appName=whatsapp--clone/google--docs--clone";

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log("Database connected");
    } catch (error) {
        console.error("error connecting to database", error.message);
        console.table(error);
    }
}

export default Connection;