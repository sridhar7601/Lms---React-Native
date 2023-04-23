import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
  const [courses, setCourses] = useState([]);

  const [fontsLoaded] = useFonts({
    monaco: require('./assets/Monaco 400.ttf'),
  });

  useEffect(() => {
    fetch("http://192.168.1.4:3000/courses")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => setCourses(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <SafeAreaView>
    <Text style={{fontSize:20, margin: 20,}}>Welcome Back⏳!</Text>
      <ScrollView>
        <View style={styles.container}>
          {courses.map((course) => (
            <Card key={course.id}>
              {/* <Card.Title>{course.name}</Card.Title> */}
              <Card.Divider />
              <Card.Image
                style={{ padding: 8 }}
                source={require("./assets/learn.gif")}
              />

              <Card.Title style={styles.title}>{course.name}</Card.Title>

              <Button
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  backgroundColor: '#404a79',
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="START NOW"
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 19,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    // fontFamily: 'monaco',
  },
});

export default Cards;
