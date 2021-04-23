import mongoose from 'mongoose';
const { Schema } = mongoose;

const ninSchema = new Schema({
    ninNumber: {
        type: Number,
        unique: true,
        require: [true, 'Nin Number required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'User is required']
    }
}, { timestamps: true });

const Nin = mongoose.model('Nin', ninSchema);

export default Nin;