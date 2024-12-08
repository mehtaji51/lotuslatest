import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from './header';
import { Footer } from './footer';
import getCourseData from '../../BackendProxy/courseProxy/getCourseData'; // Import the new API function
import getCourses from '../../BackendProxy/courseProxy/getCourses'; // Import the new API function

const C53Screen = () => {
  const router = useRouter();

  // State to manage courses and loading
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});

  // Function to fetch all courses
  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // Fetch all courses using getCourses API
      const courses = await getCourses();
      setCourseData(courses); // Update state with fetched courses
    } catch (err) {
      setError('Failed to fetch course data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch details of a specific course
  const fetchCourseDetails = async (courseId) => {
    try {
      // Fetch specific course data using getCourseData API
      const courseDetails = await getCourseData(courseId);
      console.log('Course Details:', courseDetails); // Log course details for debugging
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch course details');
      console.error(err);
    }
  };

  // Fetch courses data when component mounts
  useEffect(() => {
    fetchCourseData();
  }, []);

  // Toggle open sections for subcategories
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5FD2AF" />
      </SafeAreaView>
    );
  }

  // Show error message if API call fails
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

  // Use static courses as fallback if no data from API
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

  // Display either fetched course data or static data if no courses available
  const coursesToDisplay = courseData.length > 0 ? courseData : staticCourses;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Category Buttons */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push('/C51')}
          >
            <Text style={styles.categoryText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push('/C52')}
          >
            <Text style={styles.categoryText}>Watch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Listen</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.inactiveProgress}></View>
          <View style={styles.inactiveProgress}></View>
          <View style={styles.activeProgress}></View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Section Title */}
          <Text style={styles.sectionTitle}>
            INTRODUCTIONS AND INSPIRATIONS
          </Text>

          {/* Video Container */}
          <View style={styles.videoContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
            <View style={styles.progressInsideVideo}></View>
          </View>

          {/* Section Description */}
          <Text style={styles.sectionDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </Text>

          {/* Courses List */}
          <View style={styles.subcategoryList}>
            {coursesToDisplay.map((course, index) => (
              <View key={index} style={styles.subcategoryItem}>
                <View style={styles.subcategoryIconContainer}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{index + 1}</Text>
                  </View>
                  {index < 3 && <View style={styles.line} />}
                </View>
                <TouchableOpacity
                  style={styles.subcategoryTextContainer}
                  onPress={() => fetchCourseDetails(course.id)}
                >
                  <Text style={styles.subcategoryText}>{course.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
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
    paddingLeft: 16, // Align categories to the left
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
    paddingLeft: 16, // Align progress bar to the left
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20b19b',
    marginBottom: 10,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#20b19b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  progressInsideVideo: {
    flex: 1,
    height: 5,
    backgroundColor: '#20b19b',
    borderRadius: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  subcategoryList: {
    marginVertical: 10,
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  subcategoryIconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#20b19b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#20b19b',
    marginTop: 5,
  },
  subcategoryTextContainer: {
    flex: 1,
  },
  subcategoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20b19b',
  },
  nextButton: {
    backgroundColor: '#20b19b',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  retryButton: {
    paddingVertical: 10,
    backgroundColor: '#ff6666',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  retryButtonText: {
    color: '#ffffff',
  },
});

export default C53Screen;
