import { useState } from 'react';
import React from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/actions';
import { deletePost } from '../../../redux/actions';

//Chức năng xóa
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

export default function Post({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    //State để xác định vị trí menu mở
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);


    // Mở menu khi bấm vào dấu ba chấm
    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    // Đóng menu
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDeletePost = () => {
        dispatch
            (deletePost(post.id)); // Gọi action xóa bài viết với postId
        handleMenuClose(); // Đóng menu sau khi xử lý xóa
    };

    const onLikeBtnClick = React.useCallback(() => {
        dispatch(
            updatePost.updatePostRequest({ ...post, likeCount: post.likeCount + 1 })
        );
    }, [dispatch, post]);

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>A</Avatar>}
                title={post.author}
                subheader={moment(post.updatedAt).format('HH:MM MMM DD,YYYY')}
                action={
                    <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardMedia
                image={post.attachment || ''}
                title='Title'
                className={classes.media}
            />
            <CardContent>

                <Typography variant='h5' color='textPrimary'>
                    {post.title}
                </Typography>

                <Typography variant='body2' component='p' color='textSecondary'>
                    {post.content}
                </Typography>

            </CardContent>
            <CardActions>

                <IconButton onClick={onLikeBtnClick}>
                    <FavoriteIcon />
                    <Typography component='span' color='textSecondary'>
                        {`${post.likeCount} likes`}
                    </Typography>
                </IconButton>

            </CardActions>
            <Menu
                id='post-menu'
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}>

                <MenuItem onClick={handleDeletePost}>
                    Delete Post
                </MenuItem>

            </Menu>
        </Card>
    );
}



