import PostList from "../components/Post/List";
import PostDetails from "../components/Post/Details";
import PostAdd from "../components/Post/Add";
import PostEdit from "../components/Post/Edit";
import NotFound from "../components/General/NotFound";

export default [
    { path: "/", component: PostList, name: "home" },
    { path: "/post/:slug", component: PostDetails,  props: true, name: "post"},
    { path: "/post/:slug/edit", component: PostEdit,  props: true, name: "postEdit"},
    { path: "/post/add", component: PostAdd,  props: true, name: "postAdd"},
    { path: "/404", component: NotFound, name: "404"}
];