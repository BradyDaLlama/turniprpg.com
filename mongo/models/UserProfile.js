import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
    userID: String,
    coins: Number,
    xp: Number,
    area: String,
    level: Number,
    energy: Number,
    health: Number,
    tools: Object,
    boost: Object,
    inv: String,
    status: Object,
    preferences: Object,
    upgrades: Object,
    rewards: Object,
    skills: Object,
    recipes: Array,
    quests: Object,
    achievements: Object,
    seasonStatus: Object,
    guildInfo: Object,
    servers: Array,
    partyInfo: Object,
    banned: Object,
    refreshToken: String,
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
