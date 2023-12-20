import { INIT_STATE } from '../../constant';
import { getPosts, getType, createPost, updatePost, deletePost } from '../actions';
// import { getPosts, getType, createPost, updatePost } from '../actions';


export default function postsReducers(state = INIT_STATE.posts, action) {
    switch (action.type) {
        case getType(getPosts.getPostsRequest):
            return {
                ...state,
                isLoading: true,
            };

        //thành công
        case getType(getPosts.getPostsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };

        //Thất bại
        case getType(getPosts.getPostsFailure):
            return {
                ...state,
                isLoading: false,
            };

        //createPost
        case getType(createPost.createPostSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };

        //UpdatePost
        case getType(updatePost.updatePostSuccess):
            return {
                ...state,
                data: state.data.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };

        // Xóa bài viết thành công
        // case getType(deletePost.deletePostSuccess):
        //     return {
        //         ...state,
        //         data: state.data.filter((post) =>
        //             post._id !== action.payload
        //         ),
        //     };

        case getType(deletePost.deletePostSuccess):
            const deletedPostId = action.payload; // Giả sử payload chứa postId cần xóa

            return {
                ...state,
                data: state.data.filter(post =>
                    post._id !== deletedPostId),
            };

        default:
            return state;
    }
}

// export default posts;