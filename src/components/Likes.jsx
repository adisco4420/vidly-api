import React, { Component } from 'react';

const LikeCount = ({onLike, liked, movie}) => {
    let classes = 'fas fa-heart';
    if(liked) classes = 'fas fa-home'
    return ( <i  onClick={() => onLike(movie)} className={classes}></i> );
}
 
export default LikeCount;