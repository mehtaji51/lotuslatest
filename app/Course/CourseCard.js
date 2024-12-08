import React from 'react';
import { View, Text, StyleSheet, ImageBackground,
  TouchableOpacity, } from 'react-native';
import { useRouter } from 'expo-router';

const CourseCard = ({ title, author, subject, ageRange, id , imageUri }) => {
  const router = useRouter(); 
  const navigateToScreenwithParams = (screenName,courseId) => {
    router.push(screenName+`${courseId}`); // Use router.push to navigate in Expo Router
  };
  return (
    <View style={styles.cardContainer}>
      {/* Background Image */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigateToScreenwithParams('/lessonContent?id=', id)}
      >
        <ImageBackground
          source={
            imageUri ||
            'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
          }
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
      </TouchableOpacity>
      {/* <ImageBackground
          source={require('../../assets/images/Maths.jpg')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        ></ImageBackground> */}
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>

        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{subject}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{ageRange}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 4,
  },
  title: {
    color: '#272727',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  author: {
    color: '#272727',
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#34CC99',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default CourseCard;
