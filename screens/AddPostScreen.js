import React,{useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider'

const AddPostScreen = () => {
    const {user, logout} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
        width: 1200,
        height: 780,
        cropping: true,
        }).then((image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };
    
    
    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);
    
        firestore()
        .collection('posts')
        .add({
          userId: user.uid,
          post: post,
          postImg: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
          likes: null,
          comments: null,
        })
        .then(() => {
          console.log('Post Added!');
          Alert.alert(
            'Post published!',
            'Your post has been published Successfully!',
          );
          setPost(null);
        })
        .catch((error) => {
          console.log('Something went wrong with added post to firestore.', error);
        });
    }

    const uploadImage = async () => {
    if( image == null ) {
        return null;
        }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
  
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        );
    });

    try{
        await task
        const url = await storageRef.getDownloadURL();

        setUploading(false);
        setImage(null);


        // Alert.alert(
        //         'Image Uploaded!',
        //         'Your Image has been Uploaded to Firebase Storage Successfully!',
        //  );
            return url;
    } catch(e){
        console.log(e)
        return null;
    }
  }

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                {image != null ? <Image style={styles.addImage} source={{uri: image}} /> : null}
                <TextInput  
                    placeholder="What's on your mind"
                    multiline
                    numberOfLines={4}
                    style={styles.inputField}
                    value={post}
                    onChangeText={(content) => setPost(content)}
                /> 
                {uploading ? (
                    <View style={styles.statusWrapper}>
                        <Text>{transferred} % Completed!</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    ) : (
                    <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
                        <Text style={styles.submitBtnText}>POST</Text>
                    </TouchableOpacity>
                )}
            </View>
               <ActionButton buttonColor="#2e64e5">
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="Take Photo"
                        onPress={takePhotoFromCamera}>
                        <Icon name="camera-outline" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item
                        buttonColor="#3498db"
                        title="Choose Photo"
                        onPress={choosePhotoFromLibrary}>
                        <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
        </View>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    addImage:{
        width: '100%',
        height: 250,
        marginBottom:15,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    inputField:{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:24,
        textAlign:'center',
        width:'90%',
        marginBottom:15,
    },
    inputWrapper:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        backgroundColor:'#2e64e515',
    },
    statusWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'#2e64e515',
        borderRadius: 5,
    //padding: 10px 25,
        paddingTop:10, 
        paddingBottom:10, 
        paddingLeft: 25,
        paddingRight: 25,
    },
    submitBtnText:{
        fontSize: 18,
        fontFamily: 'Lato-Bold',
        fontWeight: 'bold',
        color: '#2e64e5',
    }
})
