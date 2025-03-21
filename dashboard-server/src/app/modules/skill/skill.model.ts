import { model, Schema } from "mongoose";
import { TSkill } from "./skill.interface";

const ProjectSchema = new Schema<TSkill>(
  {
  skillName:{
    type:String,
    required:true,
  }
}
);

const Skill  = model<TSkill>("Skill", ProjectSchema);

export default Skill;