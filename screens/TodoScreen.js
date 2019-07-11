import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  ListView
} from 'react-native';
import {
  Container, 
  Content, 
  Header, 
  Form,
  Input,
  Item, 
  Button, 
  Label,
  Icon,
  List, 
  ListItem
} from 'native-base';
import { MonoText } from '../components/StyledText';
import { fetchTodos, createTodo } from '../app/actions/todoActions';


import firebase from 'firebase';

require('firebase/database');
var config = {
  apiKey: "AIzaSyDHc0SEjzsL7bjcomU3xDeJacqlUIXHJkU",
  authDomain: "todo-d1cc4.firebaseapp.com",
  databaseURL: "https://todo-d1cc4.firebaseio.com",
  projectId: "todo-d1cc4",
  storageBucket: "todo-d1cc4.appspot.com",
  messagingSenderId: "929181652003",
  appId: "1:929181652003:web:d72f715162678db3"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


class UsersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
    this.lv = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.props.fetchTodos();
    // firebase.database().ref('Todos/').on('child_added', data => {
    //   this.props.receiveTodo(data.val().title);
    // })
    // function writeUserData(title, description) {
    //   firebase.database().ref('Todos/').push({
    //     title,
    //     description
    //   }).then((data) => {
    //     //success callback
    //     console.log('data ', data)
    //   }).catch((error) => {
    //     //error callback
    //     console.log('error ', error)
    //   })
    // }
    // writeUserData("Walk dog", "walk maya around the park");
  }
  addTodo() {
    if (this.state.title.length >= 1) {
      this.props.createTodo(this.state.title);
    }
  }
  renderItem({ item, index }) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {(parseInt(index) + 1)}{". "}{item.title}
        </Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header transparent style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              {/* <Input style={styles.inputTextField} 
                placeholder='Enter new todo'
              /> */}
              <Input style={styles.inputTextField}
                keyboardType='default'
                placeholder='Enter new todo'
                onChangeText={
                  (text) => {
                    this.setState({ title: text });
                  }
                }
                value={this.state.title}
              />
              <Button onPress={() =>  this.addTodo()}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List 
            dataSource={this.lv.cloneWithRows(this.props.todos)}
            renderRow={todo => 
              <ListItem>
                <Text>{todo.title}</Text>
              </ListItem>
            }
            renderLeftHiddenRow={todo => 
              <Button full>
                <Icon name="information-circle" />
              </Button>
            }
            renderRightHiddenRow={todo =>
              <Button full danger>
                <Icon name="trash" />
              </Button>
            }

            leftOpenValue={-75}
            rightOpenValue={-75}
          />

        </Content>
      </Container>
    )
  }
  render1() {
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View >
            <TextInput style={{
              height: 40,
              width: 200,
              margin: 10,
              padding: 10
            }}
            
            keyboardType = 'default'
            placeholder = 'Enter new todo'
            onChangeText = {
              (text) => {
                this.setState({title: text});
              }
            }
            value = {this.state.title}
            >

            </TextInput>
            <Button onPress={() => this.addTodo()}>
              <Icon name="add" />
            </Button>
          </View>
          <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 }}>
            <FlatList
                  ref='listRef'
                  data={this.props.todos}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => `${index}`} />
          </View>
        </View>
      );
    }
  }
  render2() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>Get started by opening</Text>
              
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in: your mom
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }
    
  
}

UsersScreen.navigationOptions = {
  header: null,
  title: 'app.json'
};

const msp = (state) => ({
  loading: state.todos.loading,
  todos: state.todos.todos
})
const mdp = (dispatch) => ({
  fetchTodos: () => dispatch(fetchTodos()),
  createTodo: (todo) => dispatch(createTodo(todo))
})
export default connect(msp, mdp)(UsersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputTextField: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,0.4)'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  activityIndicatorContainer: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10
  },
  title: {
    fontSize: 15,
    fontWeight: "600"
  },
  description: {
    marginTop: 5,
    fontSize: 14,
  }
});
