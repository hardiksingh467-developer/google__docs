import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,

    },
    data: {
        type: Object,
        required: true,
        
    },
});

const collectionName = "documents";

const document = mongoose.model(collectionName, documentSchema);

export default document;