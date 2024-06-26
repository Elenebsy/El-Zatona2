import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ScrollView, FlatList, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { postComment, getReviews } from '../../firebase/review';
import user from '../../assets/user.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';


const CommentBox = () => {
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePostComment = async () => {
        if (comment.trim() === '') {
            alert('Comment cannot be empty');
            return;
        }
        setLoading(true);
        const postedComment = await postComment(comment);
        if (postedComment) {
            setReviews(prevReviews => [postedComment, ...prevReviews]);
            setComment('');
        }
        setLoading(false);
    };

    const handleGetReviews = async () => {
        setLoading(true);
        try {
            const fetchedReviews = await getReviews();
            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetReviews();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await getReviews();
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [reviews]); 

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.header}>Top Reviews from Egypt</Text>
            <Pressable style={{ marginLeft: 10 ,marginBottom: 20,backgroundColor: 'white', borderRadius: 10,}} onPress={() => router.push('/(account)/helpandsupportpage')}>
            <MaterialIcons name="contact-support" size={24} color="red" />
            </Pressable>
            </View> 
            
            <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
            />
            <Pressable onPress={handlePostComment} style={styles.button} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Post Comment</Text>
                )}
            </Pressable>
            
            <SafeAreaView style={styles.scrollView}>
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}                   
                    renderItem={({ item }) => (
                        <View style={styles.comment}>
                            <Image source={user} style={styles.userIcon} />
                            <View style={styles.commentText}>
                                <Text style={styles.username}>{item.username}:</Text>  
                                <Text>{item.comment}</Text>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        width: "90%",
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        width: "90%",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        width: "90%",
    },
    comment: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        height: 80,
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    commentText: {
        flex: 1,
        marginLeft: 10,
    },
    username: {
        fontWeight: 'bold',
    },
});

export default CommentBox;
