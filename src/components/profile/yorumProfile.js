import React, { useEffect } from 'react';
import CommentSection from '../layout/CommentSection';
import firebase from '../../config/fbConfig';
import { connect } from 'react-redux';

let dayjs = require('dayjs');
let db = firebase.firestore();

const YorumProfile = (state, userId) => {
    const [movieComments, setMovieComments] = React.useState([]);
    const ref = db.collection('comments');
    const [commentCount, setCommentCount] = React.useState();
    
    useEffect(() => {
        console.log(state)
    const getComments = async () => {
    
        const newState = [];
    
        const snapshot = await ref
          .where('userId', '==', state.auth.uid)
    
          .orderBy('timestamp', 'desc')
          .get();
          
        if (snapshot.empty) {
          console.log('No matching documents.');
          setMovieComments([]);
          return;
        }
    
        snapshot.forEach((doc) => {
          let com = doc.data();
    
          const formatDate = dayjs
            .unix(com.createdAt.seconds)
            .format('DD-MM-YYYY');
          com.createdAt = formatDate;
          com.commentId = doc.id;
    
          newState.push(com);
        });
    
        setMovieComments(newState);
        setCommentCount(newState.length);
    
        
      };
    
      getComments();
    }, [])
    
    return(
        
        movieComments.length > 0 &&
            movieComments.map((comment, index) => (
              <CommentSection
                userName={comment.userFirstName + ' ' + comment.userLastName}
                date={comment.createdAt}
                comment={comment.comment}
                analyze={comment.analyze}
                commentRef={comment}
                key={comment.commentId}
                upvote={comment.upvote}
                downvote={comment.downvote}
              />
            ))
    );
}
const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      state: state,
    };
  };

  
export default connect(mapStateToProps, null)(YorumProfile);