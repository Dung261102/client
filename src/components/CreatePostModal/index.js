import { Button, Modal, TextareaAutosize, TextField } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
// import React from 'react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createPost, deletePost, hideModal } from '../../redux/actions';

export default function CreatePostModal() {

    //test
    // console.log({ isShow });
    // const body = <p> 'this is model' </p>;



    const [data, setData] = React.useState({
        title: '',
        content: '',
        attachment: '',
        // Thêm để thực hiện chức năng xóa
        postId: '', // Thêm trường postId
    });


    const dispatch = useDispatch();
    const { isShow } = useSelector(modalState$);
    const classes = useStyles();

    const onClose = React.useCallback(() => {
        dispatch(hideModal());
        setData({
            title: '',
            content: '',
            attachment: '',
            postId: '', // Reset postId khi đóng modal
        });
    }, [dispatch]);

    const onSubmit = React.useCallback(() => {
        //tạo bài viết
        dispatch(createPost.createPostRequest(data));
        //xóa
        // Nếu có postId, thì mới thực hiện yêu cầu xóa
        if (data.postId) {
            dispatch(deletePost.deletePostRequest(data.postId));
        }
        onClose();
    }, [data, dispatch, onClose]);


    const body = (
        <div className={classes.paper} id='simple-modal-title'>
            <h2>Create New Post</h2>
            <form noValidate autoComplete='off' className={classes.form}>
                <TextField
                    className={classes.title}
                    required
                    label='Title'
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                <TextareaAutosize
                    className={classes.textarea}
                    rowsMin={10}
                    rowsMax={15}
                    placeholder='Content...'
                    value={data.content}
                    onChange={(e) => setData({ ...data, content: e.target.value })}
                />
                <FileBase64
                    accept='image/*'
                    multiple={false}
                    type='file'
                    value={data.attachment}
                    onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
                />

                <div className={classes.footer}>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                        fullWidth
                        onClick={onSubmit}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );

    return (
        <div>
            <Modal open={isShow} onClose={onClose}>
                {body}
            </Modal>
        </div>
    );
}


