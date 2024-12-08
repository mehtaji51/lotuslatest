import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install LinearGradient: https://github.com/react-native-linear-gradient/react-native-linear-gradient
import { useSelector } from 'react-redux'; // Added missing import
import { Header } from '../(tabs)/header';
import { Footer } from '../(tabs)/footer';
import CourseCard from '../Course/CourseCard';
import styles from './profileCourseStyles'; // Correctly importing styles
import getCoursesByProp from '../../BackendProxy/courseProxy/getCoursesByProp';
import getAllEnrollmentsUser from '../../BackendProxy/courseProxy/getAllEnrollmentsUser'

const ProfileCourse = () => {
  const [activeTab, setActiveTab] = useState('inProgress');
  const authUser = useSelector((state) => state.user); // Get the user from Redux store
  console.log(authUser);

  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await getAllEnrollmentsUser(authUser._id);
      console.log('Fetched Enrollments: ', res);

      console.log(res);
      const mappedCourses = res.data.map((enrollment) => ({
        ...enrollment.course,
        progress: enrollment.progress, // Add the progress from enrollment
      }));

      setCourses(mappedCourses);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to load courses');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>{'Courses'}</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('inProgress')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'inProgress' && styles.activeTab,
              ]}
            >
              {'In Progress'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('bookmarked')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'bookmarked' && styles.activeTab,
              ]}
            >
              {'Bookmarked Courses'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        {activeTab === 'inProgress' ? (
          courses.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <Image
                source={
                  course.imageUrl ||
                  'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
                }
                resizeMode="stretch"
                style={styles.courseImage}
              />
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseCategory}>
                  {course.categories[0]}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progress, { width: course.progress + '%' }]}
                  />
                </View>
              </View>
            </View>
          ))
        ) : (
          <View>
            {courses.map((course, index) => (
              <View key={index} style={styles.bookmarkedCourse}>
                <Image
                  source={course.imageUrl || 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'}
                  style={styles.courseBox}
                />
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseAuthor}>{course.categories[0]}</Text>
                <Text style={styles.courseDescription}>
                  {course.decription}
                </Text>
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{course.age}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{course.categories[0]}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default ProfileCourse;
