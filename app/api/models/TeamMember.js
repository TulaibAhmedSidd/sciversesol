import mongoose from 'mongoose';
const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
});

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
export default TeamMember
