import { Router } from "express";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { MsgRoutes } from "../modules/messages/msg.route";
import { UserRoutes } from "../modules/user/user.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { SkillRoutes } from "../modules/skill/skill.route";

const router=Router();
const moduleRoutes=[
    {
        path:'/auth',
        route:UserRoutes,
    },
    {
        path:'/blogs',
        route:BlogRoutes,
    },
    {
        path:'/msg',
        route:MsgRoutes,
    },
    {
        path:'/project',
        route:ProjectRoutes,
    },
    {
        path:'/skill',
        route:SkillRoutes,
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;