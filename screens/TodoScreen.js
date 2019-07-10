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
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { fetchTodos } from '../app/actions/todoActions';

class TodosScreen extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.props.fetchTodos();
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
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {
      return (
        // <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 }}>
          <FlatList
                ref='listRef'
                data={this.props.todos}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`} />
        </View>
        // </View>
      );
    }
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

TodosScreen.navigationOptions = {
  header: null,
  title: 'app.json'
};
// function mapStateToProps(state, props) {
//   return {
//     loading: state.dataReducer.loading,
//     data: state.dataReducer.data
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }

const msp = (state) => ({
  loading: state.todos.loading,
  todos: state.todos.todos
})
const mdp = (dispatch) => ({
  fetchTodos: () => dispatch(fetchTodos())
})
export default connect(msp, mdp)(TodosScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
