import { IUser } from "../../interfaces/user";
import { Schema, Document, Model, model } from "mongoose";

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        select: true,
    },
    githubToken: {
        type: String,
        select: true
    },
    githubUsername: {
        type: String,
        select: true,
        unique: true
    },
    githubRepo: {
        type: String,
        select: true
    },
    scores: [{
        type: Schema.Types.ObjectId,
        ref: "Score"
    }]
});

const User: Model<IUserModel> = model<IUserModel>("ChallengeUser", userSchema);

export { User };