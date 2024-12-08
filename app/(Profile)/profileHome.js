import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../(tabs)/header';
import { Footer } from '../(tabs)/footer';
import CourseCard from '../Course/CourseCard'; // Import the new CourseCard component
import { useGlobalContext } from '../../context/GlobalProvider';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import getCoursesByProp from '../../BackendProxy/courseProxy/getCoursesByProp'
import getEnrolledCourses from '../../BackendProxy/courseProxy/getEnrolledCourses'
import styles from './profileHomeStyle';


const ProfileHome = () => {
  const router = useRouter(); // useRouter for navigation in Expo Router
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const authUser = useSelector((state) => state.user); // Get the user from Redux store
  console.log(authUser);
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);
  const fetchEnrolledCourses = async () => {
    try {
      const res = await getEnrolledCourses(authUser._id);
      console.log('Fetched Enrollments: ', res);
      setCourses(res.res);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to load courses');
    }
  };
  const navigateToScreen = (screenName) => {
    router.push(screenName); // Use router.push to navigate in Expo Router
  };
  const navigateToScreenwithParams = (screenName,courseId) => {
    router.push(screenName+`${courseId}`); // Use router.push to navigate in Expo Router
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.row2}>
          <View style={styles.column3}>
            <Text style={styles.userName}>
              {authUser?.firstName} {authUser?.lastName}
            </Text>
            <Text style={styles.text3}>
              {authUser?.stateProvince},{authUser?.country}
            </Text>
          </View>

          <Image
            source={require('../../assets/images/MainLogo.png')}
            resizeMode={'cover'}
            style={styles.profileImage}
          />

          <View style={styles.badge}>
            <Image
              source={require('../../assets/images/MainLogo.png')}
              style={styles.starIcon}
            />
            <Text style={styles.badgeText}>Algebra II</Text>
          </View>
        </View>
        <View style={styles.coursesSection}>
          <Text style={styles.coursesTitle}>Courses</Text>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                author={course.creator.username}
                subject={course.categories[0]} // Assuming you want to display the first tag
                ageRange={course.age} // Replace this with actual value if available
                imageUri={course.imageUrl}
                id={course._id}
              />
            ))
          ) : (
            <Text style={styles.noCoursesText}>No courses found</Text>
          )}
        </View>
        <View style={styles.row4}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {courses &&
              courses.map((course, index) => (
                <View style={[styles.commonColumn]}>
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={() =>
                      navigateToScreenwithParams(
                        '/lessonContent?id=',
                        course._id
                      )
                    } // Change 'ProfileScreen' to your actual screen name
                    //onPress={() => navigateToScreen('/lessonContent',{id:'670c746f8ecae54e7f63dd5d'})}// Change 'ProfileScreen' to your actual screen name
                    //onPress={() => navigateToScreen(`/lessonContent?id=${course._id}`)}
                    //onPress={() => navigateToScreen('/lessonContent')}// Change 'ProfileScreen' to your actual screen name
                  >
                    <Image
                      source={
                        course.imageUrl ||
                        'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
                      } // Assuming 'imageUrl' is a property in your course object
                      style={styles.commonBox} // Define a new style for the image
                    />
                  </TouchableOpacity>
                  <Text style={styles.text4}>{course.title}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileHome;

