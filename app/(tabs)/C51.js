import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { Header } from './header';
import { Footer } from './footer';
import getCourses from '../../BackendProxy/courseProxy/getCourses'; // New API for fetching all courses
import getCourseData from '../../BackendProxy/courseProxy/getCourseData'; // New API for fetching specific course data

const C51Screen = () => {
  const router = useRouter(); // Initialize router
  const [courseData, setCourseData] = useState([]); // State to store course data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [openSections, setOpenSections] = useState({}); // To manage expanded course sections
  const [activeTab, setActiveTab] = useState('Read'); // Manage active tab

  const staticCourses = [
    {
      id: 1,
      title: 'Course 1',
      description: 'This is a static course description.',
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'This is another static course description.',
    },
  ];

  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourseData(data.length > 0 ? data : staticCourses);
    } catch (err) {
      setError('Failed to fetch courses');
      setCourseData(staticCourses);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      const courseDetails = await getCourseData(courseId);
      console.log('Course Details:', courseDetails);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch course details');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCourses();
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
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAllCourses}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

return (
  <SafeAreaView style={styles.container}>
    {/* Header */}
    <Header />

    {/* Scrollable Content */}
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {['Read', 'Watch', 'Listen'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.categoryButton,
              activeTab === tab && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveTab(tab)} // Set the active tab
          >
            <Text
              style={[
                styles.categoryText,
                activeTab === tab && styles.activeCategoryText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Centered Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.activeProgress}></View>
        <View style={styles.inactiveProgress}></View>
        <View style={styles.inactiveProgress}></View>
      </View>

      {activeTab == 'Read' && (
        <View style={styles.mainContentRead}>
          {/* Heading Title with expandable description */}
          <TouchableOpacity onPress={() => toggleSection('heading')}>
            <Text style={styles.sectionTitleRead}>HEADING TITLE</Text>
          </TouchableOpacity>
          {openSections['heading'] && (
            <Text style={styles.sectionDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </Text>
          )}

          {/* Subcategory List */}
          <View style={styles.subcategoryList}>
            {[
              'Subcategory 1',
              'Subcategory 2',
              'Subcategory 3',
              'Subcategory 4',
              'Subcategory 5',
            ].map((subcategory, index) => (
              <View key={index} style={styles.subcategoryItem}>
                <View style={styles.subcategoryIconContainer}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{index + 1}</Text>
                  </View>
                  {index < 4 && <View style={styles.line} />}
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => toggleSection(index)}
                    style={styles.subcategoryTextContainer}
                  >
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                  </TouchableOpacity>
                  {openSections[index] && (
                    <Text style={styles.subcategoryDescription}>
                      This is additional content for {subcategory}.
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Conditionally Render Next Button */}
          {courseData.length > 0 && (
            <TouchableOpacity
              style={styles.nextButtonRead}
              onPress={() => router.push('/C52')}
            >
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {activeTab == 'Watch' && (
        <View style={styles.mainContent}>

          {/* Lesson Image with Play Button */}
          <View style={styles.lessonImageContainer}>
            <Image
              source={'../../assets/images/Maths.jpg'}
              style={styles.lessonImage}
            />
            <TouchableOpacity style={styles.playButtonWatch}>
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
                  source={'../../assets/images/Maths.jpg'}
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
            style={styles.nextButtonWatch}
            onPress={() => router.push('/C53')}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab == 'Listen' && (
        <View style={styles.mainContent}>
          {/* Section Title */}
          <Text style={styles.sectionTitle}>
            INTRODUCTIONS AND INSPIRATIONS
          </Text>

          {/* Video Container */}
          <View style={styles.videoContainer}>
            <TouchableOpacity style={styles.playButtonListen}>
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
            {courseData.map((course, index) => (
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
          <TouchableOpacity style={styles.nextButtonListen}>
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>

    {/* Footer */}
    <Footer />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingBottom: 80,
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
  mainContentRead: {
    padding: 16,
  },
  sectionTitleRead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5FD2AF',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
    paddingLeft: 32,
  },
  subcategoryList: {
    marginVertical: 16,
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subcategoryIconContainer: {
    alignItems: 'center',
    marginRight: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5FD2AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  line: {
    height: 1,
    width: 10,
    backgroundColor: '#5FD2AF',
    marginTop: 4,
  },
  subcategoryTextContainer: {
    flex: 1,
  },
  subcategoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subcategoryDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    marginLeft: 32,
  },
  nextButtonRead: {
    backgroundColor: '#5FD2AF',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  nextButtonWatch: {
    backgroundColor: '#5FD2AF',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  nextButtonListen: {
    backgroundColor: '#5FD2AF',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainContent: {
    padding: 16,
  },
  courseItem: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5FD2AF',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
    paddingLeft: 32,
  },
  detailsButton: {
    marginTop: 8,
    backgroundColor: '#5FD2AF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lessonImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lessonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  playButtonWatch: {
    backgroundColor: '#5FD2AF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  playButtonListen: {
    backgroundColor: '#5FD2AF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  lessonList: {
    marginVertical: 16,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lessonItemTime: {
    fontSize: 12,
    color: '#555',
  },
  videoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  progressInsideVideo: {
    backgroundColor: '#ddd',
    height: 4,
    width: '80%',
    marginTop: 8,
  },
});


export default C51Screen;
