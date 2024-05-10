import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import support from '../../assets/support.png';

const HelpSupportPage = () => {
    const contactEmail = "support@example.com";

    const openEmail = () => {
        Linking.openURL(`mailto:${contactEmail}?subject=Support Request&body=Description of the issue:`);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={support} style={styles.image} resizeMode="contain" />
            <Text style={styles.header}>Help & Support</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Frequently Asked Questions</Text>
                <View style={styles.faqItem}>
                    <Text style={styles.question}>Q: How do I update my account information?</Text>
                    <Text style={styles.answer}>A: You can update your account information from your profile settings page.</Text>
                </View>
                <View style={styles.faqItem}>
                    <Text style={styles.question}>Q: What should I do if I forget my password?</Text>
                    <Text style={styles.answer}>A: Use the 'Forgot Password' feature on the login screen to reset your password.</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Contact Us</Text>
                <TouchableOpacity onPress={openEmail} style={styles.linkContainer}>
                    <Text style={styles.linkText}>Email Us: mootaezat@gmail.com</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Additional Resources</Text>
                <TouchableOpacity onPress={() => Linking.openURL('http://www.example.com/support')} style={styles.linkContainer}>
                    <Text style={styles.linkText}>Visit our Support Center</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff', // Switched to a clean white background
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e8b57', // Soft green to keep brand consistency
        marginBottom: 20,
        textAlign: 'center', // Center-align header
    },
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    faqItem: {
        marginBottom: 15,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444444',
        marginBottom: 5,
    },
    answer: {
        fontSize: 16,
        color: '#666666',
        paddingLeft: 10,
    },
    linkContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f5f5f5', // Light grey background for clickable items
    },
    linkText: {
        fontSize: 16,
        color: '#0066cc', // Brighter blue for links
        textDecorationLine: 'underline',
    },
});

export default HelpSupportPage;
