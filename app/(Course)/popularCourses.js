import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,  
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Header } from '../(tabs)/header';
import { Footer } from '../(tabs)/footer';
import { LinearGradient } from 'expo-linear-gradient';
import { faBold } from '@fortawesome/free-solid-svg-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import styles from './popularCourseStyle';
import CourseCard from '../Course/CourseCard';
import getCoursesByProp from '../../BackendProxy/courseProxy/getCoursesByProp';
import getAllEnrollmentsUser from '../../BackendProxy/courseProxy/getAllEnrollmentsUser';

const popularCourses = () => {
  const router = useRouter();
  const authUser = useSelector((state) => state.user); // Get the user from Redux store
  console.log(authUser);

  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);
  const navigateToScreenwithParams = (screenName,courseId) => {
    router.push(screenName+`${courseId}`); // Use router.push to navigate in Expo Router
  };
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
        <View style={styles.container_shadow}>
          <LinearGradient
            colors={['#68D391', '#C6F6D5']} // Adjust these colors based on the gradient you need
            style={styles.gradient}
          >
            <View style={styles.searchcontainer}>
              <Ionicons
                name="search"
                size={25}
                color="#68D391"
                style={styles.icon}
              />
              <TextInput style={styles.searchinput} />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
            >
              <View style={styles.coursePalette}>
                {courses &&
                  courses.map((course, index) => (
                    <View style={[styles.paletteBox]}>
                      <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() =>
                          navigateToScreenwithParams(
                            '/lessonContent?id=',
                            course._id
                          )
                        } // Change 'ProfileScreen' to your actual screen name
                      >
                        <Image
                          source={
                            course.imageUrl ||
                            'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
                          } // Assuming 'imageUrl' is a property in your course object
                          style={styles.coueseImage} // Define a new style for the image
                        />
                      </TouchableOpacity>
                      <Text style={styles.paletteText}>{course.title}</Text>
                    </View>
                  ))}
              </View>
            </ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
            >
              <View style={styles.coursePalette}>
                {courses &&
                  courses.map((course, index) => (
                    <View style={[styles.paletteBox]}>
                      <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() =>
                          navigateToScreenwithParams(
                            '/lessonContent?id=',
                            course._id
                          )
                        } // Change 'ProfileScreen' to your actual screen name
                      >
                        <Image
                          source={
                            course.imageUrl ||
                            'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
                          } // Assuming 'imageUrl' is a property in your course object
                          style={styles.coueseImage} // Define a new style for the image
                        />
                      </TouchableOpacity>
                      <Text style={styles.paletteText}>{course.title}</Text>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}
        >
          <View>
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                author={course.creator.username}
                subject={course.categories[0]} // Assuming you want to display the first tag
                ageRange={course.age} // Replace this with actual value if available
                imageUrl={
                  course.imageUrl ||
                  'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png'
                }
                id={course._id}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};
export default popularCourses;
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator } from 'react-native';

// const EnrolledCoursesScreen = ({ userId }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       const getEnrolledCourses = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//         headers: { userId: `Bearer ${userId}` }
//       });
//       const enrolledCourses = await getEnrolledCourses.json();
//       setCourses(enrolledCourses);
//       setLoading(false);
//       Alert.alert('Error', error.message);
//       console.error('Login error:', error);
//     };

//     fetchCourses();
//   }, [userId]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Enrolled Courses</Text>
//       <FlatList
//         data={courses}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
//             <Text style={{ fontSize: 16 }}>{item.courseName}</Text>
//             <Text style={{ color: '#666' }}>{item.description}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default EnrolledCoursesScreen;