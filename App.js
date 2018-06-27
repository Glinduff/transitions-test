import React from 'react'
import { View, Text, Platform, StatusBar, Easing, Animated } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import Test from './components/Test'
import { createBottomTabNavigator, createStackNavigator, SafeAreaView } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import EntryDetail from './components/EntryDetail'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

if(Platform.OS === 'android'){
  SafeAreaView.setStatusBarHeight(0);
}

const Tabs = createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
},{
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor:white ,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: purple,
      headerStyle: {
        backgroundColor: white,
      },
      headerForceInset: {
        top: 0
      }
    },
  }
},{
  headerMode: 'screen',
  mode: 'modal',
  cardStyle: { shadowColor: Platform.OS === 'ios' ? 'transparent' : 'black' },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      return StackViewStyleInterpolator.forHorizontal(sceneProps);
    }
  }),
})

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
      navigationOptions: {
        header: null,
      }
    },
    Test: {
      screen: Test,
    }
  },
  {
    headerMode: 'none',
    mode: 'card',
    cardStyle: { shadowColor: Platform.OS === 'ios' ? 'transparent' : 'black' },
    navigationOptions: {
      gesturesEnabled: false,
    },

    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);


export default class App extends React.Component {
  render() {      
    return (
      <Provider store={createStore(reducer)}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flex: 1}}>
            <StatusBar backgroundColor={white} barStyle="dark-content" />
            <RootStack />
          </View>
        </ SafeAreaView>
      </Provider>
    )
  }
}