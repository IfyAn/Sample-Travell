import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import moment from 'moment'
import ProgressiveImage from './ProgressiveImage';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, onDelete, onPress}) => {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

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

        const getUser = async() => {
            const currentUser = await firestore()
            .collection('users')
            .doc(item.userId)
            .get()
            .then((documentSnapshot) => {
              if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
              }
            })
          }
        
        useEffect(() => {
            getUser();
          }, []);
    
    return (
        <View style={styles.card} key={item.id}>
            <View style={styles.userInfo}>
            <Image  source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}} style={styles.userImage} />
            <View style={styles.userInfoText}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.userName}>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
                </TouchableOpacity>
                <Text style={styles.postTime}>{moment(item.postTime.toDate()).fromNow()}</Text>
            </View>
            </View>
            <Text style={styles.postText}>{item.post}</Text>
            {/* {item.postImg != null ? <Image source={{uri:item.postImg}} style={styles.postImg} /> : <View style={styles.divider} />} */}
             {item.postImg != null ?    
                <ProgressiveImage
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{uri: item.postImg}}
                    style={{width: '100%', height: 250}}
                    resizeMode="cover"
                /> 
                : 
                <View style={styles.divider} />
                }
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
        fontSize:12,
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
