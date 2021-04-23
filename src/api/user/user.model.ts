import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        require: [true, 'Last Name is required']
    },
    phone: {
        type: Number,
        unique: true,
        require: [true, 'Phone Number is required']
    },
    wallet: {
        type: Number,
        default: 0
    },
    nin: {
        type: Schema.Types.ObjectId,
        ref: 'Nin'
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema)

export default User;