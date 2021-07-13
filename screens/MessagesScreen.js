import React from 'react'
import { StyleSheet, TouchableOpacity, FlatList, Text, Image, View } from 'react-native'


const Messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];

const MessagesScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <View style={styles.userInfo}>
                            <View style={styles.userImgWrapper}>
                                <Image source={item.userImg} style={styles.userImg} />
                            </View>
                            <View style={styles.textSection}>
                                <View style={styles.userInfoText}>
                                    <Text style={styles.userName}>{item.userName}</Text>
                                    <Text style={styles.postTime}>{item.postTime}</Text>
                                </View>
                                <Text style={styles.messageText}>{item.messageText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    card:{
        width: '100%',
    },
    container:{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    messageText:{
        fontSize: 14,
        color: '#333333',
    },
    postTime:{
        fontSize: 12,
        color: '#666',
        fontFamily: 'Lato-Regular',
    },
    textSection:{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    userImg:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userImgWrapper:{
        paddingTop: 15,
        paddingBottom: 15,
    },
    userInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfoText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    userName:{
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
})
