import React, {useContext, useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import moment from 'moment'

const PostCard = ({item, onDelete}) => {
    const {user, logout} = useContext(AuthContext);
    likeIcon = item.liked ? 'heart' : 'heart-outline';
    likeIconColor = item.liked ? '#2e64e5' : '#333';

      if (item.likes == 1) {
            likeText = '1 Like';
        } else if (item.likes > 1) {
            likeText = item.likes + ' Likes';
        } else {
            likeText = 'Like';
        }

        if (item.comments == 1) {
            commentText = '1 Comment';
        } else if (item.comments > 1) {
            commentText = item.comments + ' Comments';
        } else {
            commentText = 'Comment';
        }

    return (
        <View style={styles.card}>
            <Image source={{uri:item.userImg}} style={styles.userImage} />
            <View style={styles.userInfoText}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.postTime}>{moment(item.postTime.toDate()).fromNow()}</Text>
            </View>
            <Text style={styles.postText}>{item.post}</Text>
            {item.postImg != null ? <Image source={{uri:item.postImg}} style={styles.postImg} /> : <View style={styles.divider} />}
            <View style={styles.interactionWrapper}>
                <TouchableOpacity style={styles.interaction}>
                        <Ionicons name={likeIcon}  size={25} color={likeIconColor} />
                        <Text style={styles.interactionText}>{likeText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interaction}>
                        <Ionicons name="md-chatbubble-outline"  size={25} />
                        <Text style={styles.interactionText}>{commentText}</Text>
                </TouchableOpacity>
                {user.uid == item.userId ? (
                    <TouchableOpacity style={styles.interaction}onPress={() => onDelete(item.id)}>
                        <Ionicons name="md-trash-bin" size={25} />
                    </TouchableOpacity>
                 ) : null}
            </View>
        </View>   
       
    )
}

export default PostCard

const styles = StyleSheet.create({
        card:{
        backgroundColor:'#dcdcdc',
        width:'100%',
        marginBottom: 20,
        borderRadius: 10,
    },
    divider:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '92%',
        alignSelf:'center',
        marginTop:15,
    },
    interaction:{
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingTop:2, 
        paddingBottom:2, 
        paddingLeft:5,
        paddingRight:5,
        //background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
    },
    interactionText:{
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        //color: ${props => props.active ? '#2e64e5' : '#333'};
        marginTop: 5,
        marginLeft: 5,
    },
    interactionWrapper:{
        flexDirection: 'row',
        justifyContent:'space-around',
        padding: 15,
    },
    postImg:{
        width: '100%',
        height: 250,
        /* marginTop: 15; */
    },
    postText:{
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15,
    },
    postTime:{
        fontSize:2,
        fontFamily:'Lato-Regular',
        color:'#666',
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius:25,
    },
    userInfo:{
        flexDirection:'row',
        justifyContent:'flex-start',
        padding: 15,
    },
    userInfoText:{
        justifyContent: 'center',
        marginLeft: 10,
    },
    userName:{
        fontSize:14,
        fontWeight:'bold',
        fontFamily:'Lato-Regular',
    },
   
})
