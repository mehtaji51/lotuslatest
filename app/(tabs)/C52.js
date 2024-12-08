import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from './header';
import { Footer } from './footer';
import getCourseData from '../../BackendProxy/courseProxy/getCourseData'; // Import the new API function
import getCourses from '../../BackendProxy/courseProxy/getCourses'; // Import the new API function

const C52Screen = () => {
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const userId = 'authUser._id'; // Replace this with the actual userId from context or state

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // Fetch all courses for the user
      const courses = await getCourses();
      setCourseData(courses);
    } catch (err) {
      setError('Failed to fetch course data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      // Fetch specific course data for a particular course
      const courseDetails = await getCourseData(courseId);
      console.log('Course Details:', courseDetails);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch course details');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5FD2AF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCourseData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const staticCourses = [
    {
      id: '1',
      title: 'Course 1',
      description: 'This is a description for Course 1',
    },
    {
      id: '2',
      title: 'Course 2',
      description: 'This is a description for Course 2',
    },
    {
      id: '3',
      title: 'Course 3',
      description: 'This is a description for Course 3',
    },
  ];

  const coursesToDisplay = courseData.length > 0 ? courseData : staticCourses;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push('/C51')} // Navigate to C51
          >
            <Text style={styles.categoryText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push('/C52')} // Stay on C52
          >
            <Text style={styles.categoryText}>Watch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push('/C53')} // Navigate to C53
          >
            <Text style={styles.categoryText}>Listen</Text>
          </TouchableOpacity>
        </View>

        {/* Left-Aligned Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.inactiveProgress}></View>
          <View style={styles.activeProgress}></View>
          <View style={styles.inactiveProgress}></View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {coursesToDisplay.map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <TouchableOpacity onPress={() => toggleSection(index)}>
                <Text style={styles.sectionTitle}>{course.title}</Text>
              </TouchableOpacity>
              {openSections[index] && (
                <View>
                  <Text style={styles.sectionDescription}>
                    {course.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => fetchCourseDetails(course.id)}
                  >
                    <Text style={styles.detailsButtonText}>
                      View Course Details
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          {/* Lesson Image with Play Button */}
          <View style={styles.lessonImageContainer}>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              style={styles.lessonImage}
            />
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.lessonTitle}>TITLE OF LESSON</Text>
          <Text style={styles.lessonDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Text>

          {/* Lesson List */}
          <View style={styles.lessonList}>
            {[
              { title: 'Lesson 2', time: '1 Hour, 10 min' },
              { title: 'Lesson 3', time: '1 Hour, 10 min' },
            ].map((lesson, index) => (
              <TouchableOpacity key={index} style={styles.lessonItem}>
                <Image
                  source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                  style={styles.lessonThumbnail}
                />
                <View style={styles.lessonTextContainer}>
                  <Text style={styles.lessonItemTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonItemTime}>{lesson.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/C53')}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderColor: '#20b19b',
    borderWidth: 1,
    borderRadius: 20,
  },
  categoryText: {
    color: '#20b19b',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 16,
  },
  activeProgress: {
    width: 40,
    height: 5,
    backgroundColor: '#20b19b',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  inactiveProgress: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lessonImageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  lessonImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: '#20b19b',
    borderRadius: 30,
    padding: 10,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20b19b',
    marginVertical: 10,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
  },
  lessonList: {
    marginVertical: 10,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  lessonTextContainer: {
    marginLeft: 10,
  },
  lessonItemTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  lessonItemTime: {
    fontSize: 14,
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#5FD2AF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#20b19b',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default C52Screen;
