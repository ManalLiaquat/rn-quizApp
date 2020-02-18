import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './screens/Home';
// import ProfileScreen from './screens/Profile';
import {HOME, LOGIN, QUIZ} from './constants/routeNames';
import LoginScreen from './screens/Login';
import QuizScreen from './screens/Quiz';

const HomeStack = createStackNavigator(
  {
    [HOME]: {screen: HomeScreen},
    [QUIZ]: {screen: QuizScreen},
  },
  {defaultNavigationOptions: {...TransitionPresets.SlideFromRightIOS}},
);

// const TabNavigator = createBottomTabNavigator(
//   {
//     [HOME]: {screen: HomeStack},
//     [PROFILE]: {screen: ProfileScreen},
//   },
//   {initialRouteName: HOME},
// );

const AuthStack = createStackNavigator(
  {
    [LOGIN]: LoginScreen,
  },
  {headerMode: 'none', ...TransitionPresets.SlideFromRightIOS},
);

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Main: HomeStack,
  }),
);

// async storage + redux-persist
